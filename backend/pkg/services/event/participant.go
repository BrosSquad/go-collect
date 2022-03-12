package event

import (
	"context"
	"github.com/BrosSquad/go-collect/pb"
	"github.com/rs/zerolog"
	"github.com/skip2/go-qrcode"
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
	service.logger.Log().Msg("evident")

	qr, err := qrcode.Encode("1:in", 1, 256)

	if err != nil {
		return []byte{}, nil
	}

	service.logger.Log().Msgf("request", request)

	return qr, nil
}
