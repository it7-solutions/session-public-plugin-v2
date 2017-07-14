import {Injectable} from '@angular/core';

import {PluginConfig} from './plugin.config';
import {MyAgendaService} from './my-agenda.service';

@Injectable()
export class ValidationService {
    public state: any = {
        notEnoughSessionsInMyAgenda: true
    };

    private myAgenda: MyAgendaService;


    constructor(private config: PluginConfig) {
    }

    public setMyAgenda(myAgenda: MyAgendaService) {
        this.myAgenda = myAgenda;
    }

    public validate() {
        this.checkMinMyAgendaSessions();
    }

    /**
     * Check sessions column in MyAgenda and set Next Step button status
     */
    private checkMinMyAgendaSessions() {
        this.state.notEnoughSessionsInMyAgenda = this.myAgenda.sessions.length < this.config.minSessionsInMyAgenda;
        if (this.state.notEnoughSessionsInMyAgenda) {
            this.disallowNextStep();
        } else {
            this.allowNextStep();
        }
    }

    private allowNextStep() {
        if ('function' === typeof this.config.allowNextStep) {
            this.config.allowNextStep();
        }
    }

    private disallowNextStep() {
        if ('function' === typeof this.config.disallowNextStep) {
            this.config.disallowNextStep();
        }
    }
}
