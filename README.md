# Serverless REST API

Simple API example for a [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create, list, get, update and delete book items. DynamoDB is used to store the data.

## Structure

This service has a separate file for each operation inside an `api` directory e.g. `api/delete.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

## Test

Execute the integration tests in the file: `serverless.test.yml`

```bash
serverless test
```

## Usage

You can create, retrieve, update, or delete books with the following commands:

### Create a book

```bash
curl -X POST https://XXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/books/add --data '{ "name": "Serverless", "releasedDate": "Peter Pan", "releasedDate": 1580670021877 }'
```

Example Result:

```bash
{"name": "Serverless","uuid":"ee6490d0-aa11e6-9ede-afdfa051af86","releasedDate": "Peter Pan", "releasedDate": 1580670021877}
```

### List all books

```bash
curl https://XXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/books
```

Example output:

```bash
[{"uuid":"c3bc50a0-45e4-11ea-922f-09012ff1aa8c","releasedDate":1580665942698,"authorName":"an author","name":"a book"}]
```

### Get one book

```bash
# Replace the <uuid> part with a real id from your books table
curl https://XXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/books/<uuid>
```

Example Result:

```bash
{"uuid":"c3bc50a0-45e4-11ea-922f-09012ff1aa8c","releasedDate":1580665942698,"authorName":"an author","name":"a book"}
```

### Update a book

```bash
# Replace the <uuid> part with a real id from your books table
curl -X POST https://XXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/books/<id>/update --data '{ "name": "Learn Serverless", "authorName": "Peter P", "releasedDate": 1580665942698 }'
```

Example Result:

```bash
{ "name":"Learn Serverless","uuid":"ee6490d0-aa11e6-9ede-afdfa051af86","authorName": "Peter P", "releasedDate": 1580665942698 }
```

### Delete a book

```bash
# Replace the <uuid> part with a real id from your books table
curl -X POST https://XXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/books/<uuid>/delete
```

No output

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
ProvisionedThroughput:
  ReadCapacityUnits: 1
  WriteCapacityUnits: 1
```

In case you expect a lot of traffic fluctuation we recommend to checkout this guide on how to auto scale DynamoDB [https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/](https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/)
