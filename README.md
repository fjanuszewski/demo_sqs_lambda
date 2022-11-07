# hello! Welcome to my project 🚀

This project has a demo of SQS with Lambda and DeadLetter Queue.

# It has the following components:
- This lambda is fired every 1 minute by an EventBridge event. Lambda will send a message to SQS
- The SQS queue will receive the message and will execute a Trigger mode lambda for each message (Lambda TriggerSQS).
- If the TriggerSQS lambda completes successfully, the message is automatically removed from the SQS queue. If the lambda returns an error, the message will travel to a DLQ where the Lambda TriggerDLQ will be executed.

**To test the flow, you must activate the value of the "Enabled" attribute of the SendRequestToSQS lambda in the CronEvent event**
**To simulate an error, a message must be sent to SQS with the text "ERROR"**

## Before starting
Must have installed AWS CLI and SAM. After install AWS CLI configure the AWS CLI to execute the commands in your AWS account.

NodeJs is required for Build the lambda trigger.

### Installing AWS CLI & SAM
- [AWS CLI Installer](https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-chap-install.html)
- [SAM Installer](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Installing NodeJs
- [NodeJs & NPM Installer](https://nodejs.org/en/)

# Usage
You can either implement the tamplate with your favorite SAM command, or run the **deploy.sh** file. Note that you should replace the variables within the file.

### Environments
- **ENV**: This work fine if we use SAM in local. In Pipeline is not needed
- **BUCKET**: Bucket is required for [SAM Package](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-package.html)
- **STACK**: Name of stack in CloudFormation, is reference for the name of objects in template
- **PROJECT**: Tag for all resources