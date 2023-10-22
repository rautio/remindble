#!/bin/sh

aws lambda update-function-code --function-name reminderCheck \
--architectures arm64 \
--region us-east-1 \
--zip-file fileb://reminder/cmd/reminder/reminderCheck.zip