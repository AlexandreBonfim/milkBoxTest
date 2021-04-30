import { DynamoDB } from 'aws-sdk';
import { responseHandler }from '../helpers';

const dynamoDb = new DynamoDB.DocumentClient()

 export default async function getList(pageSize: number, lastItemId?: string) {
  try {
    // get all items from the table
    let params = {
        TableName : process.env.DYNAMODB_TABLE,
        Limit: pageSize,
    };

    // In case next page pass previous page last item
    if(lastItemId) {
      params["ExclusiveStartKey"] = { id: lastItemId };
    }

    const result = await dynamoDb.scan(params).promise();

    if (result.Items === undefined) {
      console.error('Couldn\'t fetch the todo items');
      return responseHandler.NotFound({ message: 'Couldn\'t fetch the todo items' });
    }

    // All log statements are written to CloudWatch
    console.info('Query succeeded', result);

    // create a response
    const response = {
      items:  result.Items,
      lastItemId: result.LastEvaluatedKey,
      //totalItem: result.Items.count, @todo: how to implement below?
      //pageSize: pageSize,
      //currentPage: 1,
    };

    return responseHandler.Ok(response);
  } catch (err) {
    console.error(err);
    return responseHandler.Gateway(err.message);
  }
}
