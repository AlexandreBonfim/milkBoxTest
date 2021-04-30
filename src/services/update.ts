import { DynamoDB } from 'aws-sdk';
import { responseHandler } from '../helpers';

const dynamoDb = new DynamoDB.DocumentClient()

 export default async function update(id: number, todo) {
  // Validation
  if (typeof todo.description !== 'string' || typeof todo.isCompleted !== 'boolean') {
    console.error('Couldn\'t update the todo item');
    return responseHandler.NotFound({ message: 'Couldn\'t update the todo item' });
  }

  try {
    // Get the item from the table
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: id,
      },
      ExpressionAttributeNames: {
        '#todo_desc': 'description',
      },
      ExpressionAttributeValues: {
        ':description': todo.description,
        ':isCompleted': todo.isCompleted,
        ':updatedAt': Date.now(),
      },
      UpdateExpression: 'SET #todo_desc = :description, isCompleted = :isCompleted, updatedAt = :updatedAt',
      ReturnValues: 'ALL_NEW',
    };

    // Update the todo in the database
    const response = await dynamoDb.update(params).promise();

    // All log statements are written to CloudWatch
    console.info('Update succeeded', response.Attributes);

    return responseHandler.Ok(response.Attributes);
  } catch (err) {
    console.error(err);
    return responseHandler.Gateway(err.message);
  }
}
