package container

import (
	"fmt"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/BrosSquad/go-collect/pkg/logging"
)

func (c *Container) GetDefaultLogger() zerolog.Logger {
	return c.GetLogger(logging.DefaultLoggerName)
}

func (c *Container) GetLogger(name string) zerolog.Logger {
	if logger, ok := c.loggers[name]; ok {
		return logger.logger
	}

	file := c.config.GetString(fmt.Sprintf("logging.%s.file", name))

	logger, osFile, err := logging.New(
		file,
		c.config.GetString(fmt.Sprintf("logging.%s.level", name)),
		c.config.GetBool(fmt.Sprintf("logging.%s.console", name)),
	)

	if err != nil {
		log.Fatal().
			Err(err).
			Str("name", name).
			Msg("Error while creating logger")
	}

	c.loggers[name] = fileLogger{
		logger: logger,
		file:   osFile,
	}

	return logger
}
