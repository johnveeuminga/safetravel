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
  ) { 
    if(this.auth.user.accessToken) {
      this.headers = {
        'Authorization': `Bearer ${this.auth.user.accessToken}`
      }
    }
  }


  async fetchAccidents (): Promise<Array<any>> {
    try {
      
      const accidents = await this.api.performGet('/api/accidents', { headers: this.headers })
      this.accidents = accidents.data

      console.log(this.accidents)

      return this.accidents
    } catch(err) {
      console.log(err)
    }
  }

  async fetchAccident (id) {
    try {
      this.selectedAccident = await this.api.performGet(`/accidents/${id}`, this.headers)
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
