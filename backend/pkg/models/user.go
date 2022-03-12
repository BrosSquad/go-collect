package models

type User struct {
	Model

	Name  string `gorm:"column:name" json:"name,omitempty"`
	Token string `gorm:"column:token" json:"token,omitempty"`
}
