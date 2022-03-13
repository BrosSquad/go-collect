package http

import (
	"github.com/gofiber/fiber/v2"

	"github.com/BrosSquad/go-collect/pkg/container"
	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/achievement"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/auth"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/events"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/ws"
	"github.com/BrosSquad/go-collect/pkg/http/middleware"
)

func registerRoutes(c *container.Container, app *fiber.App) {
	authMiddleware := middleware.Auth(c.GetLoginService(), c.GetDefaultLogger())
	app.Get("/", handlers.HelloWorld())

	app.Get("/user-profile", authMiddleware, handlers.UserProfileMetrics(c.GetLedgerService()))
	app.Post("/ledger", authMiddleware, handlers.InsertLedger(c.GetLedgerService(), c.GetBroadCaster()))
	app.Post("/event/:eventId/participate",  authMiddleware, events.InsertParticipent(c.GetParticipantService()))
	app.Get("/ws/:eventId/collection", authMiddleware, middleware.WebSocket(), ws.LedgerHandler(c.GetBroadCaster()))

	app.Get("/events", authMiddleware, events.GetEventHandler(c.GetEventService(), c.GetDefaultLogger()))
	app.Get("/event/:eventId/participate",authMiddleware, events.ParticipantHandler())
	app.Get("/event/:eventId/board", authMiddleware, handlers.EventBoard(c.GetLedgerService()))
	app.Get("/exchange-rates", handlers.ExchangeRateHandler(c.GetExchangeRateService(), c.GetDefaultLogger()))
	app.Get("/achievements", achievement.AchievementHandler(c.GetAchievementService(), c.GetDefaultLogger()))
	app.Post("/auth/login", auth.LoginHandler(c.GetLoginService(), c.GetDefaultLogger()))
}
