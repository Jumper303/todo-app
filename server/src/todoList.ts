import { ListItem, ListItemInterface } from "./listItem";
import { getUuid } from "./utils";

export class TodoList {
    id: string;
    name: string;
    owner: string;
    items: ListItemInterface[];

    constructor(name: string, owner: string, items: ListItemInterface[]) {
        this.id = getUuid();
        this.name = name;
        this.owner = owner;
        this.items = items;
    }

    insertItem(listItem: { name: string, index: number, isCompleted: boolean }) {
        this.items.splice(listItem.index, 0, new ListItem(listItem.name,  listItem.isCompleted))
    }

    appendItem(listItem: { name: string, isCompleted: boolean }) {
        this.items.push(new ListItem(listItem.name, listItem.isCompleted))
    }

    removeItem(index: number) {
        if (index >=0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    completeItem(index: number) {
        if (index >=0 && index < this.items.length) {
            this.items[index].isCompleted = !this.items[index].isCompleted;
        }
    }

    renameItem(index: number, name: string) {
        if (index >=0 && index < this.items.length) {
            this.items[index].name = name;
        }
    }

    swapItems(indexFrom: number, indexTo: number) {
        if (indexFrom >=0 && indexFrom < this.items.length && indexTo >=0 && indexTo < this.items.length) {
            const original: ListItem = this.items[indexFrom];
            this.items[indexFrom] = this.items[indexTo];
            this.items[indexTo] = original;
        }
    }

    searchItem(term: string):  ListItem[] {  
        return this.items.filter(x=>x.name.includes(term));        
    }
}