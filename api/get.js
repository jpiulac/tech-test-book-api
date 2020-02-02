const AWS = require("aws-sdk");
const { errorResponse, response } = require("./helpers/response");

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.get = (event, _context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the book item."
      });
      return;
    }

    callback(null, response(result.Item));
  });
};
