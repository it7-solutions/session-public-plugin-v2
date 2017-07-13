import {ListOf, ListItem} from './list-of';

interface FilterValue {
    label: string
    key: string
}

interface FiltersByKey {
    [index: string]: Filter;
}


export class Filter {
    key: string = '';
    fieldName: string = '';
    values: FilterValue[] = [];
    value: string = '';
    label: string = '';

    constructor(filter: Filter) {
        Object.assign(this, filter);
    }
}


export class FilterListOf {
    public filters: Filter[] = [];
    public filtersByKey: FiltersByKey;

    private activeFilters: Filter[] = [];

    public add(filters: Filter[]) {
        filters.forEach((filter) => {
            this.filters.push(new Filter(filter))
        });
        this.indexFilters();
    }

    public applyToList(list: ListOf) {
        this.buildActiveFiltersList();
        list.items.map((item: ListItem)=> {
            item.visible = this.isListItemVisible(item)
        })
    }

    private buildActiveFiltersList(){
        this.activeFilters = this.filters.filter((filter: Filter)=> {
            return !!filter.value
        })
    }

    private isListItemVisible(item: ListItem): boolean {
        var notPassed = this.activeFilters.filter((filter: Filter)=> {
            let value = item.original[filter.fieldName];
            return ('string' === typeof value ? value.toLowerCase() : value) !== filter.value
        });
        return !notPassed.length
    }

    private indexFilters() {
        this.filtersByKey = {};
        this.filters.forEach((filter) => {
            this.filtersByKey[filter.key] = filter;
        });
    }
}