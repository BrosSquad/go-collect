package container

import (
	"fmt"

	"github.com/SSH-Management/utils/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/storage/redis"
)

func (c *Container) GetRedisStorage(database int) fiber.Storage {
	return redis.New(redis.Config{
		Host:     c.config.GetString("redis.host"),
		Port:     c.config.GetInt("redis.port"),
		Username: c.config.GetString("redis.username"),
		Password: c.config.GetString("redis.password"),
		Database: database,
	})
}

func (c *Container) GetSession() *session.Store {
	if c.session == nil {
		c.session = session.New(session.Config{
			Storage:        c.GetRedisStorage(c.config.GetInt("redis.session.db")),
			CookieHTTPOnly: true,
			Expiration:     c.config.GetDuration("session.expiration"),
			KeyLookup:      fmt.Sprintf("cookie:%s", c.config.GetString("session.lookup")),
			CookieDomain:   c.config.GetString("http.domain"),
			CookiePath:     c.config.GetString("session.cookie_path"),
			CookieSecure:   c.config.GetBool("session.secure"),
			CookieSameSite: "strict",
			KeyGenerator: func() string {
				return utils.RandomString(32)
			},
		})
	}

	return c.session
}
