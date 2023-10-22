#!/bin/sh

aws lambda create-function --function-name reminderCheck \
--architectures arm64 \
--region us-east-1 \
--runtime provided.al2 --handler bootstrap \
--role arn:aws:iam::554718202330:role/reminder-checker-role \
--zip-file fileb://reminder/cmd/reminder/reminderCheck.zip