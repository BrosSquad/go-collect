package handlers

import (
	"net/http"

	"github.com/gofiber/fiber/v2"

	"github.com/BrosSquad/go-collect/pb"
	"github.com/BrosSquad/go-collect/pkg/constants"
	"github.com/BrosSquad/go-collect/pkg/models"
	"github.com/BrosSquad/go-collect/pkg/services/ledger"
)

func InsertLedger(ledgerService *ledger.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals(constants.SessionUserKey).(models.User)

		var req pb.LedgerRequest

		if err := c.BodyParser(&req); err != nil {
			return err
		}

		ledgerModel, err := ledgerService.Insert(
			c.UserContext(),
			user,
			req.ExchangeRateId,
			req.EventId,
			req.Quantity,
		)

		if err != nil {
			return err
		}

		return c.Status(http.StatusCreated).JSON(ledgerModel)
	}
}
