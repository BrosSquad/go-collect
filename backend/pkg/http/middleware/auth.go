package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"

	"github.com/BrosSquad/go-collect/pkg/constants"
	"github.com/BrosSquad/go-collect/pkg/services/auth"
)

func Auth(service *auth.LoginService, logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		token := c.Get(fiber.HeaderAuthorization, "")

		if token == "" {
			return fiber.ErrUnauthorized
		}

		user, err := service.Authenticate(c.UserContext(), token)

		if err != nil {
			logger.Error().
				Err(err).
				Str("token", token).
				Msg("Failed to authenticate USER")

			return fiber.ErrUnauthorized
		}

		c.Locals(constants.SessionUserKey, user)

		return c.Next()
	}
}
