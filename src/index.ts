import getErrorResponse from './helpers/errorHandler';
import { create } from './services';

exports.createHandler = async (event) => {
  if (event){
    if (event.httpMethod !== 'POST') {
        console.error(`newTodo path only accept POST method, you tried: ${event.httpMethod}`);
        return getErrorResponse(`newTodo path only accept POST method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get properties from the body of the request
    const todo = JSON.parse(event.body);

    if (todo === undefined) {
      console.info('Missing parameters.');
      return getErrorResponse('Missing parameters.');
    }

    return await create(todo);

  } else {
    console.error('Failed, missing event.');
    return getErrorResponse('Missing event.');
  }
};
