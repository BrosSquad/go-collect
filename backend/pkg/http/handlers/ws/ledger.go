package ws

import (
	"strconv"

	"github.com/BrosSquad/go-collect/pkg/http/handlers"
	"github.com/BrosSquad/go-collect/pkg/services/ledger"
	"github.com/dustin/go-broadcast"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

type LedgerRequest struct {
	EventID uint64 `json:"event_id"`
}

func LedgerHandler(caster broadcast.Broadcaster) fiber.Handler {
	return websocket.New(func(c *websocket.Conn) {
		eventIdStr := c.Params("eventId")

		eventId, err := strconv.ParseUint(eventIdStr, 10, 64)

		if err != nil {
			c.WriteJSON(handlers.ErrorResponse{Message: "Invalid EventID"})
			c.Close()
			return
		}

		ch := make(chan interface{})

		caster.Register(ch)
		defer caster.Unregister(ch)
		defer close(ch)

		for item := range ch {
			ledgerAndPoints := item.(ledger.Diff)

			if ledgerAndPoints.Ledger.EventID == eventId {
				c.WriteJSON(ledgerAndPoints)
			}
		}
	})
}
