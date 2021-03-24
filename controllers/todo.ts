import { Request, Response, NextFunction } from 'express';
import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParam = { todoId: string };

let todos: Todo[] = [];

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({ todos: todos });
};

export const postTodo = (req: Request, res: Response, next: NextFunction) => {
	const body = req.body as RequestBody;
	const newTodo: Todo = {
		id: new Date().toISOString(),
		text: body.text,
	};
	todos.push(newTodo);
	res.status(200).json({ message: 'Add todo', todo: newTodo, todos: todos });
};

export const editTodo = (req: Request, res: Response, next: NextFunction) => {
	const params = req.params as RequestParam;
	const todoId = params.todoId;
	const body = req.body as RequestBody;
	const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
	if (todoIndex >= 0) {
		todos[todoIndex] = {
			id: todos[todoIndex].id,
			text: body.text,
		};
		return res.status(200).json({ message: 'Updated todo', todos: todos });
	}
	res.status(404).json({ message: 'Could not find for this id.' });
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
	const params = req.params as RequestParam;
	const todoId = params.todoId;
	todos = todos.filter(todoItem => todoItem.id !== todoId);
	res.status(200).json({ message: 'Deleted todo', todos: todos });
};
