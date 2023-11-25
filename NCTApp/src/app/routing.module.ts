import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VillainFormComponent } from './villain-form/villain-form.component';
import { VillainTableComponent } from './villain-table/villain-table.component';

const appRoutes: Routes = [
  { path: '', component: VillainTableComponent },
  { path: 'add', component: VillainFormComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
