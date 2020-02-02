const AWS = require("aws-sdk");
const { errorResponse, response } = require("./helpers/response");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE
};

module.exports.list = (_event, _context, callback) => {
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the books."
      });
      return;
    }

    callback(null, response(result.Items));
  });
};
