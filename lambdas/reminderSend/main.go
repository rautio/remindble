package main

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
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

	return &message, nil
}


func main() {
	lambda.Start(HandleRequest)
}