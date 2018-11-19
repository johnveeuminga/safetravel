import { Injectable, NgZone } from '@angular/core'
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx'
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx'
import 'rxjs/add/operator/filter'

@Injectable({
  providedIn: 'root'
})

export class LocationProviderService {

  userPosition = {
    lat: null,
    lng: null,
  }

  watch: any

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private zone: NgZone,
  ) {}

  /**
   * Gets the user's initial position
   */
  async getInitialPosition() {
    try {
      let resp = await this.getUserPosition()
      this.userPosition.lat = resp.coords.latitude
      this.userPosition.lng = resp.coords.longitude

    } catch( err ) {
      console.log(err)
    }
  }

  async getUserPosition(): Promise<any>{
    try {
      let resp = await this.geolocation.getCurrentPosition({ timeout: 10000 })
      this.userPosition.lat = resp.coords.latitude
      this.userPosition.lng = resp.coords.longitude
      return this.userPosition
    } catch( err ) {
      console.log(err)
    }

    return false
  }

  /**
   * Tracks location in the background and foreground
   */
  startTracking( cb = null ) {
    // Background tracking
    console.log('Tracker Started')
    this.backgroundGeolocation.configure(bgConfig).subscribe((location) => {
      this.zone.run(() => {
        this.userPosition.lat = location.latitude;
        this.userPosition.lng = location.longitude;

        console.log(cb)

        if(typeof cb === 'function') {
          console.log(true)
          cb()
        }
      })
      
    }, err => {
      console.log(err)
    })

    this.backgroundGeolocation.start()

    // Foreground tracking
    this.watch = this.geolocation.watchPosition(fgConfig).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.userPosition.lat = position.coords.latitude;
        this.userPosition.lng = position.coords.longitude;

        if(typeof cb === 'function') {
          cb()
        }
      });
    });
  }

  /**
   * Ends tracking
   */
  stopTracking() {
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}

const bgConfig = {
  desiredAccuracy: 0,
  stationaryRadius: 20,
  distanceFilter: 10,
  debug: true,
  interval: 2000
}

const fgConfig = {
  frequency: 3000,
  enableHighAccuracy: true
}