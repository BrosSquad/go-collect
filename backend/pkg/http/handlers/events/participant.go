package events

import (
	"github.com/BrosSquad/go-collect/pb"
	"github.com/BrosSquad/go-collect/pkg/services/event"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
)

func ParticipantHandler(participantService *event.ParticipantService, logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var request pb.ParticipantRequest

		if err := c.BodyParser(&request); err != nil {
			return err
		}

		image, err := participantService.Evident(c.UserContext(), pb.ParticipantRequest{
			UserId:  c.Locals("user").(uint64),
			EventId: request.EventId,
			Status:  request.Status,
		})

		if err != nil {
			return err
		}

		c.Set(fiber.HeaderContentType, "image/png")

		return c.Status(fiber.StatusOK).Send(image)
	}
}
