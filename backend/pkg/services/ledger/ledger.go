package ledger

import (
	"context"

	"github.com/rs/zerolog"
	"gorm.io/gorm"

	"github.com/BrosSquad/go-collect/pkg/models"
)

type Service struct {
	db     *gorm.DB
	logger zerolog.Logger
}

func New(db *gorm.DB, logger zerolog.Logger) *Service {
	return &Service{
		db:     db,
		logger: logger,
	}
}

type (
	TotalByExchange struct {
		TotalPoints  uint64              `json:"total_points"`
		ExchangeRate models.ExchangeRate `json:"exchange_rate"`
	}

	UserMetrics struct {
		TotalPoints               uint64               `json:"total_points"`
		TotalPointsByExchangeRate []TotalByExchange    `json:"total_points_by_exchange_rate"`
		Achievements              []models.Achievement `json:"achievement"`
		Events                    []models.Event       `json:"events"`
	}

	EventBoard struct {
		TotalPoints               uint64            `json:"total_points"`
		TotalPointsByExchangeRate []TotalByExchange `json:"total_points_by_exchange_rate"`
		Event                     models.Event      `json:"event"`
		TopRankedUsers            []models.User     `json:"ranked_users"`
	}
)

func (s *Service) CalculateUserMetrics(ctx context.Context, userId uint64) (*UserMetrics, error) {
	db := s.db.WithContext(ctx)

	var user models.User

	result := db.Where("id = ?", userId).
		Preload("Achievements").
		Preload("Events").
		First(&user)

	if result.Error != nil {
		s.logger.Error().
			Err(result.Error).
			Msg("Failed to fetch user")
		return nil, result.Error
	}

	res := &UserMetrics{
		TotalPoints:               user.Points,
		Events:                    user.Events,
		Achievements:              user.Achievements,
		TotalPointsByExchangeRate: make([]TotalByExchange, 0, 10),
	}

	exchangeRates := make([]models.ExchangeRate, 0, 10)
	result = db.Find(&exchangeRates)

	if result.Error != nil {
		s.logger.Error().
			Err(result.Error).
			Msg("Failed to fetch exchange rates")
		return nil, result.Error
	}

	counts := make([]struct {
		ExchangeRateId uint64 `gorm:"column:exchange_rate_id"`
		Quantity       uint64 `gorm:"column:quantity"`
	}, 0, 10)

	db.Raw(
		"SELECT exchange_rate_id, SUM(quantity) as quantity FROM ledgers WHERE user_id = ? GROUP BY exchange_rate_id",
		userId,
	).Scan(&counts)

	for _, count := range counts {
		for _, exchangeRate := range exchangeRates {
			if count.ExchangeRateId == exchangeRate.ID {
				res.TotalPointsByExchangeRate = append(res.TotalPointsByExchangeRate, TotalByExchange{
					ExchangeRate: exchangeRate,
					TotalPoints:  count.Quantity * exchangeRate.Modifier,
				})
			}
		}
	}

	return res, nil
}

