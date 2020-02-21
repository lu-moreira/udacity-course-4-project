import { TodoItem } from "../models/TodoItem";
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { v4 as uuid } from 'uuid';

// POST, PUT, DELETE, GET, GET_ALL

export interface ITodoRepoAdapter {
    post(item: TodoItem)
}

export class TodoRepository {

    constructor(
        private readonly store: ITodoRepoAdapter
    ) { }

    async  createTodo(request: CreateTodoRequest, userId: string) : Promise<TodoItem> {
        const createdAt = new Date().toISOString();
        const newItem: TodoItem = {
            todoId: uuid(),
            userId,
            createdAt,
            name: request.name,
            dueDate: request.dueDate,
            done: false
        }

        await this.store.post(newItem);
        return newItem
    }

}