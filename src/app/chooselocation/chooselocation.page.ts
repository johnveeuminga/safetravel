import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController } from '@ionic/angular'

import {
  Platform,
} from '@ionic/angular'

import { Router } from '@angular/router'

import { LocationProviderService } from '../providers/location/location-provider.service' 
import { AccidentReportingService } from '../providers/accident-reporting/accident-reporting.service'


// Google Map
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
} from '@ionic-native/google-maps'

import { mapStyle } from '../mapStyles'


@Component({
  selector: 'app-chooselocation',
  templateUrl: './chooselocation.page.html',
  styleUrls: ['./chooselocation.page.scss'],
})
export class ChooselocationPage implements OnInit {

  map: GoogleMap
  userMarker: Marker
  loadingMessage: any
  userPosition: {
    lat: '',
    lng: '',
  }

  constructor(
    private platform: Platform,
    private location: LocationProviderService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private zone: NgZone,
    private accidentReporting: AccidentReportingService
  ) { }

  async ngOnInit() {
    await this.platform.ready()
    await this.showLoading('Preparing map...')
    this.userPosition = this.location.userPosition
    await this.loadMap()
  }

  async loadMap() {

    const {lat, lng} = this.location.userPosition

    this.map = GoogleMaps.create('location_map', {
      camera: {
        target: {
          lat: lat ? lat: 16.41666,
          lng: lng ? lng : 120.5999976,
        },
        zoom: 17,
        tilt: 30
      },
      styles: mapStyle
    })

    // add a marker
    this.userMarker = this.map.addMarkerSync({
      title: 'Press and drag me or press anywhere on the map to select a location!',
      position: {
        lat: lat ? lat: 16.41666,
        lng: lng ? lng : 120.5999976,
      },
      draggable: true,
    });

    // show the infoWindow
    this.userMarker.showInfoWindow()


    if(this.loadingMessage) {
      this.loadingMessage.dismiss()
    }

    this.userMarker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((params) => { console.log(params);this.updateUserLocation(params[0]) })
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params) => this.updateUserLocation(params[0]))

  }

  goToStepThree() {
    const { lat, lng } = this.userPosition
    this.accidentReporting.addFields({lat, lng})
    this.router.navigateByUrl('stepthree')
  }

  async showLoading(message) {
    this.loadingMessage = await this.loadingCtrl.create({
      message
    }) 
    this.loadingMessage.present()
  }

  updateUserLocation (latLng) {
    this.userMarker.setPosition(latLng)
    this.zone.run(() => {
      this.userPosition = latLng
    })
  }

}
