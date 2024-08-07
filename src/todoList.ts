import { ListItem } from "./listItem";

export class TodoList {
    name: string;
    owner: string;
    items: ListItem[];

    constructor(name: string, owner: string, items: ListItem[]) {
        this.name = name;
        this.owner = owner;
        this.items = items;
    }

    addItem(name: string, index: number, isCompleted: boolean) {
        this.items.push(new ListItem(name, index, isCompleted))
    }
}