import {ChangeDetectorRef, Component, Output} from '@angular/core';
import {PluginConfig} from '../services/plugin.config';
import {ListItem, ListOf} from '../models/list-of';
import {FilterListOf} from '../models/filter-list-of';
import {SortListOf} from '../models/sort-list-of';
import {AgendaSessionsService} from '../services/agenda-sessions.service';
import {MyAgendaService} from '../services/my-agenda.service';
import {AgendaSession} from '../models/agenda-session';
import {It7ErrorService} from '../services/it7-error.service';
import {ValidationService} from '../services/validation.service';
import {DataManagerService} from '../services/data-manager.service';

@Component({
    selector: 'session-public-plugin-v2',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    @Output() public sessionList: ListOf;
    @Output() public myAgenda: MyAgendaService;
    @Output() public filters: FilterListOf;
    @Output() public sortings: SortListOf;
    @Output() public validationState: any;
    public myAgendaActive = false;
    public windowWidthMode = ''; // 's' | 'm'
    public warningMessage = '';

    constructor(private ref: ChangeDetectorRef,
                public config: PluginConfig,
                private err: It7ErrorService,
                private agendaSessions: AgendaSessionsService,
                myAgenda: MyAgendaService,
                validation: ValidationService,
                private dm: DataManagerService) {
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

        this.dm.getSessionRequest();
        this.initWindowModeSwitch();
    }

    public onMyAgendaClick() {
        this.myAgendaActive = !this.myAgendaActive;
    }

    public onExpandClick(item: ListItem) {
        item.expanded = !item.expanded;
    }

    public onAddClick(item: ListItem) {
        this.dm.addToMyAgendaRequest(item.original);
    }

    public onAddToWaitingListClick(item: ListItem) {
        this.dm.addToWaitingListRequest(item.original);
    }

    public onRemoveClick(item: ListItem) {
        this.dm.removeFromMyAgendaRequest(item.original);
    }

    /**
     * Применяет изменения фиильтра
     *
     * @param value
     * @param filterKey
     */
    public applyFilter(filterKey: string, value: any) {
        let filter = this.filters.filtersByKey[filterKey];
        if (filter) {
            filter.value = value;
            this.applyFilterToList();
        } else {
            this.showError('Not found instance of class "Filter" for changed filter.');
        }
    }

    /**
     * Изменяет значение фильтра дат при изменении через контрол со стрелосками
     *
     * @param date
     */
    public changeDayFilter(date: string) {
        this.applyFilter('dates', date);
    }

    // -- Private

    private updateOther() {
        // TODO нужно вынести параметры bp dm в отдельную сущность
        this.warningMessage = this.dm.warningMessage;
        this.setNextStepAvailability(!!this.dm.allowNextStep);
    }

    private onSessionsUpdate(sessions: AgendaSession[]) {
        this.updateOther();
        this.sessionList.update(sessions);
        this.applyFilterToList();
        this.sortList();
    }

    private applyFilterToList() {
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

    private initWindowModeSwitch() {
        if (this.config.ersNg2Helper) {
            this.config.ersNg2Helper.onWindowResize(() => {
                this.updateWindowMode();
            });
        }
        this.updateWindowMode();
    }

    isMoreSmall() {
        return 'm' === this.windowWidthMode;
    }

    isSmall() {
        return 's' === this.windowWidthMode;
    }

    private updateWindowMode() {
        if (this.config.ersNg2Helper) {
            this.windowWidthMode = this.config.ersNg2Helper.getWindowWidth() < this.config.widthThreshold ? 's' : 'm';
            this.ref.detectChanges();
        }
    }

    private setNextStepAvailability(state: boolean) {
        if (this.config.ersNg2Helper) {
            this.config.ersNg2Helper.setNextStepAvailability(state);
        }
    }
}
