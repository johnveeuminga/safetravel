import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoadingController } from '@ionic/angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccidentReportingService } from '../providers/accident-reporting/accident-reporting.service'
import { LocationProviderService } from '../providers/location/location-provider.service' 

@Component({
  selector: 'app-steptwo',
  templateUrl: './steptwo.page.html',
  styleUrls: ['./steptwo.page.scss'],
})
export class SteptwoPage implements OnInit {

  loading: any
  LOCATION_TYPE_USER_LOC = 'userLocation'
  LOCATION_TYPE_CUSTOM = 'customLocation'

  form: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationProviderService,
    private accidentReporting: AccidentReportingService,
    private loadingCtrl: LoadingController
  ) { 
    this.form = this.formBuilder.group({
      location: [this.LOCATION_TYPE_USER_LOC, Validators.required]
    })
  }

  ngOnInit() {
  }

  goToNextPage () {
    if(this._getLocationType() === 'customLocation') {
      this.router.navigateByUrl('/chooselocation')
      return
    }

    this.router.navigateByUrl('/stepthree')
    
  }

  async processForm () {
    if(this._getLocationType() === 'userLocation') {
      this.showLoading()

      try {
        const {lat,lng} = await this.locationService.getUserPosition()
        this.accidentReporting.addFields({lat, lng})
      } catch( err ) {
        console.log(err)
      }

      if(this.loading) {
        this.loading.dismiss()
      }
    }

    this.goToNextPage()
  }

  private _getLocationType () {
    const { location } = this.form.value
    
    return location
  }

  private async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Please wait. We're fetching your location."
    })

    this.loading.present()
  }

}
