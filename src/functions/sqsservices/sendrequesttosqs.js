const log = require('lambda-log');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const sqsClient = new SQSClient();

const AWSXRay = require('aws-xray-sdk');

const myfunction = async () => {

  AWSXRay.captureAWSv3Client(sqsClient);

  try {
      var params = {
        MessageBody: 'HOLA MUNDO A SQS',
        QueueUrl: process.env.SQS_QUEUE
      };
    const data = await sqsClient.send(new SendMessageCommand(params));
    log.info('Success, message sent. MessageID:', data.MessageId);
    return data; // For unit tests.
  } catch (err) {
    log.error('Error en SQSSSS', err);
  }
}

exports.Handler = async (event) => {
  log.info('START:', event)

  try {
    const data = await myfunction();
    log.info(data)
    return {
      statusCode: 200
    }
  } catch (error) {
    console.error(error, ['DATADOG_EVENT']);
    return {
      statusCode: 500
    }
  }
};