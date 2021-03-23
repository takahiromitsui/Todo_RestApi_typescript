import { Router } from 'express';
import { Todo } from '../models/todo';

const todos: Todo[] = [];
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
export default router;
