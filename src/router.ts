import express from 'express';
import lists from '../data/sample_data.json';
import { TodoList } from './todoList';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;
const todoLists: TodoList[] = [];

app.use(bodyParser.json());

function init() {
    // build model from the stored file
    for (const l of lists['lists']) {
        const todoList: TodoList = new TodoList(l.name, l.owner, l.items);
        todoLists.push(todoList);
    }
}

app.get('/lists', async (req, res) => {
    // get all lists of the given owner
    const filteredList = todoLists.filter(o => o.owner == req.query.owner);
    res.status(200).json(filteredList);
});

app.post('/lists', async (req, res) => {
    // create new list
    todoLists.push(new TodoList(req.body.name, req.body.owner, req.body.items))
    res.status(200).json();
});

app.listen(port, () => {
    init();
    console.log(`TODO app listening on port ${port}`)
});
