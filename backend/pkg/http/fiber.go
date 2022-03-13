package http

import (
	"fmt"
	"net"

	"github.com/BrosSquad/go-collect/pkg/container"
	"github.com/BrosSquad/go-collect/pkg/http/handlers"

	"github.com/rs/zerolog/log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/pprof"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"

	"github.com/SSH-Management/utils/v2"

	"github.com/BrosSquad/go-collect/pkg/config"
	"github.com/BrosSquad/go-collect/pkg/constants"
)

func RunServer(c *container.Container, env config.Env, ip string, port uint16) {
	fiberConfig := fiber.Config{
		// StrictRouting: true,
		AppName:      "Go Collect",
		ErrorHandler: handlers.Error(c.GetDefaultLogger()),
	}

	app := fiber.New(fiberConfig)

	switch env {
	case config.Development:
		app.Use(pprof.New())
	case config.Production:
		app.Use(recover.New())
	}

	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "*",
		AllowMethods:     "*",
		AllowCredentials: true,
	}))

	app.Use(requestid.New(requestid.Config{
		Generator: func() string {
			return utils.RandomString(32)
		},
		ContextKey: constants.RequestIdKey,
	}))

	registerRoutes(c, app)

	addr := fmt.Sprintf("%s:%d", ip, port)

	listener, err := net.Listen("tcp4", addr)
	if err != nil {
		log.
			Fatal().
			Err(err).
			Msg("Error while creating net.Listener for HTTP Server")
	}

	err = app.Listener(listener)

	if err != nil {
		log.
			Fatal().
			Err(err).
			Msg("Cannot start Fiber HTTP Server")
	}
}
