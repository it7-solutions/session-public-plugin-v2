import {Component, Input} from '@angular/core';

import {PluginConfig} from "../services/plugin.config";
import {ListOf, ListItem} from "../models/list-of";
import {SortListOf, Sorting} from '../models/sort-list-of';
import {DataManagerService} from "../services/data-manager.service";

@Component({
    selector: 'session-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/session-list.html')
})
export class SessionListComponent {
    @Input() public sessionList:ListOf;
    @Input() public sortings:SortListOf;

    constructor(
        private dm: DataManagerService
    ) {
    }

    // -- Component events

    public onSortClick(s:Sorting){
        this.sortings.sortBy(s.key, s.active ? !s.descending : false);
    }

    public onExpandClick(item:ListItem) {
        item.expanded = !item.expanded;
    }

    public onAddClick(item:ListItem) {
        this.dm.addToMyAgendaRequest(item.original);
    }

    public onRemoveClick(item:ListItem) {
        this.dm.removeFromMyAgendaRequest(item.original);
    }
}
