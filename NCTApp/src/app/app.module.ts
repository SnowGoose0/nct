import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VillainComponent } from './villain/villain.component';
import { VillainTableComponent } from './villain-table/villain-table.component';

@NgModule({
  declarations: [
    AppComponent,
    VillainComponent,
    VillainTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
