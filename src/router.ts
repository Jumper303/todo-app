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

app.post('/lists', async (req, res) => {
    // create new list
    todoLists.push(new TodoList(req.body.name, req.body.owner, req.body.items))
    res.status(200).json();
});

app.get('/lists', async (req, res) => {
    // get all lists of the given owner
    const filteredList = todoLists.filter(o => o.owner == req.query.owner);
    res.status(200).json(filteredList);
});

app.put('/lists/:id', async (req, res) => {
    // update the name and items of a list by id
    const filteredList = todoLists.filter(o => o.id == req.params.id);
    const index = todoLists.indexOf(filteredList[0]);
    if (index >= 0) {
        todoLists[index].name = req.body.name;
        todoLists[index].items = req.body.items;
        res.status(200).json();
    } else {
        res.status(404).json();
    }
});

app.delete('/lists/:id', async (req, res) => {
    // delete a list by id
    const filteredList = todoLists.filter(o => o.id == req.params.id);
    const index = todoLists.indexOf(filteredList[0]);
    if (index >= 0) {
        todoLists.splice(index, 1);
        res.status(200).json();
    } else {
        res.status(404).json();
    }
});

app.listen(port, () => {
    init();
    console.log(`TODO app listening on port ${port}`)
});
