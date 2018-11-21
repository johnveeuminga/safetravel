import { Injectable } from '@angular/core';
import { ApiProviderService } from '../api/api-provider.service'

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  selectedAccident: any
  accidents: Array<any> = []

  constructor(
    private api: ApiProviderService
  ) { 
  }


  async fetchAccidents () {
    try {
      this.accidents = await this.api.performGet('/accidents')

      return this.accidents
    } catch(err) {
      console.log(err)
    }
  }

  async fetchAccident (id) {
    try {
      this.selectedAccident = await this.api.performGet(`/accidents/${id}`)
      this.accidents.push(this.selectedAccident)

      return this.selectedAccident
    } catch(err) {
      console.log(err)
    }
  }

  async getAccident (id, setSelected = false) {
    if( this.accidents !== null ) {
      const accident = this.accidents.find( accident => accident.id == id )
      if(setSelected) this.selectedAccident = accident
      return accident
    } else {
      return await this.fetchAccident(id)
    }
  }
}
