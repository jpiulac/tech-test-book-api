const uuid = require('uuid');
const AWS = require('aws-sdk');
const { errorResponse, response } = require('./helpers/response');
const validateBook = require('./helpers/validate');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, _context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (!validateBook(data)) {
    return callback(null, errorResponse('400', 'Invalid book item.'));
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      // for testing we can pass a uuid
      uuid: data.uuid || uuid.v1(),
      name: data.name,
      releasedDate: data.releasedDate || timestamp,
      authorName: data.authorName,
    },
  };

  return dynamoDb.put(params, error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      callback(
        null,
        errorResponse(error.statusCode, 'Unable to create book item.')
      );
      return;
    }

    callback(null, response(params.Item));
  });
};
