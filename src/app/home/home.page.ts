import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController } from '@ionic/angular'
import {
  Platform,
} from '@ionic/angular';

import { Router } from '@angular/router';

// Google Map
import {
  GoogleMaps,
  GoogleMap,
  MyLocation,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

// Location Service
import { LocationProviderService } from '../providers/location/location-provider.service' 
import { GeofenceService } from '../providers/geofence/geofence.service' 

// MapStyles
import { mapStyle } from '../mapStyles'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  map: GoogleMap
  userMarker: Marker
  loading: any
  accidents =  []
  selectedMarker = null

  constructor(
    private platform: Platform,
    private location: LocationProviderService,
    private geofence: GeofenceService,
    private zone: NgZone,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.platform.ready()
    await this.presentLoading()
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

    if(this.loading) {
      this.loading.dismiss()
    }

    // add a marker
    this.userMarker = this.map.addMarkerSync({
      title: 'You are here!',
      position: {
        lat: lat ? lat: 16.41666,
        lng: lng ? lng : 120.5999976,
      },
      icon: 'https://cdn.mapmarker.io/api/v1/fa?size=45&icon=&color=%23009CE0&',
      animation: GoogleMapsAnimation.BOUNCE
    });

    // show the infoWindow
    this.userMarker.showInfoWindow()

    this.location.startTracking()

    this.addMarkers()
  }

  addMarkers() {
    if(this.geofence.locations) {
      this.geofence.locations.map(async ({lat, lng, status, title}) => {
        if(!status) return false
        this.map.addMarker({
          title,
          position: {
            lat,
            lng
          },
          // icon:'https://cdn.mapmarker.io/api/v1/fa?size=45&icon=&color=%239F0500&',
        }).then((marker: Marker) => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => 
          this.zone.run(() => {
            this.accidents.push(marker)
            this.onMarkerClick(marker)
          }));
        })
        this.map.addCircle({
          'center': {lat, lng},
          'radius': 500,
          'strokeColor' : '#AA00FF',
          'strokeWidth': 5,
          'fillColor' : '#880000'
        })
      })
    }

    return false;
  }

  toggleSelected (val:any) {
    this.selectedMarker = val
  }

  onMarkerClick (marker: Marker) {
    this.toggleSelected(marker)
  }

  goToWarning() {
    this.router.navigateByUrl('/warning')
  }

  async presentLoading () {
    this.loading = await this.loadingCtrl.create({
      message: "Please wait. We're setting up data." 
    })

    this.loading.present()
  }
}
