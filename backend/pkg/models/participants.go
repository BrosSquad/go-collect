package models

// TODO: Add Status as Postgres ENUM

type Participant struct {
	Model
	UserID  uint64 `gorm:"column:user_id" json:"user_id,omitempty"`
	EventID uint64 `gorm:"column:event_id" json:"event_id,omitempty"`
	Status  string `gorm:"column:status" json:"status,omitempty"`

	User  User
	Event Event
}
