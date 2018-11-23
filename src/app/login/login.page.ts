import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth/auth.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { GooglePlus } from '@ionic-native/google-plus/ngx' 
import { ApiProviderService } from '../providers/api/api-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup 
  loading: any
  alert: any

  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private googlePlus: GooglePlus,
    private api: ApiProviderService
  ) { 
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async processForm() {
    const { username, password } = this.form.value
    await this.showLoader()
    let res = await this.auth.getToken(username, password)
    if(res.error) {
      await this.hideLoader()
      await this.showAlert(res.error.message)
    } 
    await this.hideLoader()
    this.form.reset()
    this.router.navigateByUrl('/app/tabs/(home:home)')
  }

  async showLoader () {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    })

    this.loading.present()
  }

  async hideLoader () {
    if(this.loading) await this.loading.dismiss()
  }

  async showAlert (message) {
    this.alert = await this.alertCtrl.create({
      message,
      buttons: [
        'Dismiss'
      ]
    })
    this.alert.present()
  }

  async loginWithGoogle () {
    console.log('login')
    try {
      const googleUser = await this.googlePlus.login({
        webClientId: '897970861884-d7v4sjnqs02dgtrhf3agqkj9t5lfgtkm.apps.googleusercontent.com'
      })

      await this.showLoader()
      const user = await this.api.performPost('/social/google', {
        token: googleUser.accessToken
      })

      await this.auth.storeUser({
        ...user.user,
        accessToken: user.access_token,
        refreshToken: ''
      })

      await this.hideLoader()

      this.router.navigateByUrl('/app/tabs/(home:home)')
      
    } catch(err) {
      console.log(err)
    }

    
  }
}
