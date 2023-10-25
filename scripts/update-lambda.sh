#!/bin/sh

aws lambda update-function-code --function-name reminderCheck \
--architectures arm64 \
--region us-east-1 \
--profile default \
--zip-file fileb://lambdas/reminderCheck/reminderCheck.zip

aws lambda update-function-code --function-name reminderSend \
--architectures arm64 \
--region us-east-1 \
--profile default \
--zip-file fileb://lambdas/reminderSend/reminderSend.zip