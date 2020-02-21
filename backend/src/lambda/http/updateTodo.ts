import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import { TodoRepository } from '../../repository/todoRepository';
import { TodoAccess } from '../../infra/TodoAccess';

const logger = createLogger('updateTodo')

const repository = new TodoRepository(new TodoAccess());

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Entered update handler')
  const todoId = event.pathParameters.todoId

  try {
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    await repository.updateTodoById(todoId, updatedTodo)

    // SUCCESS
    logger.info('Updated TODO', { todoId });
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
    logger.error('Unable to update TODO', { e });
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: e.message
    }
  }

}
