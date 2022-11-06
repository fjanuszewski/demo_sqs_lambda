const log = require('lambda-log');
const AWSXRay = require('aws-xray-sdk');

const myfunction = async () => {
  log.info('Hello World from DLQ TRIGGER')
};

exports.Handler = async (event,context,callback) => {
  log.info('START:', event)

  try {
    const data = await myfunction();
    log.info(data)
    event.Records.forEach(record => {
      const { body,messageId } = record;
      AWSXRay.captureFunc('annotations', function(subsegment) {
        subsegment.addAnnotation('sqsmessageid', messageId);
      });
      log.info(body)
    });
    return {statusCode: 200}
  } catch (error) {
    log.error(error, ['DATADOG_EVENT']);
    callback(new Error('Something went wrong'));
  }
};
