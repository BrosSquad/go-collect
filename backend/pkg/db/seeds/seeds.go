package seeds

import (
	"time"

	"gorm.io/gorm"

	"github.com/BrosSquad/go-collect/pkg/models"
)

func seedUsers(db *gorm.DB) {
	data := []models.User{
		{
			Username: "test",
			Password: "password",
			City:     "Belgrade",
			Points:   0,
		},
		{
			Username: "test-1",
			Password: "password-1",
			City:     "Belgrade",
			Points:   0,
		},
		{
			Username: "test-2",
			Password: "password-2",
			City:     "Belgrade",
			Points:   0,
		},
	}

	db.CreateInBatches(data, 10)
}

func seedEvents(db *gorm.DB) {
	data := []models.Event{
		{
			Title:       "Event 1",
			Location:    "Location 1",
			Description: "Description 1",
			ImageUrl:    "https://via.placeholder.com/150",
			CoverUrl:    "https://via.placeholder.com/150",
			Start:       time.Now(),
			End:         time.Now(),
		},
		{
			Title:       "Event 2",
			Location:    "Location 2",
			Description: "Description 2",
			ImageUrl:    "https://via.placeholder.com/150",
			CoverUrl:    "https://via.placeholder.com/150",
			Start:       time.Now(),
			End:         time.Now(),
		},
		{
			Title:       "Event 3",
			Location:    "Location 3",
			Description: "Description 3",
			ImageUrl:    "https://via.placeholder.com/150",
			CoverUrl:    "https://via.placeholder.com/150",
			Start:       time.Now(),
			End:         time.Now(),
		},
	}

	db.CreateInBatches(data, 10)
}

func seedAchievements(db *gorm.DB) {
	data := []models.Achievement{
		{
			Name:        "Achievement 1",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 1",
			Points:      uint64(10),
		},
		{
			Name:        "Achievement 2",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 2",
			Points:      uint64(150),
		},
		{
			Name:        "Achievement 3",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 3",
			Points:      uint64(50),
		},
		{
			Name:        "Achievement 4",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 4",
			Points:      uint64(25),
		},
		{
			Name:        "Achievement 5",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 5",
			Points:      uint64(75),
		},
		{
			Name:        "Achievement 6",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 6",
			Points:      uint64(125),
		},
		{
			Name:        "Achievement 7",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 7",
			Points:      uint64(175),
		},
	}

	db.CreateInBatches(data, 10)
}

func seedExchangeRates(db *gorm.DB) {
	data := []models.ExchangeRate{
		{
			Name:     "Plastics",
			Modifier: uint64(10),
		},
		{
			Name:     "Metal",
			Modifier: uint64(8),
		},
		{
			Name:     "Paper",
			Modifier: uint64(6),
		},
	}

	db.CreateInBatches(data, 10)
}

func Seed(db *gorm.DB) {
	seedUsers(db)
	seedAchievements(db)
	seedEvents(db)
	seedExchangeRates(db)
}
