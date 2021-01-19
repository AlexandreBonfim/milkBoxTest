import { DynamoDB } from 'aws-sdk';
import getErrorResponse from '../helpers/errorHandler';

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

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (err) {
    console.error(err);
    return getErrorResponse(500, err.message);
  }
}
