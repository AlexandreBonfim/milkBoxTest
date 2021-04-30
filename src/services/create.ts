import { uuid } from 'uuidv4';
import { DynamoDB } from 'aws-sdk';
import { responseHandler }from '../helpers';

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

    // All log statements are written to CloudWatch
    console.info('Post succeeded', params.Item);

    return responseHandler.Created(params.Item);
  } catch (err) {
    console.error(err);
    return responseHandler.Gateway(err.message);
  }
}
