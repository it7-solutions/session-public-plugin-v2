import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

import {PluginConfig} from '../../../services/plugin.config';

@Component({
    selector: 'it7-ui-select',
    templateUrl: PluginConfig.buildTemplateUrl('modules/ui/templates/it7-ui-select.html')
})
export class It7IuSelectComponent implements AfterViewInit, OnDestroy {
    public _choices: any[] = [];
    public _model: string = '';
    private stylized = false;

    @ViewChild('selectElement') selectElement: ElementRef;

    @Input() set choices(choices: any[]) {
        this._choices = choices;
        this.callUpdateStyle();
    }

    @Input() set model(model: string) {
        this._model = model;
        this.callUpdateStyle();
    }

    @Output() modelChange = new EventEmitter<string>();


    constructor(public config: PluginConfig) {
    }

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
        if (this.config.ersNg2Helper && this.config.ersNg2Helper.createUiStyle) {
            this.config.ersNg2Helper.createUiStyle(this.selectElement.nativeElement);
        }
        this.stylized = true;
    }

    private callUpdateStyle() {
        if (this.stylized) {
            if (this.config.ersNg2Helper && this.config.ersNg2Helper.updateUiStyle) {
                this.config.ersNg2Helper.updateUiStyle(this.selectElement.nativeElement);
            }
        }
    }

    private callDestroyStyle() {
        if (this.config.ersNg2Helper && this.config.ersNg2Helper.destroyUiStyle) {
            this.config.ersNg2Helper.destroyUiStyle(this.selectElement.nativeElement);
        }

    }
}
