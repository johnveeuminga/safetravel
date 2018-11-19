import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'

import { IonicModule } from '@ionic/angular';

import { StepthreePage } from './stepthree.page';

const routes: Routes = [
  {
    path: '',
    component: StepthreePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StepthreePage]
})
export class StepthreePageModule {}
