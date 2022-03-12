package seeds

import (
	"github.com/BrosSquad/go-collect/pkg/models"
	"gorm.io/gorm"
	"math/rand"
	"time"
)

func seedUsers(db *gorm.DB) {
	data := []models.User{
		{
			Username: "test",
			Password: "password",
			City:     "Belgrade",
			Point:    0,
		},
		{
			Username: "test-1",
			Password: "password-1",
			City:     "Belgrade",
			Point:    0,
		},
		{
			Username: "test-2",
			Password: "password-2",
			City:     "Belgrade",
			Point:    0,
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
			Points:      uint64(rand.Int()),
		},
		{
			Name:        "Achievement 2",
			ImageUrl:    "https://via.placeholder.com/150",
			Description: "Description 2",
			Points:      uint64(rand.Int()),
		},
	}

	db.CreateInBatches(data, 10)
}

func Seed(db *gorm.DB) {
	seedUsers(db)
	seedAchievements(db)
	seedEvents(db)
}
