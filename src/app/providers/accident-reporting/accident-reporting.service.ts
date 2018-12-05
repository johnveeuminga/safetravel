import { Injectable } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx'
import { AuthService } from '../auth/auth.service'
import { ApiProviderService } from '../api/api-provider.service'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx'
import { SERVER_URL } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccidentReportingService {

  fields: any
  images: any

  constructor(
    private base64: Base64,
    private api: ApiProviderService,
    private auth: AuthService,
    private fileTransfer: FileTransfer
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
      user_id: this.auth.user.id,
      status: 1,
    }

    this.images = this.fields.images

    delete payload.images
    delete this.fields.images

    console.log(this.images)

    const results = await this.api.performPost('/api/accident', payload)

    let res = results 
    if(this.images.length > 0) {
      this.images.forEach(async image => {
        res = await this.uploadImages(results.data.id, image)
      })
    }

    return res
  }

  async processImageUrl (url) {
    const b64file = await this.base64.encodeFile(url)
    return b64file
  }

  async uploadImages (id, image) {
    const options = {
      fileKey: 'accident_photo',
      fileName: Math.random().toString(16).substr(2, 5),
      headers: {
        Authorization: `Bearer ${this.auth.user.accessToken}`,
        Accept: 'application/json'
      }
    }

    const fileTransfer: FileTransferObject = this.fileTransfer.create()

    const result = await fileTransfer.upload(image, `${SERVER_URL}/api/accident/${id}/photos`, options)
    
    return result
  }
}
