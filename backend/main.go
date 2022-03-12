package main

import (
	"flag"

	"github.com/BrosSquad/go-collect/pkg/db/seeds"
	"github.com/BrosSquad/go-collect/pkg/http"
	"github.com/rs/zerolog/log"

	"github.com/BrosSquad/go-collect/pkg/config"
	"github.com/BrosSquad/go-collect/pkg/container"
)

var (
	environment string
)

func main() {
	flag.StringVar(&environment, "env", "development", "Server Configuration")

	env := config.ParseEnvironment(environment)

	configuration, err := config.New(env)

	if err != nil {
		log.Fatal().Err(err).Msg("Failed to load Configuration")
	}

	c := container.New(configuration)

	defer func(c *container.Container) {
		err := c.Close()
		if err != nil {
			log.Error().Err(err).Msg("Failed to close DI Container")
		}
	}(c)

	seeds.Seed(c.GetDbConnection())

	http.RunServer(
		c,
		env,
		configuration.GetString("http.bind"),
		uint16(configuration.GetInt32("http.port")),
	)
}
