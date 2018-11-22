import { Injectable } from '@angular/core';
import { ApiProviderService } from '../api/api-provider.service'
import { AuthService } from '../auth/auth.service' 

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  selectedAccident: any
  accidents: Array<any> = []
  headers: any = null

  constructor(
    private api: ApiProviderService,
    private auth: AuthService
  ) { }


  async fetchAccidents (): Promise<Array<any>> {
    try {
      
      const accidents = await this.api.performGet('/api/accidents')
      this.accidents = accidents.data

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
