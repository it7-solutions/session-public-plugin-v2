import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {SortListOf} from '../models/sort-list-of';
import {AgendaSessionsService} from "../services/agenda-sessions.service";
import {MyAgendaService} from "../services/my-agenda.service";
import {AgendaSession} from "../models/agenda-session";
import {It7ErrorService} from "../services/it7-error.service";
import {ValidationService} from '../services/validation.service';

@Component({
    selector: 'session-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    @Output() public sessionList:ListOf;
    @Output() public myAgenda: MyAgendaService;
    @Output() public filters:FilterListOf;
    @Output() public sortings:SortListOf;
    @Output() public validationState:any;

    private showChooseCanton = false;

    constructor(
        config: PluginConfig,
        private err: It7ErrorService,
        private agendaSessions: AgendaSessionsService,
        myAgenda: MyAgendaService,
        validation: ValidationService
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
        this.sortings.add(config.sortings)
    }

    // -- Angular events

    public ngOnInit(){
        this.agendaSessions.onUpdate.subscribe(sessions => this.onSessionsUpdate(sessions));
        this.onSessionsUpdate(this.agendaSessions.sessions);
        this.applyFilter();
        this.sortList();
    }

    // -- Component events

    public onFilterChange(event:any) {
        var select = event.target;
        var filterKey = select.getAttribute('data-key');
        var filter = this.filters.filtersByKey[filterKey];
        if(filter) {
            filter.value = select.value;
            this.applyFilter();
        } else {
            console && console.error && console.error('Not found instance of class "Filter" for changed filter.');
        }
    }

    public onChooseCantonClick(){
        this.showChooseCanton = true;
    }

    public onCancelChooseCanton() {
        this.showChooseCanton = false;
    }

    public onChooseCanton(cantonKey:string) {
        this.showChooseCanton = false;
        this.setCantonFilterByKey(cantonKey);
        this.applyFilter();
    }

    // -- Private

    private onSessionsUpdate(sessions: AgendaSession[]){
        this.sessionList.update(sessions);
        this.applyFilter();
    }

    private applyFilter(){
        this.filters.applyToList(this.sessionList);
    }

    private sortList(){
        this.sortings.sort();
    }

    private setCantonFilterByKey(key: string) {
        var filter: Filter = this.filters.filtersByKey['cantons'];
        if (filter instanceof Filter) {
            if (filter.values.find(f => f.key === key)) {
                filter.value = key;
            } else {
                this.err.fire('Selected Canton does not exist in the filter of the cantons');
            }
        } else {
            this.err.fire('Filter cantons not found');
        }
    }
}
