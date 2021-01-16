import { DynamoDB } from 'aws-sdk';
import getErrorResponse from '../helpers/errorHandler';

const dynamoDb = new DynamoDB.DocumentClient()

 export default async function get(id: string) {
  try {
    // Get the item from the table
    const params = {
      TableName : process.env.DYNAMODB_TABLE,
      Key: { id: id },
    };

    // create a response
    const response = await dynamoDb.get(params).promise();

    if (response.Item === undefined) {
      console.error('Couldn\'t fetch the todo items');
      return getErrorResponse(404, 'Couldn\'t fetch the todo item');
    }

    // All log statements are written to CloudWatch
    console.info('Query succeeded', response.Item);

    return {
      statusCode: 200,
      body: JSON.stringify(response.Item)
    };
  } catch (err) {
    console.error(err);
    return getErrorResponse(500, err.message);
  }
}
