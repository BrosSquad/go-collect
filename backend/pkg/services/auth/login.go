package auth

import (
	"context"
	"errors"
	"github.com/SSH-Management/utils/v2"
	"github.com/rs/zerolog"
	"gorm.io/gorm"

	"github.com/BrosSquad/go-collect/pkg/models"
)

type LoginService struct {
	db     *gorm.DB
	logger zerolog.Logger
}

func NewLoginService(db *gorm.DB, logger zerolog.Logger) *LoginService {
	return &LoginService{db: db, logger: logger}
}

func (service *LoginService) Login(ctx context.Context, username, password string) (models.User, string, error) {
	db := service.db.WithContext(ctx)

	var user models.User

	result := db.Where("username = ?", username).First(&user)

	if result.Error != nil {
		return models.User{}, "", result.Error
	}

	// TODO: Hash password if TIME is LEFT
	if password != user.Password {
		return models.User{}, "", errors.New("invalid password")
	}

	tokenStr := utils.RandomString(32)

	result = db.Save(&models.Token{
		Token:  tokenStr,
		UserID: user.ID,
	})

	if result.Error != nil {
		service.logger.Error().
			Err(result.Error).
			Str("username", username).
			Msg("Failed to insert new token")

		return models.User{}, "", result.Error
	}

	return user, tokenStr, nil
}

func (service *LoginService) Authenticate(ctx context.Context, token string) (models.User, error) {
	db := service.db.WithContext(ctx)

	var tokenModel models.Token

	result := db.Where("token = ?", token).
		Preload("User").
		First(&tokenModel)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	return tokenModel.User, nil
}
