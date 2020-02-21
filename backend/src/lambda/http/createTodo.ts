import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'
import { getUserIdFromJwt } from '../../auth/utils';
import { TodoRepository } from '../../repository/todoRepository';
import { TodoAccess } from '../../infra/TodoAccess';

const logger = createLogger('createTodo')
const repository = new TodoRepository(new TodoAccess());

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const request   = JSON.parse(event.body) as CreateTodoRequest
    const userId = getUserIdFromJwt(event);
    var newItem = await repository.createTodo(request, userId)

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ item: newItem })
    }
  }
  catch (e) {
    // Return FAIL
    logger.error('Unable to create TODO', { e });
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: e.message
    }
  }
}
