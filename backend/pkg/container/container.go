package container

import (
	"os"

	"github.com/BrosSquad/go-collect/pkg/services"
	"github.com/BrosSquad/go-collect/pkg/services/achievement"
	"github.com/BrosSquad/go-collect/pkg/services/auth"
	"github.com/BrosSquad/go-collect/pkg/services/event"
	"github.com/BrosSquad/go-collect/pkg/services/ledger"
	"github.com/dustin/go-broadcast"
	"github.com/go-redis/redis/v8"
	"github.com/rs/zerolog"
	"github.com/skip2/go-qrcode"
	"github.com/spf13/viper"
	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2/middleware/session"
)

type (
	fileLogger struct {
		logger zerolog.Logger
		file   *os.File
	}
)

type Container struct {
	config *viper.Viper
	db     *gorm.DB

	loggers      map[string]fileLogger
	redisClients map[int]*redis.Client

	session *session.Store

	// Services
	qrCodeGeneratorService *qrcode.QRCode
	participantService     *event.ParticipantService
	loginService           *auth.LoginService
	exchangeRateService    *services.ExchangeRateService
	ledgerService          *ledger.Service
	achievementService     *achievement.AchievementService
	eventService           *event.EventService

	broadcaster broadcast.Broadcaster
}

func New(config *viper.Viper) *Container {
	return &Container{
		config:       config,
		loggers:      make(map[string]fileLogger, 1),
		redisClients: make(map[int]*redis.Client, 16),
	}
}

func (c *Container) GetConfig() *viper.Viper {
	return c.config
}

func (c *Container) Close() error {
	for _, l := range c.loggers {
		_ = l.file.Close()
	}

	for _, client := range c.redisClients {
		_ = client.Close()
	}

	return nil
}
