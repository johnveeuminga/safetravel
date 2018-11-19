import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GeofenceService } from './providers/geofence/geofence.service' 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geofence: GeofenceService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready()
    this.statusBar.styleDefault()
    await this.geofence.getLocations()
    this.geofence.setUpGeofence()
    this.splashScreen.hide()
  }
}