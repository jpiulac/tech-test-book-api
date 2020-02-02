const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, _context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid
    },
    ExpressionAttributeNames: {
      "#book_name": "name"
    },
    ExpressionAttributeValues: {
      ":name": data.name,
      ":releasedDate": data.releasedDate || timestamp,
      ":authorName": data.authorName
    },
    UpdateExpression:
      "SET #book_name = :name, authorName = :authorName, releasedDate = :releasedDate",
    ReturnValues: "ALL_NEW"
  };

  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the book item." + error.message
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
    callback(null, response);
  });
};
