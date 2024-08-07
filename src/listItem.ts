export class ListItem {
    name: string;
    index: number;
    isCompleted: boolean;

    constructor(name: string, index: number, isCompleted: boolean) {
        this.name = name;
        this.index = index;
        this.isCompleted = isCompleted;
    }

}
