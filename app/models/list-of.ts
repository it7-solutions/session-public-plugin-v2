export class ListItem{
    original: any;
    visible: boolean = true;
    expanded: boolean;

    constructor(original: any) {
        this.original = original;
    }
}

export class ListOf {
    public items: ListItem[] = [];

    public update(items: any[]) {
        this.items.splice(0, this.items.length);
        items.forEach((item) => {
            this.items.push(new ListItem(item));
        })
    }
}