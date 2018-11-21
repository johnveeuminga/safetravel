import { HttpClient } from '@angular/common/http' 

import { Injectable } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx'

@Injectable({
  providedIn: 'root'
})
export class AccidentReportingService {

  API_URL = "http://localhost:3000/accidents"
  fields: any

  constructor(
    private http: HttpClient,
    private base64: Base64,
  ) { }

  addFields (fields: Object) {
    this.fields = {...this.fields, ...fields}
  }

  clearFields () {
    this.fields = {} 
  }

  async submit () {
    console.log(this.fields);

    const payload = {
      ...this.fields,
      status: 1,
    }

    let results = await this.http.post(this.API_URL, payload).toPromise()

    return results
  }

  async processImageUrl (url) {
    const b64file = await this.base64.encodeFile(url)
    return b64file
  }
}