import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { TodoRepository } from '../../repository/todoRepository';
import { TodoAccess } from '../../infra/TodoAccess';

const logger = createLogger('deleteTodo')
const repository = new TodoRepository(new TodoAccess());

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  try {

    await repository.deleteTodo(todoId);

    // SUCCESS
    logger.info('Deleted TODO', { todoId });
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }
  }
  catch (e) {
    // FAIL
    logger.error('Unable to delete TODO', { e });
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: e.message
    }
  }
}
