import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module'

import { IonicModule } from '@ionic/angular';

import { AccidentDetailsPage } from './accident-details.page';

const routes: Routes = [
  {
    path: '',
    component: AccidentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
  ],
  declarations: [AccidentDetailsPage]
})
export class AccidentDetailsPageModule {}
