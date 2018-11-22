import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  API_URL = 'http://localhost:3001'

  constructor(
    private http: HttpClient,
  ) {}

  async performGet (url, params = {}): Promise<any> {
    return this.http.get(`${this.API_URL}${url}`, params).toPromise()
  }

  async performPost (url, params = {}): Promise<any> {  
    return this.http.post(`${this.API_URL}${url}`, params).toPromise()
  }

  async performPut (url, params = {}) {
    return this.http.put(`${this.API_URL}${url}`, params).toPromise()
  }

}
