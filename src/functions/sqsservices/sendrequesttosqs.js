const log = require('lambda-log');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const sqsClient = new SQSClient();
const myfunction = async () => {
  try {
      var params = {
        MessageBody: 'HOLA MUNDO A SQS',
        QueueUrl: process.env.SQS_QUEUE
      };
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log('Success, message sent. MessageID:', data.MessageId);
    return data; // For unit tests.
  } catch (err) {
    console.error('Error en SQSSSS', err);
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