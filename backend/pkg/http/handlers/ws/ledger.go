package ws

import (
	"strconv"

	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/BrosSquad/go-collect/pkg/services/ledger"
	"github.com/dustin/go-broadcast"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/rs/zerolog"
)

type LedgerRequest struct {
	EventID uint64 `json:"event_id"`
}

func LedgerHandler(caster broadcast.Broadcaster, logger zerolog.Logger) fiber.Handler {
	return websocket.New(func(c *websocket.Conn) {
		eventIdStr := c.Params("eventId")
		eventId, err := strconv.ParseUint(eventIdStr, 10, 64)

		if err != nil {
			c.WriteJSON(handlers.ErrorResponse{Message: "Invalid EventID"})
			c.Close()
			return
		}


		logger.Debug().Uint64("event_id", eventId).Msg("Event Subscribed")

		ch := make(chan interface{})

		caster.Register(ch)
		defer caster.Unregister(ch)
		defer close(ch)

		for item := range ch {
			ledgerAndPoints := item.(ledger.Diff)
			logger.Debug().
				Uint64("ledger_id", ledgerAndPoints.Ledger.EventID).
				Uint64("diff", ledgerAndPoints.Diff).
				Msg("ledger sent")

			if ledgerAndPoints.Ledger.EventID == eventId {
							logger.Debug().
				Uint64("ledger_id", ledgerAndPoints.Ledger.EventID).
				Uint64("diff", ledgerAndPoints.Diff).
				Msg("ledger sent to client")
				if err := c.WriteJSON(ledgerAndPoints);err != nil {
					logger.Error().Err(err).Msg("Error sending to client")
				}
			}
		}
	})
}
