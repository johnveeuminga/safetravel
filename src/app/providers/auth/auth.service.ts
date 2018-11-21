import { Injectable } from '@angular/core';
import { ApiProviderService } from '../api/api-provider.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any

  clientId = 1
  clientSecret = 'VxHRVv9gnG04ZlFdxiPGK3xuIE8ZnPi7jqhHZVPx'

  constructor(
    private api: ApiProviderService
  ) { }

  async getToken (username, password) {
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'password',
      username,
      password,
    }

    try {
      const resp = await this.api.performPost('/oauth/token', params);

      if(resp.error) {
        return resp
      }

      const user = await this.fetchUserDetails(resp.access_token, resp.refresh_token)

      return user

    } catch(err) {
      console.log(err)

      return err
    }
  }

  async fetchUserDetails (accessToken, refreshToken = null ) {
    try {
      const user = await this.api.performGet('/api/user', {
        headers: {'Authorization': `Bearer ${accessToken}`}
      })

      if(!user.error) {
        this.user = {
          ...user,
          accessToken,
          refreshToken
        }
      }

      return user
    } catch(err) {
      console.log(err)

      return err
    }
  }
}
