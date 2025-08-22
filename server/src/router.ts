import express from 'express';
import lists from '../data/sample_data.json';
import { TodoList } from './todoList';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ListItem, ListItemInterface } from './listItem';

const app = express();
const port = 3001;
const todoLists: TodoList[] = [];
const users: Set<string> = new Set();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

function init() {
    // build model from the stored file
    for (const l of lists['lists']) {
        const items: ListItemInterface[] = [];
        for (const i of l.items) {
            items.push(new ListItem(i.name, i.isCompleted));
        }
        const todoList: TodoList = new TodoList(l.name, l.owner, items);
        todoLists.push(todoList);
        users.add(l.owner);
    }
}

app.post('/lists', async (req, res) => {
    // create new list
    const newList = new TodoList(req.body.name, req.body.owner, req.body.items);
    todoLists.push(newList)
    res.status(200).json(newList);
});

app.options('/lists', async (req, res) => {
    res.status(200);
});

app.get('/lists', 
 async (req, res) => {
    // console.log(req.headers.authorization);
    // get all lists of the given owner
    const filteredList = todoLists.filter(o => o.owner == req.query.owner);    
    res.status(200).json(filteredList);
});

app.get('/users', 
    async (req, res) => { 
        res.status(200).json(Array.from(users));
   });

app.put('/lists/:id', async (req, res) => {
    // update the name and items of a list by id
    const filteredList = todoLists.filter(o => o.id == req.params.id);
    const index = todoLists.indexOf(filteredList[0]);
    if (index >= 0) {
        todoLists[index].name = req.body.itemData.name;
        todoLists[index].items = req.body.itemData.items;
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
