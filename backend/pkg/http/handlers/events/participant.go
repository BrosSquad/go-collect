package events

import (
	"net/http"

	"github.com/BrosSquad/go-collect/pb"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
)

func Participant(logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {

		var request pb.ParticipantRequest

		if err := c.BodyParser(&request); err != nil {
			return err
		}

		return c.SendStatus(http.StatusOK)
	}
}
