import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { v4 as uuid } from 'uuid';
import { createLogger } from '../../utils/logger'
import { DynamoDB } from 'aws-sdk';
import { getUserIdFromJwt } from '../../auth/utils';
import { TodoItem } from '../../models/TodoItem';

const logger = createLogger('createTodo')
const docClient = new DynamoDB.DocumentClient();
const TODO_TABLE = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { name, dueDate }: CreateTodoRequest = JSON.parse(event.body)
    const userId = getUserIdFromJwt(event);
    const createdAt = new Date().toISOString();
    const newItem: TodoItem = {
      todoId: uuid(),
      userId,
      createdAt,
      name,
      dueDate,
      done: false
    }

    const params = {
      TableName: TODO_TABLE,
      Item: newItem
    };

    await docClient.put(params).promise();

    // Return SUCCESS
    logger.info('Created TODO', { newItem });
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
