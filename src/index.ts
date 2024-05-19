import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date; // เพิ่มเข้าไปเก็บเวลาที่สร้าง todo
  completedAt?: Date; // เพิ่มเข้าไปเก็บเวลาที่ทำ todo เสร็จแล้ว
}


let todos: { id: number, task: string, completed: boolean }[] = [];

// GET all todos
app.get('/api/todos', (req: Request, res: Response) => {
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req: Request, res: Response) => {
  const { task } = req.body;
  const newTodo: Todo = {
    id: todos.length + 1,
    task,
    completed: false,
    createdAt: new Date(), // เวลาที่สร้าง todo
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update a todo
app.put('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      task,
      completed,
      completedAt: completed ? new Date() : undefined, // เวลาที่ทำเสร็จ todo (ถ้า completed เป็น true)
    };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});


// DELETE a todo
app.delete('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).end();
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
