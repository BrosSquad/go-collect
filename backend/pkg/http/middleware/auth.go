package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"

	"github.com/BrosSquad/go-collect/pkg/constants"
	"github.com/BrosSquad/go-collect/pkg/models"
)

func Auth(store *session.Store) fiber.Handler {
	return func(c *fiber.Ctx) error {
		s, err := store.Get(c)
		if err != nil {
			return err
		}

		user := s.Get(constants.SessionUserKey)

		if user == nil {
			return fiber.ErrUnauthorized
		}

		u, ok := user.(models.User)

		if !ok || u.ID < 1 {
			return fiber.ErrUnauthorized
		}

		return c.Next()
	}
}
