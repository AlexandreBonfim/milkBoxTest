import { DynamoDB } from 'aws-sdk';
import getErrorResponse from '../helpers/errorHandler';

const dynamoDb = new DynamoDB.DocumentClient()

 export default async function get(id) {
  try {
    // Get the item from the table
    var params = {
      TableName : process.env.DYNAMODB_TABLE,
      Key: { id: id },
    };

    const result = await dynamoDb.get(params).promise();

    if (result.Item === undefined) {
      return getErrorResponse(404, 'Couldn\'t fetch the todo item.');
    }

    // create a response
    const response = {
          statusCode: 200,
          body: JSON.stringify(result.Item)
    };

    // All log statements are written to CloudWatch
    console.info(response);

    return response;
  } catch (err) {
    console.error(err);
    return getErrorResponse(500, err.message);
  }
}
