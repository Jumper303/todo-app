import express from 'express';
import { TodoList } from './todoList';
const app = express();
const port = 3001;

app.get('/getList', async (req, res) => {
    const todoList: TodoList = new TodoList("myList", "me", [])
    todoList.appendItem({ name: "first",  isCompleted: false });                     
    todoList.appendItem({ name: "second", isCompleted: true });   
    res.status(200).json(JSON.stringify(todoList));
});

app.listen(port, () => {
    console.log(`TODO app listening on port ${port}`)
});
