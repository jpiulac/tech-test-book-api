const AWS = require('aws-sdk');
const { errorResponse, response } = require('./helpers/response');
const validateBook = require('./helpers/validate');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, _context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (!validateBook(data)) {
    return callback(null, errorResponse('400', 'Invalid book item.'));
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid,
    },
    ExpressionAttributeNames: {
      '#book_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':releaseDate': data.releaseDate || timestamp,
      ':authorName': data.authorName,
    },
    UpdateExpression:
      'SET #book_name = :name, authorName = :authorName, releaseDate = :releaseDate',
    ReturnValues: 'ALL_NEW',
  };

  return dynamoDb.update(params, (error, result) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      callback(
        null,
        errorResponse(error.statusCode, 'Unable to update book item.')
      );
      return;
    }
    callback(null, response(result.Attributes));
  });
};
