import {
    Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef,
    Renderer
} from '@angular/core';

import {PopupService, BasePopup} from '../services/popup.service';
import {PluginConfig} from "../services/plugin.config";

export class BusyPopup extends BasePopup {
    visible: boolean;

    constructor(visible: boolean = true) {
        super('RequestPopup');
        this.visible = visible;
    }
}

@Component({
    selector: 'busy-popup',
    templateUrl: PluginConfig.buildTemplateUrl('/templates/busy-popup.html')
})
export class BusyPopupComponent {
    popup: BusyPopup;
    styleLeft: string;
    styleTop: string;
    overlayWidth: string;
    overlayHeight: string;
    window: any;

    constructor(private popupService: PopupService//,
                //private window: Window
    ) {
        this.window = window;
        this.popupService.popup.subscribe(popup => this.checkPopup(popup));
    }

    private checkPopup(popup: BasePopup) {
        if (popup instanceof BusyPopup) {
            if (popup.visible) {
                this.showPopup(popup as BusyPopup);
            } else {
                this.hidePopup(popup as BusyPopup);
            }
        }
    }

    private showPopup(popup: BusyPopup) {
        this.popup = popup;
        this.setOverlay();
        this.centerPopup();
    }

    private hidePopup(popup: BusyPopup) {
        this.popup = undefined;
    }

    private setOverlay() {
        this.overlayHeight = this.window.innerHeight + "px";
        this.overlayWidth = this.window.innerWidth + "px";
    }

    private centerPopup() {
        this.styleTop = (this.window.innerHeight - 100) / 2 + "px";
        this.styleLeft = (this.window.innerWidth - 100) / 2 + "px";
    }
}
