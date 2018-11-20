import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  API_URL = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  performGet (url): Promise<any> {
    return this.http.get(`${this.API_URL}${url}`).toPromise()
  }

  performPost (url, params) {
    return this.http.post(`${this.API_URL}${url}`, params).toPromise()
  }

  performPut (url, params ) {
    return this.http.put(`${this.API_URL}${url}`, params).toPromise()
  }
}
