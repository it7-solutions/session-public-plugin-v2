import {Component, Input} from '@angular/core';
import {PluginConfig} from '../services/plugin.config';
import {DataManagerService} from '../services/data-manager.service';
import {ListItem, ListOf} from '../models/list-of';

/**
 * Список сессий в агенде выводимый без учета фильтров списка сессий.
 * Т.е. по людски.
 */
@Component({
    selector: 'my-agenda-connected-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/my-agenda-connected-list.html')
})
export class MyAgendaConnectedListComponent {
    @Input() public sessionList: ListOf;

    constructor(private dm: DataManagerService) {
    }

    // Component events
    public onExpandClick(item: ListItem) {
        item.expanded = !item.expanded;
    }

    public onRemoveClick(item: ListItem) {
        this.dm.removeFromMyAgendaRequest(item.original);
    }
}
