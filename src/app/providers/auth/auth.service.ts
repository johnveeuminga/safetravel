import { Injectable } from '@angular/core';
import { ApiProviderService } from '../api/api-provider.service'
import { Storage } from '@ionic/storage' 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any

  USER_STORAGE_KEY = 'user'
  clientId = 1
  clientSecret = 'Du705fh5wqV0SSoIGOHKJSEECEViTJOpjdB6sXhJ'

  constructor(
    private api: ApiProviderService,
    private storage: Storage
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

        await this.storeUser()
      }

      return user
    } catch(err) {
      console.log(err)

      return err
    }
  }

  async getStoredUser () {
    const user = await this.storage.get(this.USER_STORAGE_KEY)

    if(user) {
      this.user = user
    }

    return user
  }

  async storeUser () {
    const user = await this.storage.set(this.USER_STORAGE_KEY, this.user)
    console.log(await this.storage.get(this.USER_STORAGE_KEY))

    return user
  }
}
