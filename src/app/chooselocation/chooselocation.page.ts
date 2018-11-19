import { Component, OnInit } from '@angular/core';

import {
  Platform,
} from '@ionic/angular'

import { Router } from '@angular/router'

import { LocationProviderService } from '../providers/location/location-provider.service' 


// Google Map
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation
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


  constructor(
    private platform: Platform,
    private location: LocationProviderService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.platform.ready()
    console.log('device ready')
    await this.location.getInitialPosition()
    await this.loadMap()
  }

  async loadMap() {

    const {lat, lng} = this.location.userPosition

    this.map = GoogleMaps.create('map', {
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
      title: 'Press anywhere on the map to select a location!',
      position: {
        lat: lat ? lat: 16.41666,
        lng: lng ? lng : 120.5999976,
      },
      animation: GoogleMapsAnimation.BOUNCE
    });

    // show the infoWindow
    this.userMarker.showInfoWindow()
  }

  goToStepThree() {
    this.router.navigateByUrl('stepthree')
  }

}
