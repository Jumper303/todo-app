export interface ListItemInterface {
    name: string;
    isCompleted: boolean;
}
export class ListItem implements ListItemInterface {
    name: string;
    isCompleted: boolean;

    constructor(name: string, isCompleted: boolean) {
        this.name = name;
        this.isCompleted = isCompleted;
    }

}
