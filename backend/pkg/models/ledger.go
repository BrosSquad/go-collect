package models

type Ledger struct {
	Model
	EventID        uint64 `gorm:"column:event_id" json:"event_id,omitempty"`
	UserID         uint64 `gorm:"column:user_id" json:"user_id,omitempty"`
	ExchangeRateID uint64 `gorm:"column:exchange_rate_id" json:"exchange_rate_id,omitempty"`
	Quantity       uint64 `gorm:"column:quantity" json:"quantity,omitempty"`

	User         User
	ExchangeRate ExchangeRate
	Event        Event
}
