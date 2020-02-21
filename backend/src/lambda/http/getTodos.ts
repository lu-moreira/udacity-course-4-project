import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserIdFromJwt } from '../../auth/utils'
import { createLogger } from '../../utils/logger'
import { TodoRepository } from '../../repository/todoRepository';
import { TodoAccess } from '../../infra/TodoAccess';

const logger = createLogger('getTodos')

const repository = new TodoRepository(new TodoAccess());

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    logger.info('Getting TODOs')
    const userId = getUserIdFromJwt(event);
    const result = await repository.getTodosByUserId(userId)

    // SUCCESS
    logger.info('Scanned TODO');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ items: result })
    }
  }
  catch (e) {
    // FAIL
    logger.error('Unable to scan TODO', { e });
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: e.message
    }
  }
}