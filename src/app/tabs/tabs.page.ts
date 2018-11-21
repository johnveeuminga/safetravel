import { Component, OnInit } from '@angular/core';
import { GeofenceService } from '../providers/geofence/geofence.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor( private geofence: GeofenceService) {
    
  }

  async ngOnInit () {
    await this.geofence.getLocations()
    this.geofence.setUpGeofence()
  }
}
