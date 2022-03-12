package models

type Token struct {
	Model
	Token string `gorm:"column:token" json:"token,omitempty"`

	UserID uint64 `gorm:"column:user_id" json:"-"`
	User   User   `gorm:"foreignKey:user_id"`
}
