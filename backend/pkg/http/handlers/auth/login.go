package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"

	"github.com/BrosSquad/go-collect/pb"
	"github.com/BrosSquad/go-collect/pkg/services/auth"
)

func LoginHandler(loginService *auth.LoginService, logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var login pb.LoginRequest

		if err := c.BodyParser(&login); err != nil {
			return err
		}

		user, token, err := loginService.Login(c.UserContext(), login.Username, login.Password)

		if err != nil {
			logger.Error().Err(err).Msg("Failed to CreateUser")
			return err
		}

		return c.Status(fiber.StatusOK).JSON(pb.LoginResponse{
			Id:       user.ID,
			Username: user.Username,
			Token:    token,
		})
	}
}
