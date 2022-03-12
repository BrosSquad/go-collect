package handlers

import (
	"net/http"

	"github.com/gofiber/fiber/v2"

	"github.com/BrosSquad/go-collect/pkg/constants"
	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/BrosSquad/go-collect/pkg/services/ledger"
)

func UserProfileMetrics(ledgerService *ledger.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals(constants.SessionUserKey).(models.User)

		res, err := ledgerService.CalculateUserMetrics(c.UserContext(), user.ID)

		if err != nil {
			return err
		}

		return c.Status(http.StatusOK).JSON(res)
	}
}
