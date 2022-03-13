package container

import (
	"github.com/BrosSquad/go-collect/pkg/services"
	"github.com/BrosSquad/go-collect/pkg/services/achievement"
	"github.com/BrosSquad/go-collect/pkg/services/auth"
	"github.com/BrosSquad/go-collect/pkg/services/event"
	"github.com/BrosSquad/go-collect/pkg/services/ledger"
	"github.com/dustin/go-broadcast"
)

func (c *Container) GetLoginService() *auth.LoginService {
	if c.loginService != nil {
		return c.loginService
	}

	c.loginService = auth.NewLoginService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.loginService
}

func (c *Container) GetParticipantService() *event.ParticipantService {
	if c.participantService != nil {
		return c.participantService
	}

	c.participantService = event.NewParticipantService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.participantService
}

func (c *Container) GetExchangeRateService() *services.ExchangeRateService {
	if c.exchangeRateService != nil {
		return c.exchangeRateService
	}

	c.exchangeRateService = services.NewExchangeRateService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.exchangeRateService
}

func (c *Container) GetLedgerService() *ledger.Service {
	if c.ledgerService != nil {
		return c.ledgerService
	}

	c.ledgerService = ledger.New(c.GetDbConnection(), c.GetDefaultLogger())

	return c.ledgerService
}

func (c *Container) GetAchievementService() *achievement.AchievementService {
	if c.achievementService != nil {
		return c.achievementService
	}

	c.achievementService = achievement.NewAchievementService(
		c.GetDbConnection(),
		c.GetDefaultLogger(),
	)

	return c.achievementService
}

func (c *Container) GetEventService() *event.EventService {
	if c.eventService != nil {
		return c.eventService
	}

	c.eventService = event.NewEventService(c.GetDbConnection(), c.GetDefaultLogger())

	return c.eventService
}


func (c *Container) GetBroadCaster() broadcast.Broadcaster {
	if c.broadcaster != nil {
		return c.broadcaster
	}

	c.broadcaster = broadcast.NewBroadcaster(100)

	return c.broadcaster
}
