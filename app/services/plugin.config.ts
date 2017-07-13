import {Injectable} from "@angular/core";
import {Filter} from "../models/filter-list-of"
import {Sorting} from "../models/sort-list-of"
import {AgendaSession} from "../models/agenda-session"

export interface PluginOptions {
    name: string
    mockAJAX: any

    minSessionsInMyAgenda?: number;

    allowNextStep?: () => void;
    disallowNextStep?: () => void;

    filters: Filter[]
    sortings: Sorting[]
    sessions: AgendaSession[]

    addToMyAgendaUrl: string
    removeFromMyAgendaUrl: string
}

@Injectable()
export class PluginConfig {
    name: string = '';
    mockAJAX: any;

    minSessionsInMyAgenda: number = 0;

    allowNextStep: () => void;
    disallowNextStep: () => void;

    filters: Filter[] = [];
    sortings: Sorting[] = [];
    sessions: AgendaSession[] = [];

    addToMyAgendaUrl: string = '';
    removeFromMyAgendaUrl: string = '';

    translations: any[] = [];
    onTranslate: any;

    constructor(options: PluginOptions) {
        Object.assign(this, options);
    }

    static buildTemplateUrl(path: string) {
        var base = (window && window['__it7_session_public_plugin__']) ? window['__it7_session_public_plugin__'] : 'app';
        return base.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');
    }
}
