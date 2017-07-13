import {NgModule}      from '@angular/core';
import {ChooseCantonComponent}  from './components/choose-canton.component';
import {CantonComponent}  from './components/canton.component';
import {TranslationsModule} from '../translations/translations.module';
import {PluginConfig}  from '../../services/plugin.config';

@NgModule({
    imports: [TranslationsModule],
    declarations: [ChooseCantonComponent, CantonComponent],
    exports: [ChooseCantonComponent]
    //bootstrap: [ChooseCantonComponent]
})
export class ChooseCantonModule {

}
