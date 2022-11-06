const log = require('lambda-log');
const dictionaryError = require('./dictionaries/errorDictionary');
const { application } = require('../config');
const datadogTag = application.datadogTag;

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

function response(data, status = null) {
  const response = {
    statusCode: status ? status : isEmpty(data) ? 204 : 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: data,
    isBase64Encoded: false,
  };

  if (Number(response.statusCode) < 400) {
    log.info(
      '[RESPONSE]',
      { response: Object.assign(response, { body: '****' }) },
      [datadogTag]
    );
  } else {
    log.error('[RESPONSE_ERROR]', response, [datadogTag]);
  }

  return Object.assign(response, { body: JSON.stringify(data) });
}

function error(error) {
  const errorKey = typeof error === 'string' ? error : error.errorMessage;
  let errorResponse = dictionaryError[errorKey];
  if (!errorResponse) {
    log.error('[ERROR]', error);
    errorResponse = dictionaryError['default'];
  }

  if (error.errorValue) {
    errorResponse.body.error.message = `${errorResponse.body.error.message}: ${error.errorValue}`;
  }

  return response(errorResponse.body, errorResponse.statusCode);
}

module.exports = {
  response,
  error,
};
