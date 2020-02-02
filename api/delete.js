const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, _context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid
    }
  };

  dynamoDb.delete(params, error => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't remove the book item."
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({})
    };

    callback(null, response);
    return;
  });
};
