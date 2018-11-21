import { Injectable } from '@angular/core';
import { Geofence } from '@ionic-native/geofence/ngx'
import { HttpClient } from '@angular/common/http' 
import { AccidentService } from '../accident/accident.service'

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {
  locations: any
  fences = []
  API_URL = "http://localhost:3000/accidents"


  constructor(
    private geofence: Geofence,
    private http: HttpClient,
    private accidents: AccidentService,
  ) {}

  public setUpGeofence() {
    this.geofence.initialize().then(
      () =>  this.addGeoFence(),
      (err) => {
        console.log('Failed to intialize geofence.', err)
        return false;
      }
    )
  } 

  private addGeoFence () {
    if(this.locations) {
      this.locations.map(accident => {
        const { id, lat, lng, status } = accident

        if(!status) return false

        let fence = {
          id: id,
          latitude:       lat, //center of geofence radius
          longitude:      lng,
          radius:         150,
          transitionType: 1,
          notification:   {
            id:       id,
            title:    "Accident near you!",
            text:     "An accident near you was detected. Be careful.",
            openAppOnclick: true,
          }
        }

        this.geofence.addOrUpdate(fence).then(
          () => console.log('Geofence added'),
          (err) => console.log('Geofence failed to add', err)
        );
      })

      this.geofence.onTransitionReceived().subscribe(() => {
        console.log('Transition.')
      })
    }
  }

  async getLocations() {
    const resp = await this.accidents.fetchAccidents()
    this.locations = resp
  }
}
