const AWS = require('aws-sdk');
const { errorResponse, response } = require('./helpers/response');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, _context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid,
    },
  };

  dynamoDb.delete(params, error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      callback(
        null,
        errorResponse(error.statusCode, 'Unable to delete book item.')
      );
      return;
    }

    callback(null, response({}));
  });
};
