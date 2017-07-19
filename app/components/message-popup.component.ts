import {Component, Input} from '@angular/core';

import {PopupService, BasePopup} from '../services/popup.service';
import {PluginConfig} from '../services/plugin.config';

export class MessagePopup extends BasePopup {
    visible: boolean;
    message: string;

    constructor(message: string, visible = true) {
        super('MessagePopup');
        this.message = message;
        this.visible = visible;
    }
}

@Component({
    selector: 'message-popup',
    templateUrl: PluginConfig.buildTemplateUrl('/templates/message-popup.html')
})
export class MessagePopupComponent {
    @Input() width: number;
    @Input() height: number;
    popup: MessagePopup;
    styleLeft: string;
    styleTop: string;
    overlayWidth: string;
    overlayHeight: string;
    window: any;

    constructor(private popupService: PopupService) {
        this.window = window;
        this.popupService.popup.subscribe(popup => this.checkPopup(popup));
    }

    private checkPopup(popup: BasePopup) {
        if (popup instanceof MessagePopup) {
            if (popup.visible) {
                this.showPopup(popup as MessagePopup);
            } else {
                this.hidePopup();
            }
        }
    }

    private showPopup(popup: MessagePopup) {
        this.popup = popup;
        this.setOverlay();
        this.centerPopup();
    }

    public hidePopup() {
        this.popup = undefined;
    }

    private setOverlay() {
        this.overlayHeight = this.window.innerHeight + 'px';
        this.overlayWidth = this.window.innerWidth + 'px';
    }

    private centerPopup() {
        this.styleTop = (this.window.innerHeight - this.height) / 2 + 'px';
        this.styleLeft = (this.window.innerWidth - this.width) / 2 + 'px';
    }
}
