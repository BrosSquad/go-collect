package models

import "time"

type Event struct {
	Model
	Title       string    `gorm:"column:title" json:"title,omitempty"`
	Location    string    `gorm:"column:location" json:"location,omitempty"`
	Description string    `gorm:"column:description" json:"description,omitempty"`
	ImageUrl    string    `gorm:"column:image_url" json:"image_url,omitempty"`
	CoverUrl    time.Time `gorm:"column:cover_url" json:"cover_url,omitempty"`
	Start       time.Time `gorm:"column:start" json:"start,omitempty"`
	End         time.Time `gorm:"column:end" json:"end,omitempty"`
}
