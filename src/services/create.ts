import { uuid } from 'uuidv4';
import { DynamoDB } from 'aws-sdk';
import getErrorResponse from '../helpers/errorHandler';

// interface Request {
//   description: string;
//   isCompleted: bool;
// }

const dynamoDb = new DynamoDB.DocumentClient()

 export default async function create(todo) {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid(),
        description: todo.description,
        isCompleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    }

    // write the todo to the database
    await dynamoDb.put(params).promise();

    // create a response
    const response = {
          statusCode: 200,
          body: JSON.stringify(params.Item)
    };

    // All log statements are written to CloudWatch
    console.info(response);

    return response;
  } catch (err) {
    console.error(err);
    return getErrorResponse(err.message);
  }
}