func (s *Service) CalculateEventBoard(
	ctx context.Context,
	userId,
	eventId uint64,
) (*EventBoard, error) {
	db := s.db.WithContext(ctx)

	var event models.Event

	result := db.Where(&event).First(&event)

	if result.Error != nil {
		s.logger.Error().
			Uint64("event_id", eventId).
			Err(result.Error).
			Msg("Failed to fetch Event by ID")
		return nil, result.Error
	}

	userIds := make([]uint64, 0, 10)

	result = db.
		Model(&models.Ledger{}).
		Where("event_id = ?", eventId).
		Limit(10).Select("user_id").Find(&userIds)

	if result.Error != nil {
		s.logger.Error().
			Uint64("event_id", eventId).
			Err(result.Error).
			Msg("Failed to fetch TOP 10 Users IDs")
		return nil, result.Error
	}

	topRankedUsers := make([]models.User, 0, 10)

	result = db.Where("id IN ?", userIds).Find(&topRankedUsers)

	if result.Error != nil {
		s.logger.Error().
			Uint64("event_id", eventId).
			Err(result.Error).
			Msg("Failed to fetch TOP 10 Users")
		return nil, result.Error

	}

	exchangeRates := make([]models.ExchangeRate, 0, 10)
	result = db.Find(&exchangeRates)

	if result.Error != nil {
		s.logger.Error().
			Err(result.Error).
			Msg("Failed to fetch exchange rates")

		return nil, result.Error
	}

	counts := make([]struct {
		ExchangeRateId uint64 `gorm:"column:exchange_rate_id"`
		Quantity       uint64 `gorm:"column:quantity"`
	}, 0, 10)

	db.Raw(
		"SELECT exchange_rate_id, SUM(quantity) as quantity FROM ledgers WHERE user_id = ? GROUP BY exchange_rate_id",
		userId,
	).Scan(&counts)

	var goal models.Goal

	result = db.Where("event_id = ?", eventId).First(&goal)

	if result.Error != nil {
		s.logger.Error().
			Uint64("event_id", eventId).
			Err(result.Error).
			Msg("Failed to fetch Goal")

		return nil, result.Error
	}

	res := &EventBoard{
		Event:                     event,
		TopRankedUsers:            topRankedUsers,
		TotalPoints:               goal.Points,
		TotalPointsByExchangeRate: make([]TotalByExchange, 0, 10),
	}

	for _, count := range counts {
		for _, exchangeRate := range exchangeRates {
			if count.ExchangeRateId == exchangeRate.ID {
				res.TotalPointsByExchangeRate = append(res.TotalPointsByExchangeRate, TotalByExchange{
					ExchangeRate: exchangeRate,
					TotalPoints:  count.Quantity * exchangeRate.Modifier,
				})
			}
		}
	}

	return res, nil
}

func (s *Service) Insert(
	ctx context.Context,
	user models.User,
	exchangeRateId uint64,
	eventId uint64,
	quantity uint64,
) (models.Ledger, error) {
	db := s.db.WithContext(ctx)

	legder := models.Ledger{
		EventID:        eventId,
		ExchangeRateID: exchangeRateId,
		Quantity:       quantity,
		UserID:         user.ID,
	}

	result := db.Save(&legder)

	if result.Error != nil {
		s.logger.Error().
			Uint64("exchange_rate_id", exchangeRateId).
			Uint("user_id", uint(user.ID)).
			Err(result.Error).
			Msg("Failed to insert legder")

		return models.Ledger{}, result.Error
	}

	var exchangeRate models.ExchangeRate

	result = db.First(&exchangeRate, exchangeRateId)

	if result.Error != nil {
		s.logger.Error().
			Uint64("exchange_rate_id", exchangeRateId).
			Uint64("user_id", user.ID).
			Err(result.Error).
			Msg("Failed to load exchange rate id")

		return models.Ledger{}, result.Error
	}

	newPoints := user.Points + exchangeRate.Modifier*quantity

	result = db.Model(&models.User{}).
		Where("id = ?", user.ID).
		Update("points", newPoints)

	if result.Error != nil {
		s.logger.Error().
			Uint64("exchange_rate_id", exchangeRateId).
			Uint64("user_id", user.ID).
			Err(result.Error).
			Msg("Failed to change points in user")

		return models.Ledger{}, result.Error
	}

	achievements := make([]models.Achievement, 0, 10)

	result = db.Where("points <= ?", newPoints).Find(&achievements)

	if result.Error != nil {
		s.logger.Error().
			Uint64("exchange_rate_id", exchangeRateId).
			Uint64("user_id", user.ID).
			Err(result.Error).
			Msg("Failed fetch achievements")

		return models.Ledger{}, result.Error
	}

	err := db.
		Model(&user).
		Association("Achievements").
		Replace(achievements)
	if err != nil {
		s.logger.Error().
			Uint64("exchange_rate_id", exchangeRateId).
			Uint64("user_id", user.ID).
			Err(result.Error).
			Msg("Failed unlock achievements")

		return models.Ledger{}, result.Error
	}

	// TODO: What to return
	return legder, nil
}
