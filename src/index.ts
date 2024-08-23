import express from 'express';
import lists from '../data/sample_data.json';
import { TodoList } from './todoList';
const app = express();
const port = 3001;

function init() {
    const todoList: TodoList = new TodoList("myList2", "me", [])
    todoList.appendItem({ name: "sixth",  isCompleted: false });          
    lists['lists'].push(todoList);
}

app.get('/getLists', async (req, res) => {
    if(req.query.owner) {
        const filteredList = lists['lists'].filter(o=>o.owner==req.query.owner);
        res.status(200).json(filteredList);
    } else {
        res.status(200).json(lists);
    }
});

app.listen(port, () => {
    init();
    console.log(`TODO app listening on port ${port}`)
});
