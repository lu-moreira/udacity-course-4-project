import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ITodoRepoAdapter } from '../repository/todoRepository';
import { TodoItem } from "../models/TodoItem";
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)

export class TodoAccess implements ITodoRepoAdapter {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODO_TABLE
    ) { }

    async post(item: TodoItem) {
        const params = {
            TableName: this.todoTable,
            Item: item
        };

        await this.docClient.put(params).promise();
    }
}
