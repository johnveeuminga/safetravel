import { Component, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

import { AccidentReportingService } from '../providers/accident-reporting/accident-reporting.service'

@Component({
  selector: 'app-stepthree',
  templateUrl: './stepthree.page.html',
  styleUrls: ['./stepthree.page.scss'],
})
export class StepthreePage implements OnInit {
  images: Array<any> = []
  dateTime
  loading: any

  constructor(
    private imagePicker: ImagePicker,
    private router: Router,
    private accidentReporting: AccidentReportingService,
    private loadingCtrl: LoadingController,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private zone: NgZone,
    private webview: WebView
  ) { }

  ngOnInit() {
  }

  async selectImageOption() {
    const actionsheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Take a Photo',
          icon: 'camera',
          handler: () => {
            this.takePicture()
          }
        },
        {
          text: 'Choose from gallery',
          icon: 'photos',
          handler: () => {
            this.chooseImage()
          }
        },
    ]
    })

    await actionsheet.present()
  }

  async takePicture () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    try {
      let photo = await this.camera.getPicture(options)

      this.zone.run(() => {
        this.images.push(photo)
      })

    } catch(err) {
      console.log(err)
    }

  }

  async chooseImage() {
    this.imagePicker.getPictures({}).then( async (results) => {
      await this.showLoader("Processing images.")
      this.zone.run(() => {
        this.images = [...this.images, ...results]
      })
      this.hideLoader()
    }, (err) => {
      console.log(err)
    })
  }

  goToThankYouPage() {
    this.router.navigateByUrl('thankyou')
  }

  async processForm () {
    this.accidentReporting.addFields({
      images: this.images,
      date: this.dateTime
    })

    await this.showLoader("Wrapping up your report.")

    await this.accidentReporting.submit()

    await this.hideLoader()

    this.goToThankYouPage()

  }

  async showLoader(message = '') {
    this.loading = await this.loadingCtrl.create({
      message
    })
    this.loading.present()
  }

  normalizeImage(url) {
    return this.webview.convertFileSrc(url)
  }
  
  async hideLoader() {
    if(this.loading) {
      await this.loading.dismiss()
    }
  }

  async removeImage (index) {
    this.images.splice(index, 1)
  }

}
