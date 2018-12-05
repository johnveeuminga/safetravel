import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './providers/auth/auth.service'
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
    private auth: AuthService,
    private geofence: GeofenceService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready()
    await this.auth.getStoredUser()
    await this.geofence.getLocations()
    this.geofence.setUpGeofence()
    this.statusBar.styleDefault()
    this.splashScreen.hide()
  }
}