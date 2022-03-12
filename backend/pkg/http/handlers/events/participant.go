package events

import (
	"encoding/json"
	"github.com/SSH-Management/utils/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/skip2/go-qrcode"
)

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
