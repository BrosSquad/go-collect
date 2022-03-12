package models

type ExchangeRate struct {
	Model
	Name     string `gorm:"column:name" json:"name,omitempty"`
	Modifier uint64 `gorm:"column:modifier" json:"modifier,omitempty"`
}
