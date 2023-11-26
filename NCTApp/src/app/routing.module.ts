import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VillainFormComponent } from './villain-form/villain-form.component';
import { VillainTableComponent } from './villain-table/villain-table.component';
import { VillainEditFormComponent } from './villain-edit-form/villain-edit-form.component';
import { VillainInfoComponent } from './villain-info/villain-info.component';

const appRoutes: Routes = [
  { path: '', component: VillainTableComponent },
  { path: 'add', component: VillainFormComponent },
  { path: 'info/:id', component: VillainInfoComponent},
  { path: 'edit/:id', component:  VillainEditFormComponent}
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
