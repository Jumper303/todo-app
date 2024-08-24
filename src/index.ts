import express from 'express';
import lists from '../data/sample_data.json';
import { TodoList } from './todoList';

const app = express();
const port = 3001;
const todoLists: TodoList[] = [];

function init() {
    // build model from the stored file
    for (const l of lists['lists']) {
        const todoList: TodoList = new TodoList(l.name, l.owner, l.items);
        todoLists.push(todoList);
    }
}

app.get('/get-lists', async (req, res) => {
    // get all lists of the given owner
    const filteredList = todoLists.filter(o => o.owner == req.query.owner);
    res.status(200).json(filteredList);
});

app.get('/search-list', async (req, res) => {
    // search in a specific list of the user, return only the matching items
    const filteredList = todoLists.filter(o => (o.owner == req.query.owner && o.name == req.query.name));    
    const term = req.query.term?.toString() ?? "";
    // currently a user can't have more lists with the same name
    res.status(200).json(filteredList[0].searchItem(term));
});

// app.get('/search-lists', async (req, res) => {
//     // search in all lists of the user, return all matching lists, highlilght the matches    
// });

app.listen(port, () => {
    init();
    console.log(`TODO app listening on port ${port}`)
});
