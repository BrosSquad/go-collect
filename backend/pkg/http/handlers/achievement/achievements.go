package achievement

import (
	"github.com/BrosSquad/go-collect/pkg/services/achievement"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
)

func AchievementHandler(achievementService *achievement.AchievementService, logger zerolog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		achievements, err := achievementService.Get(c.Context())

		if err != nil {
			logger.Error().Err(err).Msg("Failed to get achievements.")
			return err
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"data": achievements,
		})
	}
}