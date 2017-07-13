import {ListOf, ListItem} from './list-of';

export class Sorting {
    key: string = '';
    fieldName: string = '';
    descending: boolean = false;
    active: boolean = false;

    constructor(sorting: Sorting) {
        Object.assign(this, sorting);
    }
}

interface SortingsByKey {
    [index: string]: Sorting;
}

export class SortListOf {
    public list: ListOf;

    public sortingsByKey: SortingsByKey = {};

    private sortings: Sorting[] = [];
    private currentSorting: Sorting;


    constructor(list: ListOf) {
        this.list = list;
    }

    public add(sortings: Sorting[]) {
        var a:Sorting;
        sortings.forEach((sorting) => {
            var s = new Sorting(sorting);
            this.sortings.push(s);
            s.active && (a = s);
        });
        this.indexSortings();
        a && this.setActiveSorting(a.key, a.descending);
    }

    public sort() {
        this.applySorting();
    }

    public sortBy(key: string, descending: boolean) {
        this.setActiveSorting(key, descending);
        this.applySorting();
    }

    private setActiveSorting(key: string, descending: boolean) {
        if(typeof key === 'string') {
            let s = this.sortingsByKey[key];
            if(s){
                this.currentSorting && (this.currentSorting.active = false);
                this.currentSorting = s;
                this.currentSorting.descending = descending;
                this.currentSorting.active = true;
            }
        }
    }

    private applySorting(){
        if(this.currentSorting instanceof Sorting){
            var s: Sorting = this.currentSorting;
            this.list.items.sort(
                (a:ListItem, b:ListItem) => {
                    var v1 = s.descending ? b.original[s.fieldName] : a.original[s.fieldName];
                    var v2 = s.descending ? a.original[s.fieldName] : b.original[s.fieldName];
                    typeof v1 !== 'string' && (v1 = '');
                    typeof v2 !== 'string' && (v2 = '');
                    return v1.localeCompare(v2);
                }
            )
        }
    }

    private indexSortings() {
        this.sortingsByKey = {};
        this.sortings.forEach((sorting) => {
            this.sortingsByKey[sorting.key] = sorting;
        });
    }
}