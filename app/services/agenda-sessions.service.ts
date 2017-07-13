import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {AgendaSession} from '../models/agenda-session';

@Injectable()
export class AgendaSessionsService {
    public sessions: AgendaSession[] = [];
    private _onUpdate: BehaviorSubject<AgendaSession[]>;
    public onUpdate: Observable<AgendaSession[]>;

    constructor() {
        this._onUpdate = new BehaviorSubject(this.sessions);
        this.onUpdate = this._onUpdate.asObservable();
    }

    public update(src: AgendaSession[]) {
        this.sessions.splice(0, this.sessions.length);
        src.forEach((session: AgendaSession) => {
            this.sessions.push(new AgendaSession(session))
        });
        this.resetSessionsFlags();
        this._onUpdate.next(this.sessions);
    }

    private resetSessionsFlags(){
        this.sessions.forEach((session: AgendaSession) => {
            session.resetFlags();
        })
    }
}