import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let date = value ? value : new Date()
    console.log(value)
    return moment(date).format('dddd, MMMM DD,YYYY h:m A')
  }

}
