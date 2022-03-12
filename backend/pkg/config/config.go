package config

import (
	"strings"

	"github.com/spf13/viper"
)

type (
	Env uint8

	Config struct {
		Env Env
	}

	Modifier func(*viper.Viper, Env) *viper.Viper
)

const (
	Testing Env = iota
	Development
	Production
)

func ParseEnvironment(env string) Env {
	switch strings.ToLower(env) {
	case "prod", "production":
		return Production
	case "dev", "development", "develop":
		return Development
	case "testing", "test":
		return Testing
	default:
		return Production
	}
}

func NewDefault(env Env) (*viper.Viper, error) {
	return New(env)
}

func New(env Env) (*viper.Viper, error) {
	v := viper.New()

	v.SetConfigName("config")
	v.SetConfigType("yaml")

	if env == Production {
		v.AddConfigPath("/etc/go-collect")
	} else {
		v.AddConfigPath(".")
	}

	err := v.ReadInConfig()
	if err != nil {
		return nil, err
	}

	return v, nil
}
