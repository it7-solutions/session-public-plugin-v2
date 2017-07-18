import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from './it7-error.service';
import {It7AjaxService} from './it7-ajax.service';
import {PopupService} from './popup.service';
import {BusyPopup} from '../components/busy-popup.component';
import {AgendaSessionsService} from './agenda-sessions.service';
import {MyAgendaService} from './my-agenda.service';
import {AgendaSession} from '../models/agenda-session';


@Injectable()
export class DataManagerService {
    private popup: BusyPopup;

    constructor(private config: PluginConfig,
                private err: It7ErrorService,
                private it7Ajax: It7AjaxService,
                private popupService: PopupService,
                private agendaSessions: AgendaSessionsService,
                private myAgenda: MyAgendaService) {
        // Init Sessions from config
        // this.agendaSessions.update(this.config.sessions);

        // Create MyAgenda from sessions
        // this.myAgenda.updateFromSessions(this.agendaSessions.sessions);
    }


    getSessionRequest() {
        this.showLoading();
        let data = JSON.stringify({});
        this.it7Ajax
            .post(this.config.getSessionsUrl, {data})
            .then(
                res => {
                    this.hideLoading();
                    this.checkAndUpdateList(res);
                    return res;
                }
            );
    }

    addToMyAgendaRequest(session: AgendaSession) {
        this.showLoading();
        let data = JSON.stringify(session);
        this.it7Ajax
            .post(session.addToMyAgendaUrl, {data})
            .then(
                res => {
                    this.hideLoading();
                    this.checkAndUpdateList(res);
                    return res;
                }
            );
    }

    addToWaitingListRequest(session: AgendaSession) {
        this.showLoading();
        let data = JSON.stringify(session);
        this.it7Ajax
            .post(session.addToWaitingListUrl, {data})
            .then(
                res => {
                    this.hideLoading();
                    this.checkAndUpdateList(res);
                    return res;
                }
            );
    }

    removeFromMyAgendaRequest(session: AgendaSession) {
        this.showLoading();
        let data = JSON.stringify(session);
        this.it7Ajax
            .post(session.removeFromMyAgendaUrl, {data})
            .then(
                res => {
                    this.hideLoading();
                    this.checkAndUpdateList(res);
                    return res;
                }
            );
    }

    // -- Private

    private checkAndUpdateList(res: any) {
        if (res && 'string' === typeof res.status && 'ok' !== res.status.toLowerCase()) {
            if (res.message) {
                this.err.fire(res.message);
            } else {
                this.err.fire('Request to the server was not satisfied. Status ' + res.status);
            }
        }
        console.log('res', res);
        if (res && res.sessions && Array.isArray(res.sessions)) {
            this.agendaSessions.update(res.sessions as any);
            this.myAgenda.updateFromSessions(this.agendaSessions.sessions);
        } else {
            this.err.fire('Parse error: Incompatible session list format.');
        }
    }

    private showLoading() {
        this.popup = new BusyPopup();
        this.popupService.showPopup(this.popup);
    }

    private hideLoading(): any {
        if (this.popup) {
            this.popup.visible = false;
            this.popupService.showPopup(this.popup);
            this.popup = undefined;
        }
    }
}

