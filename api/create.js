const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, _context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      uuid: data.uuid || uuid.v1(),
      name: data.name,
      releasedDate: data.releasedDate || timestamp,
      authorName: data.authorName
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't create the book item."
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };

    callback(null, response);
    return;
  });
};
