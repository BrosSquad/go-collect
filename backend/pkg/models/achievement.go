package models

type Achievement struct {
	Model
	Name        string `gorm:"column:name" json:"name,omitempty"`
	ImageUrl    string `gorm:"column:image_url" json:"image_url,omitempty"`
	Description string `gorm:"column:description" json:"description,omitempty"`
	Points      uint64 `gorm:"column:points" json:"points,omitempty"`
}
