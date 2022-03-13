package models

type User struct {
	Model

	Username string `gorm:"column:username" json:"username,omitempty"`
	Password string `gorm:"column:password" json:"-"`
	City     string `gorm:"column:city" json:"city,omitempty"`
	Points    uint64 `gorm:"column:points" json:"points,omitempty"`

	Tokens []Token
	Achievements []Achievement `gorm:"many2many:achievement_user;"`
	Events []Event `gorm:"many2many:participants;"`
}
