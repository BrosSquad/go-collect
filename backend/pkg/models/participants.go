package models

import "time"

type Participant struct {
	ID      uint64 `gorm:"column:id"`
	UserID  uint64 `gorm:"column:user_id" json:"user_id,omitempty"`
	EventID uint64 `gorm:"column:event_id" json:"event_id,omitempty"`
	Status  string `gorm:"column:status" json:"status,omitempty"`
	CreatedAt time.Time `gorm:"column:created_at"`
	User  User
	Event Event
}
