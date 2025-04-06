import { getUuid } from "./utils";

export interface ListItemInterface {
    id: string;
    name: string;
    isCompleted: boolean;
}
export class ListItem implements ListItemInterface {
    id: string;
    name: string;
    isCompleted: boolean;

    constructor(name: string, isCompleted: boolean) {
        this.id = getUuid();
        this.name = name;
        this.isCompleted = isCompleted;
    }

}
