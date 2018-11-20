import { NgModule } from '@angular/core';
import { MomentDatePipe } from './moment-date.pipe'

@NgModule({
	declarations: [
    MomentDatePipe
  ],
	imports: [],
	exports: [
    MomentDatePipe
  ]
})
export class PipesModule {}