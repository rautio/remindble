package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sns"
	"github.com/jackc/pgx/v5"
)

type Task struct {
	ID        int    `json:"id"`
	Content   string `json:"content"`
	ExpiresAt time.Time `json:"expiresAt"`
	UserID    string `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	Done      bool   `json:"done"`
	Schedule  string `json:"schedule"`
	Repeat    bool   `json:"repeat"`
}

type MyEvent struct {
	Name string `json:"name"`
}

func HandleRequest(ctx context.Context, event *MyEvent) (*string, error) {
	if event == nil {
		return nil, fmt.Errorf("received nil event")
	}
	message := fmt.Sprintf("Hello %s!", event.Name)

	fetchReminders()
	return &message, nil
}

func fetchReminders() {
	// Connect to AWS
	sess := session.Must(session.NewSession())
	svc := sns.New(sess)
	log.Printf("Setting up DB connection")
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
	log.Printf("Tasks: %v\n", len(tasks))
	if err != nil {
			fmt.Fprintf(os.Stderr, "Collecting rows result failed: %v\n", err)
			log.Printf("Error collecting rows result: %v\n", err)
	}
	// Iterate through the result set
	for _, t := range tasks {
		fmt.Printf("%s: %s\n", t.Content, t.ExpiresAt)
		result, err := svc.Publish(&sns.PublishInput{
			Message:  aws.String(t.Content),
			TopicArn: aws.String("arn:aws:sns:us-east-1:554718202330:reminder-notifications"),
		})
		if err != nil {
				fmt.Println(err.Error())
				os.Exit(1)
		}
		// Print the message ID
    fmt.Println(*result.MessageId)
	}
}

func main() {
	lambda.Start(HandleRequest)
}