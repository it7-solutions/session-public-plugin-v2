import {ChangeDetectorRef, Component, Output} from '@angular/core';
import {PluginConfig} from '../services/plugin.config';
import {ListItem, ListOf} from '../models/list-of';
import {Filter, FilterListOf} from '../models/filter-list-of';
import {SortListOf} from '../models/sort-list-of';
import {AgendaSessionsService} from '../services/agenda-sessions.service';
import {MyAgendaService} from '../services/my-agenda.service';
import {AgendaSession} from '../models/agenda-session';
import {It7ErrorService} from '../services/it7-error.service';
import {ValidationService} from '../services/validation.service';
import {DataManagerService} from '../services/data-manager.service';
import {Day} from '../models/day';

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

    /**
     * Массив дней для вывода в режиме "Все дни на одной странице"
     *
     * @type {any[]}
     */
    public days: Day[] = [];

    constructor(private ref: ChangeDetectorRef,
                public config: PluginConfig,
                private err: It7ErrorService,
                private agendaSessions: AgendaSessionsService,
                myAgenda: MyAgendaService,
                validation: ValidationService,
                protected dm: DataManagerService
    ) {
        validation.setMyAgenda(myAgenda);
        this.validationState = validation.state;
        this.myAgenda = myAgenda;

        this.initFilters();

        // Create List from sessions
        this.sessionList = new ListOf();

        // Create sorting
        this.sortings = new SortListOf(this.sessionList);
        this.sortings.add(config.sortings);

        this.buildDaysAndSessions();
        console.log('days', this.days);
        console.log('days json', JSON.stringify(this.days));
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

    public onRemoveFromWaitingListClick(item: ListItem) {
        this.dm.removeFromWaitingListRequest(item.original);
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
            this.applyFilterToLists();
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
        this.updateListsOfSessions(sessions);
        this.applyFilterToLists();
        this.sortList();
    }

    /**
     * Применяет фильтры к спискам сессий (основному и по дням)
     * Обновляет флаги visible и first для дней (в режиме "все дни на одной странице")
     */
    private applyFilterToLists() {
        // Применяет фильтр к основному списку сессий
        this.filters.applyToList(this.sessionList);

        let lookingForFirst = true;
        this.days.forEach(d => {
            // Применяет фильтр к списку сессий дня
            this.filters.applyToList(d.sessionList);

            // Обновляет флаг visible у дня
            d.visible = !!d.sessionList.items.find(i => i.visible);

            // Обновляет флаг first у дня
            if(d.visible && lookingForFirst) {
                d.first = true;
                lookingForFirst = false;
            } else {
                d.first = false;
            }
        });

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

    /**
     * Инициализирует фильтры для списка сессий
     *
     * Если установлен флаг "все дни на одной странице" фильтр по дням игнорируется
     */
    private initFilters() {
        // Выбирает фильтры
        let filters: Filter[];
        if(this.config.showAllDaysAtOnce){
            filters = this.config.filters.filter(f => 'day' !== f.fieldName);
        } else {
            filters = this.config.filters;
        }

        // Инициализирует выбранные филтры
        this.filters = new FilterListOf();
        this.filters.add(filters);
    }

    /**
     * Строит массив Обьектов Day для отображения в режиме "Все дни на одной странице"
     *
     * - ищет ф фильтрах фильтр по полю "date"
     * - берет только НЕ пустые значения
     * - создает из них обьект и заполняет массив
     */
    private buildDaysAndSessions() {
        if(this.config.showAllDaysAtOnce) {
            let daysFilter = this.config.filters.find(f => 'day' === f.fieldName);
            if(daysFilter) {
                this.days = daysFilter.values
                    .filter(v => v.key)
                    .map(v => {
                        return new Day(v.key, v.label);
                    });
            }
        }
    }

    /**
     * Обновляет основной список сессий
     * и списки сессий по дням (для режима "все дни на одной странице")
     *
     * @param {AgendaSession[]} sessions
     */
    private updateListsOfSessions(sessions: AgendaSession[]) {
        this.sessionList.update(sessions);

        this.days.forEach(d => {
            d.sessionList.update(sessions.filter(s => s.day === d.day))
        });
    }
}
