import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular'
import { NavigationEnd, Router, ActivatedRoute  } from '@angular/router'
import { AccidentService } from '../providers/accident/accident.service'

// Google Map
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

import {mapStyle} from '../mapStyles'


@Component({
  selector: 'app-accident-map-view',
  templateUrl: './accident-map-view.page.html',
  styleUrls: ['./accident-map-view.page.scss'],
})
export class AccidentMapViewPage implements OnInit {

  loading: any
  map: GoogleMap
  accident: any

  constructor(
    private router: Router,
    private accidentService: AccidentService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) { }

  async ngOnInit() {
    await this.platform.ready()
    await this.showLoader()
    this.route.params.subscribe( async ({id}) => {
      this.accident = await this.accidentService.getAccident(id)
      await this.prepareMap()
      await this.hideLoading()
    })
  }

  async prepareMap() {
    const {lat, lng} = this.accident
    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat,
          lng
        },
        zoom: 17,
        tilt: 30
      },
      styles: mapStyle
    })

   this.map.addMarkerSync({
      position: {
        lat,
        lng,
      },
      icon: {
        url: require('../../assets/icon/caraccident.png')
      },
    })

    this.map.addCircleSync({
      'center': {lat, lng},
      'radius': 200,
      'strokeColor' : '#88A000',
      'strokeWidth': 1,
      'fillColor' : '#880000'
    })
  }

  async showLoader () {
    this.loading = await this.loadingCtrl.create({
      message: 'Preparing Map'
    })
    this.loading.present()
  }

  async hideLoading () {
    if(this.loading) {
      await this.loading.dismiss()
    }

    return
  }

}
