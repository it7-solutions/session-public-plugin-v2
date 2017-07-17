import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PluginConfig} from '../services/plugin.config';

interface Day {
    key: string;
    label: string;
}

@Component({
    selector: 'day-switch',
    templateUrl: PluginConfig.buildTemplateUrl('templates/day-switch.html')
})
export class DaySwitchComponent implements OnInit {
    @Input() public days: Array<Day>;
    @Input() public day: string;
    @Output() public onChange = new EventEmitter<string>();
    public indexedDays: any = {};

    public ngOnInit() {
        this.initIndexedDays();
    }

    public toPrevDay() {
        if (this.indexedDays[this.day] && this.indexedDays[this.day].prev) {
            this.changeDay(this.indexedDays[this.day].prev.key);
        }
    }

    public toNextDay() {
        if (this.indexedDays[this.day] && this.indexedDays[this.day].next) {
            this.changeDay(this.indexedDays[this.day].next.key);
        }
    }

    private changeDay(day: string) {
        this.onChange.emit(day);
    }

    /**
     * Создает индексы для дней со ссылками на следующий/предудущий дни
     */
    private initIndexedDays() {
        let prev: any = undefined;
        this.days.forEach(
            (d) => {
                if (prev) {
                    prev.next = d;
                }
                prev = this.indexedDays[d.key] = {
                    original: d,
                    prev: prev && prev.original,
                    next: undefined,
                };
            }
        );
    }
}
