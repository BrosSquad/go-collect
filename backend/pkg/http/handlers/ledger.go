package handlers

import (
	"net/http"
	"strconv"

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


func EventBoard(ledgerService *ledger.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals(constants.SessionUserKey).(models.User)

		eventIdStr := c.Params("eventId")
		eventId, err := strconv.ParseUint(eventIdStr, 10, 64)

		if err != nil {
			return err
		}

		l, err := ledgerService.CalculateEventBoard(c.UserContext(), user.ID, eventId)

		if err != nil {
			return err
		}

		return c.Status(http.StatusOK).JSON(l)
	}
}
