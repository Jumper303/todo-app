
import { TodoList } from "./todoList";



describe('Todo list', () => {
    it('should add items to a list', () => {
        const firstTodoList: TodoList = new TodoList("myList", "me", [])
        firstTodoList.addItem({ name: "first", index: 0, isCompleted: true });
        firstTodoList.addItem({ name: "second", index: 0, isCompleted: false });
        expect(firstTodoList.items.length).toBe(2);
    });
}
);

