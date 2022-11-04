const log = require('lambda-log');

const myfunction = async () => {
  log.info("Hello World from SQS TRIGGER")
};

exports.Handler = async (event) => {
  log.info("START:", event)
  try {
    const data = await myfunction();
    return {statusCode: 200}
  } catch (error) {
    log.error(error, ['DATADOG_EVENT']);
    return error
  }
};
