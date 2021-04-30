import { DynamoDB } from 'aws-sdk';
import { default as getTodo } from './get';
import { responseHandler }from '../helpers';

const dynamoDb = new DynamoDB.DocumentClient()

 export default async function remove(id: string) {
  // Check if todo exist
  if (await getTodo(id) === null) {
      console.error('Couldn\'t fetch the todo item');
      return responseHandler.NotFound({ message: 'Couldn\'t fetch the todo item' });
  }

  try {
    // Get the item from the table
    const params = {
      TableName : process.env.DYNAMODB_TABLE,
      Key: { id: id },
    };

    // delete the todo from the database
    await dynamoDb.delete(params).promise();

    // All log statements are written to CloudWatch
    console.info('Delete succeeded');

    return responseHandler.Ok();
  } catch (err) {
    console.error(err);
    return responseHandler.Gateway(err.message);
  }
}
