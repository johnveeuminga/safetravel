import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular'
import { ApiProviderService } from '../api/api-provider.service'
import { Storage } from '@ionic/storage' 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null

  USER_STORAGE_KEY = 'user'
  clientId = 1
  clientSecret = 'Du705fh5wqV0SSoIGOHKJSEECEViTJOpjdB6sXhJ'

  socialGrantId = 2
  socialGrantSecret = 'mmE6hkkHC07y4QGRD61KutbmYHhQGL1PiTpRMXeX'

  constructor(
    private api: ApiProviderService,
    private storage: Storage,
    private events: Events,
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

  async fetchUserDetails (accessToken, refreshToken = null, provider = false ) {
    try {
      const user = await this.api.performGet('/api/user', {
        headers: {'Authorization': `Bearer ${accessToken}`}
      })

      if(!user.error) {
        this.user = {
          ...user,
          accessToken,
          refreshToken,
          provider
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

    if(user && !this.user) {
      this.user = user
    }

    return user
  }

  async storeUser (toStore = this.user) {
    const user = await this.storage.set(this.USER_STORAGE_KEY, toStore)

    this.events.publish('user:logged-in', user)

    return user
  }

  async logoutUser () {
    await this.storage.remove(this.USER_STORAGE_KEY)
    this.user = null

    await this.events.publish('user:logged-out')
    return
  }

  async loginUsingSocial(token, provider) {
    const data = {
      client_id: this.socialGrantId,
      client_secret: this.socialGrantSecret,
      grant_type: 'social',
      provider,
      access_token: token,
    }

    const providerUser = await this.api.performPost('/oauth/token', data)

    const user =  this.fetchUserDetails(providerUser.access_token, providerUser.refresh_token, provider)

    return user
  }
}
