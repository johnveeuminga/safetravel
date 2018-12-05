import { Injectable } from '@angular/core';
import { ApiProviderService } from '../api/api-provider.service'
import { AuthService } from '../auth/auth.service' 

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  selectedAccident: any
  accidents: Array<any> = []
  accidentProneAreas: Array<any> = []
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

  async getAccidentPrones (): Promise<Array<any>> {
    return new Promise <Array<any>>((resolve) => {
      if(!this.accidents) resolve()

      let group = []
      this.accidents.forEach(accident => {
        const place = `${accident.street}, ${accident.city}, ${accident.state}, ${accident.region}`
        const groupData = group.find(el => el.place === place)
        if(groupData) {
          groupData.numOfAccidents = groupData.numOfAccidents + 1
        } else {
          group.push({
            place,
            numOfAccidents: 1,
          })
        }
      })


      this.accidentProneAreas = group.filter( el => el.numOfAccidents > 5 )

      resolve(this.accidentProneAreas)
    })
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
