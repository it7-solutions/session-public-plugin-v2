import {Injectable} from '@angular/core';
import {Filter} from '../models/filter-list-of';
import {Sorting} from '../models/sort-list-of';

@Injectable()
export class PluginConfig {
    ersNg2Helper: any;

    addToMyAgendaUrl: string = '';
    getSessionsUrl: string = '';
    removeFromMyAgendaUrl: string = '';
    downloadAllCalendarsUrl: string = '';
    downloadMyProgrammeUrl: string = '';

    minSessionsInMyAgenda: number = 0;

    allowNextStep: () => void;
    disallowNextStep: () => void;

    filters: Filter[] = [];
    sortings: Sorting[] = [];


    translations: any[] = [];
    onTranslate: any;

    static buildTemplateUrl(path: string) {
        let base = (window && window['__it7_session_public_plugin_v2__']) ? window['__it7_session_public_plugin_v2__'] : 'app';
        return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
    }
    constructor(options: any) {
        Object.assign(this, options);
    }

}
