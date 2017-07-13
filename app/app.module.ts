import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {ChooseCantonModule} from './modules/choose-canton/choose-canton.module';
import {TranslationsModule} from './modules/translations/translations.module';
import {PluginComponent}  from './components/plugin.component';
import {SessionListComponent}  from './components/session-list.component';
import {MyAgendaListComponent}  from './components/my-agenda-list.component';
import {It7ErrorService} from "./services/it7-error.service";
import {It7AjaxService} from "./services/it7-ajax.service";
import {PopupService} from "./services/popup.service";
import {DataManagerService} from "./services/data-manager.service";
import {AgendaSessionsService} from "./services/agenda-sessions.service";
import {MyAgendaService} from "./services/my-agenda.service";
import {BusyPopupComponent} from "./components/busy-popup.component";
import {ValidationService} from './services/validation.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChooseCantonModule,
        TranslationsModule
    ],
    declarations: [
        PluginComponent,
        SessionListComponent,
        MyAgendaListComponent,
        BusyPopupComponent
    ],
    bootstrap: [PluginComponent],
    providers: [
        PopupService,
        DataManagerService,
        It7ErrorService,
        It7AjaxService,
        AgendaSessionsService,
        MyAgendaService,
        ValidationService
    ]
})
export class AppModule {
}
