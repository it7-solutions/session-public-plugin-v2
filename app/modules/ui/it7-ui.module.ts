import {NgModule}      from '@angular/core';
import {It7IuSelectComponent} from './components/it7-ui-select.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [It7IuSelectComponent],
    exports: [It7IuSelectComponent]
})
export class It7UiModule {

}
