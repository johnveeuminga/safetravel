import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController, Events } from '@ionic/angular'
import { Moment } from 'moment'
import {
  Platform,
} from '@ionic/angular';


import { Router } from '@angular/router';

// Google Map
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

// Services
import { LocationProviderService } from '../providers/location/location-provider.service' 
import { AuthService } from '../providers/auth/auth.service'
import { AccidentService } from '../providers/accident/accident.service'

// MapStyles
import { mapStyle } from '../mapStyles'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap
  userMarker: Marker
  loading: any
  accidents =  []
  selectedMarker = null
  user = null

  constructor(
    private platform: Platform,
    private location: LocationProviderService,
    private accidentService: AccidentService,
    private zone: NgZone,
    private router: Router,
    private loadingCtrl: LoadingController,
    private events: Events,
    private auth: AuthService
  ) {
  }

  async ngOnInit() {
    await this.platform.ready()
    await this.presentLoading()
    await this.accidentService.fetchAccidents()
    await this.location.getInitialPosition()
    await this.loadMap()
    this.user = this.auth.user
    this.events.subscribe('user:logged-in', (user) => {
      this.user = user
    }) 

    this.events.subscribe('user:logged-out', () => {
      this.user = null
    }) 
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

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((data) => {
      this.zone.run(() => {
        this.selectedMarker = null
      })
    })

    // add a marker
    this.userMarker = this.map.addMarkerSync({
      title: 'You are here!',
      position: {
        lat: lat ? lat: 16.41666,
        lng: lng ? lng : 120.5999976,
      },
      icon: {
        url: require('../../assets/icon/car.png')
      },
    });

    // show the infoWindow
    this.userMarker.showInfoWindow()

    this.location.startTracking()
    
    this.events.subscribe('location:changed', (userPosition) => {
      this.zone.run(() => {
        this.userMarker.setPosition(userPosition)
        this.map.setCameraTarget(userPosition)
      })
    })

    this.addMarkers()

    if(this.loading) {
      this.loading.dismiss()
    }

  }

  addMarkers() {
    if(this.accidentService.accidents) {
      this.accidentService.accidents.map(async (location) => {
        if(!location.status) return false
        const { title, lat, lng, }  = location
        this.map.addMarker({
          title,
          position: {
            lat,
            lng
          },
          icon: require('../../assets/icon/caraccident.png')
        }).then((marker: Marker) => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => 
            this.zone.run(() => {
              const { id, date }  = location
              this.accidents.push({id, lat, lng, status, title, date })
              this.onMarkerClick({id, lat, lng, status, title, date})
            }));
          })
          this.map.addCircle({
            'center': {lat, lng},
            'radius': 100,
            'strokeColor' : '#88A000',
            'strokeWidth': 1,
            'fillColor' : '#880000'
          })
        })
    }

    return false;
  }

  toggleSelected (val:any) {
    this.selectedMarker = val
  }

  onMarkerClick (marker: any) {
    this.toggleSelected(marker)
  }

  goToWarning() {
    this.router.navigateByUrl('/warning')
  }

  goToDetails () {
    if(!this.selectedMarker) return

    this.router.navigateByUrl(`/accidents/${this.selectedMarker.id}`)
  }

  async presentLoading () {
    this.loading = await this.loadingCtrl.create({
      message: "Please wait. We're setting up data." 
    })

    this.loading.present()
  }

}
