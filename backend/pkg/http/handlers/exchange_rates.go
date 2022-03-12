package handlers

import (
	"github.com/BrosSquad/go-collect/pkg/services"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
)

func ExchangeRateHandler(exchangeRateService *services.ExchangeRateService, logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		exchangeRates, err := exchangeRateService.Get(c.Context())

		if err != nil {
			logger.Error().Err(err).Msg("Failed to get exchange rates.")
			return err
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"data": exchangeRates,
		})
	}
}
