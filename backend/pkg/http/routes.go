package http

import (
	"github.com/gofiber/fiber/v2"

	"github.com/BrosSquad/go-collect/pkg/container"
	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/BrosSquad/go-collect/pkg/http/handlers/auth"
	"github.com/BrosSquad/go-collect/pkg/http/middleware"
)

func registerRoutes(c *container.Container, app *fiber.App) {
	authMiddleware := middleware.Auth(c.GetLoginService(), c.GetDefaultLogger())
	app.Get("/", authMiddleware, handlers.HelloWorld())

	app.Get("/user-profile", authMiddleware, handlers.UserProfileMetrics(c.GetLedgerService()))

	app.Get("/exchange-rates", handlers.ExchangeRateHandler(c.GetExchangeRateService(), c.GetDefaultLogger()))
	app.Post("/auth/login", auth.LoginHandler(c.GetLoginService(), c.GetDefaultLogger()))
}
