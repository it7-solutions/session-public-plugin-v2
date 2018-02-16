import {ListOf} from './list-of';

export class Day {
    date: string;
    name: string;
    sessionList: ListOf = new ListOf();

    visible: boolean;
    first: boolean;


    constructor(date: string, name: string) {
        this.date = date;
        this.name = name;
    }
}