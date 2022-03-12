package http

import (
	"github.com/BrosSquad/go-collect/pkg/container"
	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/auth"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/events"
	"github.com/BrosSquad/go-collect/pkg/http/middleware"
	"github.com/gofiber/fiber/v2"
)

func registerRoutes(c *container.Container, app *fiber.App) {
	app.Get("/", middleware.Auth(c.GetLoginService(), c.GetDefaultLogger()), handlers.HelloWorld())

	app.Post("/event/:id/participate", middleware.Auth(c.GetLoginService(), c.GetDefaultLogger()), events.ParticipantHandler(c.GetParticipantService(), c.GetDefaultLogger()))
	app.Get("/exchange-rates", handlers.ExchangeRateHandler(c.GetExchangeRateService(), c.GetDefaultLogger()))
	app.Post("/auth/login", auth.LoginHandler(c.GetLoginService(), c.GetDefaultLogger()))
}
