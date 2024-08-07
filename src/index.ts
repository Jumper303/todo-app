/* eslint-disable @typescript-eslint/no-var-requires */
import { TodoList } from "./todoList";

const firstTodoList: TodoList = new TodoList("myList", "me", [])
firstTodoList.addItem("first", 0, false);
firstTodoList.addItem("second", 1, false);

console.log(JSON.stringify(firstTodoList));