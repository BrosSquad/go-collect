package logging

import (
	"io"
	"os"
	"strings"
	"time"

	"github.com/SSH-Management/utils/v2"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

const (
	DateTimeFormat = "2006-01-02 15:04:05"

	DefaultLoggerName = "default"
)

func Parse(level string) zerolog.Level {
	level = strings.ToLower(level)

	switch level {
	case "panic":
		return zerolog.PanicLevel
	case "fatal":
		return zerolog.FatalLevel
	case "error":
		return zerolog.ErrorLevel
	case "warn":
		return zerolog.WarnLevel
	case "debug":
		return zerolog.DebugLevel
	case "trace":
		return zerolog.TraceLevel
	case "info":
		return zerolog.InfoLevel
	}

	return zerolog.Disabled
}

func ConfigureDefaultLogger(level string) {
	zerolog.SetGlobalLevel(Parse(level))
	zerolog.TimeFieldFormat = DateTimeFormat
	zerolog.DurationFieldUnit = time.Microsecond
	zerolog.TimestampFunc = time.Now().UTC

	log.Logger = log.Output(zerolog.NewConsoleWriter())
}

func New(fp, level string, toConsole bool) (zerolog.Logger, *os.File, error) {
	file, err := utils.CreateLogFile(fp)

	if err != nil {
		log.Error().Err(err).Msgf("Error while creating %s log", fp)
		return zerolog.Logger{}, nil, err
	}

	var logger zerolog.Logger

	if toConsole {
		writers := [2]io.Writer{
			zerolog.NewConsoleWriter(),
			file,
		}

		logger = zerolog.New(zerolog.MultiLevelWriter(writers[:]...)).
			With().
			Timestamp().
			Logger().
			Level(Parse(level))

	} else {
		logger = zerolog.New(file).
			With().
			Timestamp().
			Logger().
			Level(Parse(level))
	}

	return logger, file, nil
}
