#!/bin/sh

aws lambda update-function-code --function-name reminderCheck \
--architectures arm64 \
--region us-east-1 \
--profile default \
--zip-file fileb://reminder/cmd/reminder/reminderCheck.zip