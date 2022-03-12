package container

import (
	"github.com/BrosSquad/go-collect/pkg/services"
	"github.com/BrosSquad/go-collect/pkg/services/auth"
)

func (c *Container) GetLoginService() *auth.LoginService {
	if c.loginService != nil {
		return c.loginService
	}

	c.loginService = auth.NewLoginService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.loginService
}

func (c *Container) GetExchangeRateService() *services.ExchangeRateService {
	if c.exchangeRateService != nil {
		return c.exchangeRateService
	}

	c.exchangeRateService = services.NewExchangeRateService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.exchangeRateService
}
