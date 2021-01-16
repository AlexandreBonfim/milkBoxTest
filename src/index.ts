import {
  createTodo,
  getTodo,
  getTodoList,
  updateTodo,
  removeTodo
} from './services';
import getErrorResponse from './helpers/errorHandler';

// Routes
exports.createHandler = async (event) => {
  if (event){
    if (event.httpMethod !== 'POST') {
        console.error(`newTodo path only accept POST method, you tried: ${event.httpMethod}`);
        return getErrorResponse(400, `newTodo path only accept POST method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get properties from the body of the request
    const todo = JSON.parse(event.body);

    if (todo === undefined) {
      console.info('Missing parameters.');
      return getErrorResponse(400, 'Missing parameters.');
    }

    return await createTodo(todo);

  } else {
    console.error('Failed, missing event.');
    return getErrorResponse(400, 'Missing event.');
  }
};

exports.getHandler = async (event) => {
   if (event){
    if (event.httpMethod !== 'GET') {
        console.error(`getTodo path only accept GET method, you tried: ${event.httpMethod}`);
        return getErrorResponse(400, `getTodo path only accept GET method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id
    const id = event.pathParameters.id;

    if (id === undefined) {
      console.info('Missing parameter.');
      return getErrorResponse(400, 'Missing parameter.');
    }

    return await getTodo(id);

  } else {
    console.error('Failed, missing event.');
    return getErrorResponse(400, 'Missing event.');
  }
};

exports.getListHandler = async (event) => {
  if (event){
    if (event.httpMethod !== 'GET') {
        console.error(`getTodoList path only accept GET method, you tried: ${event.httpMethod}`);
        return getErrorResponse(400, `getTodoList path only accept GET method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    const pageSize = event.queryStringParameters.pageSize;
    const lastItemId = event.queryStringParameters.lastItemId;

    return await getTodoList(pageSize, lastItemId);
  } else {
    console.error('Failed, missing event.');
    return getErrorResponse(400, 'Missing event.');
  }
};

exports.updateHandler = async (event) => {
  if (event){
    if (event.httpMethod !== 'PUT') {
        console.error(`updateTodo path only accept PUT method, you tried: ${event.httpMethod}`);
        return getErrorResponse(400, `updateTodo path only accept PUT method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get todo
    const todo = JSON.parse(event.body);
    const id = event.pathParameters.id;

    if (todo === undefined) {
      console.info('Missing body');
      return getErrorResponse(400, 'Missing body');
    }

    return await updateTodo(id, todo);

  } else {
    console.error('Failed, missing event.');
    return getErrorResponse(400, 'Missing event.');
  }
};

exports.deleteHandler = async (event) => {

   if (event){
    if (event.httpMethod !== 'DELETE') {
        console.error(`deleteTodo path only accept DELETE method, you tried: ${event.httpMethod}`);
        return getErrorResponse(400, `deleteTodo path only accept DELETE method, you tried: ${event.httpMethod}`);
    }

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id
    const id = event.pathParameters.id;

    if (id === undefined) {
      console.info('Missing parameter.');
      return getErrorResponse(400, 'Missing parameter.');
    }

    return await removeTodo(id);

  } else {
    console.error('Failed, missing event.');
    return getErrorResponse(400, 'Missing event.');
  }
};
