import { Router } from 'express';
import { Todo } from '../models/todo';

let todos: Todo[] = [];
const router = Router();

router.get('/', (req, res, next) => {
	res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
	const newTodo: Todo = {
		id: new Date().toISOString(),
		text: req.body.text,
	};
	todos.push(newTodo);
	res.status(200).json({ message: 'Add todo', todo: newTodo, todos: todos });
});

//Replace todo
router.put('/todo/:todoId', (req, res, next) => {
	const todoId = req.params.todoId;
	const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
	if (todoIndex >= 0) {
		todos[todoIndex] = {
			id: todos[todoIndex].id,
			text: req.body.text,
		};
		return res.status(200).json({ message: 'Updated todo', todos: todos });
	}
	res.status(404).json({ message: 'Could not find for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
	const todoId = req.params.todoId;
	todos = todos.filter(todoItem => todoItem.id !== todoId);
	res.status(200).json({ message: 'Deleted todo', todos: todos });
});
export default router;
