package achievement

import (
	"context"

	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/rs/zerolog"
	"gorm.io/gorm"
)

type AchievementService struct {
	db *gorm.DB
	logger zerolog.Logger
}

func NewAchievementService(db *gorm.DB, logger zerolog.Logger) *AchievementService {
	return &AchievementService{db: db, logger: logger}
}

func (service *AchievementService) Get(ctx context.Context) ([]models.Achievement, error) {
	db := service.db.WithContext(ctx)

	var achievements []models.Achievement

	result := db.Find(&achievements)

	if result.Error != nil {
		return []models.Achievement{}, result.Error
	}

	return achievements, nil
}