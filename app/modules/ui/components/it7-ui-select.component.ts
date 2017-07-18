import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

import {PluginConfig} from '../../../services/plugin.config';

@Component({
    selector: 'it7-ui-select',
    templateUrl: PluginConfig.buildTemplateUrl('modules/ui/templates/it7-ui-select.html')
})
export class It7IuSelectComponent implements AfterViewInit, OnDestroy {
    public _choices: any[] = [];
    public _model: string = '';
    private stylized = false;

    @Input() set choices(choices: any[]) {
        this._choices = choices;
        this.callUpdateStyle();
    }

    @Input() set model(model: string) {
        this._model = model;
        this.callUpdateStyle();
    }

    @Output() modelChange = new EventEmitter<string>();

    // Реализация OnInit
    ngAfterViewInit() {
        this.callCreateStyle();
    }

    // Реализация OnDestroy
    ngOnDestroy() {
        this.callDestroyStyle();
    }

    onSelectChange(event: any) {
        this._model = event.target.value;
        this.modelChange.emit(this._model);
    }

    private callCreateStyle() {
        console.log('callCreateStyle', (<any>document.getElementById('test')).value);
        this.stylized = true;
    }

    private callUpdateStyle() {
        if (this.stylized) {
            console.log('callUpdateStyle', (<any>document.getElementById('test')).value);
        }
    }

    private callDestroyStyle() {
        console.log('callDestroyStylize', (<any>document.getElementById('test')).value);
    }
}
