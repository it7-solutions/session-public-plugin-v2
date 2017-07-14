import {Component, Output} from '@angular/core';
import {PluginConfig} from '../services/plugin.config';
import {ListOf} from '../models/list-of';
import {FilterListOf} from '../models/filter-list-of';
import {SortListOf} from '../models/sort-list-of';
import {AgendaSessionsService} from '../services/agenda-sessions.service';
import {MyAgendaService} from '../services/my-agenda.service';
import {AgendaSession} from '../models/agenda-session';
import {It7ErrorService} from '../services/it7-error.service';
import {ValidationService} from '../services/validation.service';
import {DataManagerService} from '../services/data-manager.service';

@Component({
    selector: 'session-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    @Output() public sessionList: ListOf;
    @Output() public myAgenda: MyAgendaService;
    @Output() public filters: FilterListOf;
    @Output() public sortings: SortListOf;
    @Output() public validationState: any;

    constructor(
        public config: PluginConfig,
        private err: It7ErrorService,
        private agendaSessions: AgendaSessionsService,
        myAgenda: MyAgendaService,
        validation: ValidationService,
        private dm: DataManagerService
    ) {
        validation.setMyAgenda(myAgenda);
        this.validationState = validation.state;
        this.myAgenda = myAgenda;

        // Init Filters from config
        this.filters = new FilterListOf();
        this.filters.add(config.filters);

        // Create List from sessions
        this.sessionList = new ListOf();

        // Create sorting
        this.sortings = new SortListOf(this.sessionList);
        this.sortings.add(config.sortings);
    }

    // -- Angular events

    public ngOnInit() {
        this.agendaSessions.onUpdate.subscribe(sessions => this.onSessionsUpdate(sessions));
        this.onSessionsUpdate(this.agendaSessions.sessions);
        // this.applyFilter();
        // this.sortList();

        this.dm.getSessionRequest();
    }

    // -- Component events

    public onFilterChange(event: any) {
        let select = event.target;
        let filterKey = select.getAttribute('data-key');
        let filter = this.filters.filtersByKey[filterKey];
        if (filter) {
            filter.value = select.value;
            this.applyFilter();
        } else {
            this.showError('Not found instance of class "Filter" for changed filter.');
        }
    }

    // -- Private

    private onSessionsUpdate(sessions: AgendaSession[]) {
        this.sessionList.update(sessions);
        this.applyFilter();
        this.sortList();
    }

    private applyFilter() {
        this.filters.applyToList(this.sessionList);
    }

    private sortList() {
        this.sortings.sort();
    }

    private showError(msg: string) {
        if (console && console.error) {
            console.error(msg);
        }
    }
}
