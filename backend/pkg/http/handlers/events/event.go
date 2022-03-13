package events

import (
	"github.com/BrosSquad/go-collect/pkg/services/event"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
)

func GetEventHandler(eventService *event.EventService, logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		data, err := eventService.GetEvents(c.UserContext())

		if err != nil {
			return err
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"data": data,
		})
	}
}
