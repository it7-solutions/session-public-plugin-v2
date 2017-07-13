import {Injectable} from "@angular/core";

import {AgendaSession} from '../models/agenda-session';
import {ValidationService} from './validation.service';

@Injectable()
export class MyAgendaService {
    public sessions: AgendaSession[] = [];


    constructor(
        private validation: ValidationService
    ) {
    }

    public updateFromSessions(src: AgendaSession[]) {
        this.sessions.splice(0, this.sessions.length);
        src.forEach((session: AgendaSession) => {
            if (session.isInAgenda) {
                this.sessions.push(session)
            }
        });

        this.validation.validate();
    }
}