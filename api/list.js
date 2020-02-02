const AWS = require('aws-sdk');
const { errorResponse, response } = require('./helpers/response');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (_event, _context, callback) => {
  return dynamoDb.scan(params, (error, result) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      callback(
        null,
        errorResponse(error.statusCode, 'Unable to list book items.')
      );
      return;
    }

    callback(null, response(result.Items));
  });
};
