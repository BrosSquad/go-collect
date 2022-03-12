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

func (service *ParticipantService) Evident(ctx context.Context, request pb.ParticipantRequest) ([]byte, error) {
	db := service.db.WithContext(ctx)

	service.logger.Log().Msg("evident")

	participant := &models.Participant{
		UserID:  request.UserId,
		EventID: request.EventId,
		Status:  request.Status,
	}

	if result.Error != nil {
		return []byte{}, result.Error
	}

	return nil, nil
}
