package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"

	"github.com/BrosSquad/go-collect/pkg/db"
)

type ErrorResponse struct {
	Message string `json:"message,omitempty"`
}

func Error(logger zerolog.Logger) fiber.ErrorHandler {
	return func(ctx *fiber.Ctx, err error) error {
		ctx.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSONCharsetUTF8)
		code := fiber.StatusInternalServerError

		logger.Error().
			Err(err).
			Msg("An error has occurred in application")

		if e, ok := err.(*fiber.Error); ok {
			return ctx.Status(e.Code).JSON(ErrorResponse{
				Message: e.Message,
			})
		}

		//if err == ErrInvalidPayload {
		//	return ctx.Status(http.StatusBadRequest).JSON(ErrorResponse{
		//		Message: ErrInvalidPayload.Error(),
		//	})
		//}

		//if err == password.ErrPasswordMismatch {
		//	return ctx.Status(fiber.StatusUnauthorized).
		//		JSON(ErrorResponse{Message: "Invalid credentials"})
		//}
		//

		if errors.Is(err, db.ErrNotFound) {
			return ctx.Status(fiber.StatusNotFound).
				JSON(ErrorResponse{Message: "Data not found!"})
		}

		return ctx.Status(code).
			JSON(ErrorResponse{Message: "An error has occurred!"})
	}
}
