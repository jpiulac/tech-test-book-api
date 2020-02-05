const AWS = require('aws-sdk');
const { errorResponse, response } = require('./helpers/response');
const validateBook = require('./helpers/validate');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const parseBody = event => {
  try {
    const data = JSON.parse(event.body || {});
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to parse json data');
    return null;
  }
};

const updateExpression = (event, data) => {
  const { name, authorName, releaseDate } = data;
  const update = [];
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid,
    },
    ExpressionAttributeValues: {},
    UpdateExpression: null,
    ReturnValues: 'ALL_NEW',
  };
  if (name) {
    params.ExpressionAttributeNames = { '#book_name': 'name' };
    params.ExpressionAttributeValues[':name'] = name;
    update.push('#book_name = :name');
  }
  if (authorName) {
    params.ExpressionAttributeValues[':authorName'] = authorName;
    update.push('authorName = :authorName');
  }
  if (releaseDate) {
    params.ExpressionAttributeValues[':releaseDate'] = releaseDate;
    update.push('releaseDate = :releaseDate');
  }
  params.UpdateExpression = `SET ${update.join(', ')}`;

  return params;
};

module.exports.update = (event, _context, callback) => {
  if (!event.body) {
    callback(
      null,
      errorResponse('400', 'Invalid request for update book item.')
    );
    return;
  }

  const data = parseBody(event);
  if (!data) {
    callback(null, errorResponse('400', 'Invalid request body.'));
    return;
  }
  if (!validateBook(data)) {
    callback(null, errorResponse('400', 'Invalid book item.'));
    return;
  }
  const params = updateExpression(event, data);
  dynamoDb.update(params, (error, result) => {
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
