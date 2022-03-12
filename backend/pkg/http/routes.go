package http

import (
	"github.com/BrosSquad/go-collect/pkg/container"
	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/gofiber/fiber/v2"
)

func registerRoutes(c *container.Container, app *fiber.App) {
	app.Get("/", handlers.HelloWorld())
}
