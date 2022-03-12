package container

import "github.com/BrosSquad/go-collect/pkg/services/auth"

func (c *Container) GetLoginService() *auth.LoginService {
	if c.loginService != nil {
		return c.loginService
	}

	c.loginService = auth.NewLoginService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.loginService
}
