import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router'
import { Platform } from '@ionic/angular'
import { Geofence } from '@ionic-native/geofence/ngx'
import { HttpClient } from '@angular/common/http' 
import { AccidentService } from '../accident/accident.service'
import { LocationProviderService } from '../location/location-provider.service'

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {
  locations: any
  accidentProneAreas: any
  accidentProneAreasIds: Array<any> = []
  fences = []
  inBackground = false

  constructor(
    private geofence: Geofence,
    private http: HttpClient,
    private accidents: AccidentService,
    private location: LocationProviderService,
    private platform: Platform,
    private router: Router,
    private zone: NgZone,
  ) {}

  async setUpGeofence() {
    await this.geofence.initialize()
    await this.addGeoFence()
    this.platform.pause.subscribe(() => {
      this.inBackground = true
      console.log('Paused')
    })
    this.platform.resume.subscribe(() => {
      this.inBackground = false
      console.log('Resumed')
    })
  }

  private async addGeoFence () {
    if(this.locations) {
      this.locations.map(accident => {
        const { id, lat, lng, status } = accident

        if(status) {
          let fence = {
            id: id,
            latitude:       parseFloat(lat), //center of geofence radius
            longitude:      parseFloat(lng),
            radius:         150,
            transitionType: 1,
            notification:   {
              id:       id,
              title:    "Accident near you!",
              text:     "An accident near you was detected. Be careful.",
              openAppOnClick: true,
            }
          }
          this.geofence.addOrUpdate(fence).then(
            () => {
              console.log('Adding geofence done')
            }
          )
        }

      })

      if(this.accidentProneAreas) {
        console.log(this.accidentProneAreas)
        this.accidentProneAreas.map(async (area, index) => {
          const results = await this.location.geocode(area.place)
          const key = index + Math.random().toString().substr(2,7) + ""
          this.accidentProneAreasIds.push({key: index})
          console.log(key)
          let fence = {
            id: parseInt(key),
            latitude:       parseInt(results[0].position.lat), //center of geofence radius
            longitude:      parseInt(results[0].position.lng),
            radius:         150,
            transitionType: 1,
            notification:   {
              id:       parseInt(key),
              title:    "Accident prone area near you!",
              text:     "There have been numerous reports of accidents near your area",
              openAppOnclick: true,
            }
          }

          this.geofence.addOrUpdate(fence).then(
            () => console.log('Geofence for accident prone area added'),
            (err) => console.log('Geofence failed to add', err)
          );
        })
      }
    }

    this.geofence.onTransitionReceived().subscribe((event) => {
      const notification = event[0]
      if(!this.inBackground) {
        const location = this.locations.find(location => parseInt(location.id) === parseInt(notification.id))
        if(location) {
          this.zone.run( () => {
            this.router.navigateByUrl(`/accidents/${location.id}`)          
          })
        }
      }
    })
  }

  async getLocations() {
    const resp = await this.accidents.fetchAccidents()
    const accidentProneAreas = await this.accidents.getAccidentPrones()
    this.locations = resp
    this.accidentProneAreas = accidentProneAreas
  }
}
