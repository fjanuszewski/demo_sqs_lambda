const log = require('lambda-log');
var AWS = require('aws-sdk');
var sqs = new AWS.SQS();

const myfunction = async () => {
  var params = {
    MessageBody: 'HOLA MUNDO A SQS',
    QueueUrl: process.env.SQS_QUEUE
  };
  await sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log('error:', 'Fail Send Message' + err);
    } else {
      console.log('data:', data.MessageId);
    }
  }).promise();
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