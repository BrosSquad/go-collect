package event

import (
	"context"

	"github.com/BrosSquad/go-collect/pb"
	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/rs/zerolog"
	"gorm.io/gorm"
)

type ParticipantService struct {
	db     *gorm.DB
	logger zerolog.Logger
}

func NewParticipantService(db *gorm.DB, logger zerolog.Logger) *ParticipantService {
	return &ParticipantService{db: db, logger: logger}
}

func (service *ParticipantService) Evident(ctx context.Context, request pb.ParticipantRequest) (models.Participant, error) {
	model := models.Participant{
		UserID:  request.UserId,
		EventID: request.EventId,
		Status: "in",
	}

	result := service.db.Save(&model)

	if result.Error != nil {
		service.logger.Error().Err(result.Error).Msg("Failed to insert Participant")
		return models.Participant{}, result.Error
	}

	return model, nil
}
