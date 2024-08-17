/* eslint-disable @typescript-eslint/no-var-requires */
import { TodoList } from "./todoList";

const firstTodoList: TodoList = new TodoList("myList", "me", [])
firstTodoList.addItem({name: "first", index: 0, isCompleted: true});
firstTodoList.addItem({name: "second", index: 0, isCompleted: false});

console.log(JSON.stringify(firstTodoList));