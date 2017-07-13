import {Component, HostListener, Input} from '@angular/core';
import {PluginConfig} from "../../../services/plugin.config";

@Component({
    selector: '[myCanton]',
    templateUrl: PluginConfig.buildTemplateUrl('modules/choose-canton/templates/canton.html')
})
export class CantonComponent {
    @Input() canton: any;
    @Input() fillColor: string = "#73BF44";
}
