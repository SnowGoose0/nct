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
import { ReactiveFormsModule } from '@angular/forms';
import { VillainAuthenticationComponent } from './villain-authentication/villain-authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { VillainInfoComponent } from './villain-info/villain-info.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VillainComponent,
    VillainTableComponent,
    StatusPipe,
    MapComponent,
    VillainFormComponent,
    VillainAuthenticationComponent,
    VillainInfoComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
