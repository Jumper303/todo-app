import { TodoList } from "../src/todoList";



describe('Todo list', () => {

    it('should shift items when inserting item to an exising position', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        todoList.insertItem({ name: "first", index: 0,  isCompleted: true });     
        todoList.insertItem({ name: "third", index: 1, isCompleted: false });
        todoList.insertItem({ name: "fourth", index: 2, isCompleted: false });
        expect(todoList.items.length).toBe(3);
        expect(todoList.items[0]['name']).toBe('first');     
        expect(todoList.items[1]['name']).toBe('third');             
        expect(todoList.items[2]['name']).toBe('fourth');             
        todoList.insertItem({ name: "second", index: 1, isCompleted: false });
        expect(todoList.items[0]['name']).toBe('first');     
        expect(todoList.items[1]['name']).toBe('second');             
        expect(todoList.items[2]['name']).toBe('third');            
        expect(todoList.items[3]['name']).toBe('fourth');            
    });

    it('should append items to the end of the list', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        todoList.appendItem({ name: "first", isCompleted: true });
        todoList.appendItem({ name: "second", isCompleted: false });
        expect(todoList.items.length).toBe(2);        
        expect(todoList.items[0]['name']).toBe('first');     
        expect(todoList.items[1]['name']).toBe('second');     
    });

    it('should remove specific item from the list', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        todoList.insertItem({ name: "first", index: 0,  isCompleted: true });     
        todoList.insertItem({ name: "third", index: 1, isCompleted: false });
        todoList.insertItem({ name: "fourth", index: 2, isCompleted: false });
        todoList.removeItem(1);
        expect(todoList.items[0]['name']).toBe('first');             
        expect(todoList.items[1]['name']).toBe('fourth');
    });

    it('should complete and invert completition', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        todoList.insertItem({ name: "first", index: 0,  isCompleted: false });             
        todoList.completeItem(0);        
        expect(todoList.items[0].isCompleted).toBe(true);
        todoList.completeItem(0);        
        expect(todoList.items[0].isCompleted).toBe(false);
    });

    it('should rename item', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        todoList.insertItem({ name: "first", index: 0,  isCompleted: false });                     
        todoList.renameItem(0, "newItem")
        expect(todoList.items[0].name).toBe("newItem");
    });

    it('should swap items', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        todoList.appendItem({ name: "first",  isCompleted: false });                     
        todoList.appendItem({ name: "second", isCompleted: true });                     
        todoList.swapItems(0, 1);
        expect(todoList.items[0].name).toBe("second");
        expect(todoList.items[1].name).toBe("first");
    });

    it('should find items by search term', () => {
        const todoList: TodoList = new TodoList("myList", "me", [])
        expect(todoList.searchItem("se").length).toBe(0);
        todoList.appendItem({ name: "first",  isCompleted: false });                     
        todoList.appendItem({ name: "second", isCompleted: true });                     
        todoList.appendItem({ name: "seon", isCompleted: true });
        const searchResult = todoList.searchItem("se");
        expect(searchResult.length).toBe(2);
    });
}
);

