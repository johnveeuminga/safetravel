import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Geofence } from '@ionic-native/geofence/ngx'
import { ImagePicker } from '@ionic-native/image-picker/ngx'
import { Base64 } from '@ionic-native/base64/ngx'
import { Camera } from '@ionic-native/camera/ngx'
// import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { IonicStorageModule  } from '@ionic/storage'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './providers/auth-guard/auth-guard.service'
import { AuthInterceptorService } from './providers/auth-interceptor/auth-interceptor.service' 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BackgroundGeolocation,
    Geolocation,
    Geofence,
    ImagePicker,
    Base64,
    Camera,
    IonicStorageModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthInterceptorService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
