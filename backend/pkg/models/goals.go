package models

type Goal struct {
	Model
	EventID uint64 `gorm:"column:event_id" json:"event_id,omitempty"`
	Points  uint64 `gorm:"column:points" json:"points,omitempty"`

	Event Event
}
