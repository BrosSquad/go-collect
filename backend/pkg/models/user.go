package models

type User struct {
	Model

	Username string `gorm:"column:username" json:"username,omitempty"`
	Password string `gorm:"column:password" json:"-"`
	City     string `gorm:"column:city" json:"city,omitempty"`
	Point    uint64 `gorm:"column:points" json:"points,omitempty"`

	Tokens []Token
}
