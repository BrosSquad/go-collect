package handlers

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
)

func HelloWorld() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		return ctx.Status(http.StatusOK).
			JSON(fiber.Map{"message": "Hello World"})
	}
}
