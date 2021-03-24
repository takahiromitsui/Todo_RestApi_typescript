import { Router } from 'express';
import { getTodos, postTodo, editTodo, deleteTodo } from '../controllers/todo';
const router = Router();

router.get('/', getTodos);

router.post('/todo', postTodo);

router.put('/todo/:todoId', editTodo);

router.delete('/todo/:todoId', deleteTodo);

export default router;
