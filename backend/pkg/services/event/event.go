package event

import (
	"context"
	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/rs/zerolog"
	"gorm.io/gorm"
)

type EventService struct {
	db     *gorm.DB
	logger zerolog.Logger
}

func NewEventService(db *gorm.DB, logger zerolog.Logger) *EventService {
	return &EventService{
		db:     db,
		logger: logger,
	}
}

func (service *EventService) GetEvents(ctx context.Context) ([]models.Event, error) {
	db := service.db.WithContext(ctx)

	var events []models.Event

	result := db.Find(&events)

	if result.Error != nil {
		return []models.Event{}, result.Error
	}

	return events, nil
}
