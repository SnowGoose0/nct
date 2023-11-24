import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VillainComponent } from './villain/villain.component';
import { VillainTableComponent } from './villain-table/villain-table.component';
import { ReportService } from './report.service';

@NgModule({
  declarations: [
    AppComponent,
    VillainComponent,
    VillainTableComponent
  ],
  imports: [],
  providers: [ReportService],
  bootstrap: [AppComponent],
})
export class AppModule { }
