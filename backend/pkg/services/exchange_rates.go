package services

import (
	"context"

	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/rs/zerolog"
	"gorm.io/gorm"
)

type ExchangeRateService struct {
	db     *gorm.DB
	logger zerolog.Logger
}

func NewExchangeRateService(db *gorm.DB, logger zerolog.Logger) *ExchangeRateService {
	return &ExchangeRateService{db: db, logger: logger}
}

func (service *ExchangeRateService) Get(ctx context.Context) ([]models.ExchangeRate, error) {
	db := service.db.WithContext(ctx)

	var exchangeRate []models.ExchangeRate

	result := db.Find(&exchangeRate)

	if result.Error != nil {
		return []models.ExchangeRate{}, result.Error
	}

	return exchangeRate, nil
}
