import {ListOf} from './list-of';

export class Day {
    day: string;
    name: string;
    sessionList: ListOf = new ListOf();

    visible: boolean;
    first: boolean;


    constructor(date: string, name: string) {
        this.day = date;
        this.name = name;
    }
}