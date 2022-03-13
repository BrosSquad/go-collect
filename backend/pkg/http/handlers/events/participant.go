package events

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/BrosSquad/go-collect/pb"
	"github.com/BrosSquad/go-collect/pkg/constants"
	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/BrosSquad/go-collect/pkg/services/event"
	"github.com/SSH-Management/utils/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/skip2/go-qrcode"
)

func InsertParticipent(service *event.ParticipantService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		eventIdStr := c.Params("eventId")

		eventId, err := strconv.ParseUint(eventIdStr, 10, 64)

		if err != nil {
			return err
		}

		user := c.Locals(constants.SessionUserKey).(models.User)

		participent, err := service.Evident(c.UserContext(), pb.ParticipantRequest{
			UserId: user.ID,
			EventId: eventId,
		})

		if err != nil {
			return err
		}

		return c.Status(http.StatusCreated).JSON(participent)
	}
}

func ParticipantHandler() fiber.Handler {
	return func(c *fiber.Ctx) error {
		eventIDInt, err := c.ParamsInt("eventId")

		if err != nil {
			return err
		}

		eventID := uint64(eventIDInt)

		bytes, _ := json.Marshal(struct {
			EventID uint64 `json:"event_id"`
			Status  string `json:"status"`
		}{
			EventID: eventID,
			Status:  "in",
		})
		image, err := qrcode.Encode(utils.UnsafeString(bytes), 1, 256)

		if err != nil {
			return err
		}

		c.Set(fiber.HeaderContentType, "image/png")

		return c.Status(fiber.StatusOK).Send(image)
	}
}
