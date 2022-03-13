package http

import (
	"github.com/gofiber/fiber/v2"

	"github.com/BrosSquad/go-collect/pkg/container"
	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/achievement"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/auth"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/events"
	"github.com/BrosSquad/go-collect/pkg/http/middleware"
)

func registerRoutes(c *container.Container, app *fiber.App) {
	authMiddleware := middleware.Auth(c.GetLoginService(), c.GetDefaultLogger())
	app.Get("/", authMiddleware, handlers.HelloWorld())

	app.Get("/user-profile", authMiddleware, handlers.UserProfileMetrics(c.GetLedgerService()))
	app.Post("/ledger", authMiddleware, handlers.InsertLedger(c.GetLedgerService()))
	app.Get("/", middleware.Auth(c.GetLoginService(), c.GetDefaultLogger()), handlers.HelloWorld())

	app.Post("/event/:eventId/participate", middleware.Auth(c.GetLoginService(), c.GetDefaultLogger()), events.ParticipantHandler())
	app.Get("/exchange-rates", handlers.ExchangeRateHandler(c.GetExchangeRateService(), c.GetDefaultLogger()))
	app.Get("/achievements", achievement.AchievementHandler(c.GetAchievementService(), c.GetDefaultLogger()))
	app.Post("/auth/login", auth.LoginHandler(c.GetLoginService(), c.GetDefaultLogger()))
}
