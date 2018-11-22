import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SERVER_URL } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  constructor(
    private http: HttpClient,
  ) {}

  async performGet (url, params = {}): Promise<any> {
    return this.http.get(`${SERVER_URL}${url}`, params).toPromise()
  }

  async performPost (url, params = {}): Promise<any> {  
    return this.http.post(`${SERVER_URL}${url}`, params).toPromise()
  }

  async performPut (url, params = {}) {
    return this.http.put(`${SERVER_URL}${url}`, params).toPromise()
  }

}
