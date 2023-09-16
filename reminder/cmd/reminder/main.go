package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/robfig/cron/v3"
)

type Task struct {
	ID        int    `json:"id"`
	Content   string `json:"content"`
	ExpiresAt time.Time `json:"expiresAt"`
	UserID    string `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	Done      bool   `json:"done"`
}

func fetchReminders() {
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		log.Printf("Error Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())
  rows, err := conn.Query(context.Background(), "SELECT * from \"Task\" WHERE date_trunc('minute', \"expiresAt\") = date_trunc('minute', NOW());")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query reminders failed: %v\n", err)
		log.Printf("Error Query reminders failed: %v\n", err)
	}
	defer rows.Close()
	tasks, err := pgx.CollectRows(rows, pgx.RowToStructByName[Task])
	if err != nil {
			fmt.Fprintf(os.Stderr, "Collecting rows result failed: %v\n", err)
			log.Printf("Error collecting rows result: %v\n", err)
	}
	// Iterate through the result set
	for _, t := range tasks {
		fmt.Printf("%s: %s\n", t.Content, t.ExpiresAt)
	}
}

func checkReminders() {
	c := cron.New()

	// Every minute check to see if any reminders need to be triggered
	c.AddFunc("@every 1s", func() {
		log.Println("Info running reminder")
		fmt.Printf("Checking:\n")
		fetchReminders()
	})

	c.Start()
}

func main() {
	// Setup logging
	logfile, err := os.Create("reminder.log")
	if err != nil {
		log.Fatal(err)
	}
	defer logfile.Close()
	log.SetOutput(logfile)

	// Start the reminder scheduler
	fmt.Println("Created reminder!")
	checkReminders()
	fmt.Scanln()
}