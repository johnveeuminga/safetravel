import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';

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
  ) { }

  ngOnInit() {
  }

  async chooseImage() {
    await this.showLoader("Processing images.")
    await this.imagePicker.getPictures({}).then( async (results) => {
      await results.forEach(async (image) => {
        let b64 = await this.accidentReporting.processImageUrl(image)
        this.images.push({
          uri: b64
        })
      })
    }, (err) => {
      console.log(err)
    })
    this.hideLoader()
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

    this.accidentReporting.submit()

    this.hideLoader()

    this.goToThankYouPage()

  }

  async showLoader(message = '') {
    this.loading = await this.loadingCtrl.create({
      message
    })
    this.loading.present()
  }
  
  async hideLoader() {
    if(this.loading) {
      await this.loading.dismiss()
    }
  }

}
