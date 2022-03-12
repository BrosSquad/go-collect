package event

import (
	"context"

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

type ParticipantRequest struct {
	UserId  uint64
	EventId uint64
	Status  string
}

func (service *ParticipantService) Evident(ctx context.Context, request ParticipantRequest) ([]byte, error) {
	db := service.db.WithContext(ctx)

	participant := &models.Participant{
		UserID:  request.UserId,
		EventID: request.EventId,
		Status:  request.Status,
	}

	result := db.Create(participant)

	if result.Error != nil {
		return []byte{}, result.Error
	}

	return nil,  nil
	//
	//	// TODO: Hash password if TIME is LEFT
	//	if password != user.Password {
	//		return models.User{}, "", errors.New("invalid password")
	//	}
	//
	//	tokenStr := utils.RandomString(32)
	//
	//	result = db.Save(&models.Token{
	//		Token:  tokenStr,
	//		UserID: user.ID,
	//	})
	//
	//	if result.Error != nil {
	//		service.logger.Error().
	//			Err(result.Error).
	//			Str("username", username).
	//			Msg("Failed to insert new token")
	//
	//		return models.User{}, "", result.Error
	//	}
	//
	//	return user, tokenStr, nil
	//}
	//
	//func (service *LoginService) Authenticate(ctx context.Context, token string) (models.User, error) {
	//	db := service.db.WithContext(ctx)
	//
	//	var tokenModel models.Token
	//
	//	result := db.Where("token = ?", token).
	//		Preload("User").
	//		First(&tokenModel)
	//
	//	if result.Error != nil {
	//		return models.User{}, result.Error
	//	}
	//
	//	return tokenModel.User, nil
}
