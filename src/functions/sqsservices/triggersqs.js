const log = require('lambda-log');

const myfunction = async () => {
  log.info('Hello World from SQS TRIGGER')
};

exports.Handler = async (event,context,callback) => {
  log.info('START:', event)

  try {
    const data = await myfunction();
    log.info(data)
    event.Records.forEach(record => {
      const { body } = record;
      if (body == 'ERROR'){
        callback(new Error('Something went wrong'));
      }
    });
    return {statusCode: 200}
  } catch (error) {
    log.error(error, ['DATADOG_EVENT']);
    callback(new Error('Something went wrong'));
  }
};
