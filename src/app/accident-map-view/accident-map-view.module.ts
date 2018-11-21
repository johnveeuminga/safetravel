import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccidentMapViewPage } from './accident-map-view.page';

const routes: Routes = [
  {
    path: '',
    component: AccidentMapViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccidentMapViewPage]
})
export class AccidentMapViewPageModule {}
