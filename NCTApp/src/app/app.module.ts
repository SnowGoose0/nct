import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VillainComponent } from './villain/villain.component';
import { VillainTableComponent } from './villain-table/villain-table.component';
import { StatusPipe } from './status.pipe';
import { MapComponent } from './map/map.component';
import { VillainFormComponent } from './villain-form/villain-form.component';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    VillainComponent,
    VillainTableComponent,
    StatusPipe,
    MapComponent,
    VillainFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
