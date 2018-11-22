import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any
  alert: any

  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.auth.user
  }

  async showAlert() {
    console.log('Show')
    this.alert = await this.alertCtrl.create({
      message: "Are you sure?",
      buttons: [
        {
          text: 'Dismiss',
        },
        {
          text: 'Log out',
          handler: () => {
            this.logout()
          }
        }
      ]
    })
    this.alert.present()
  }

  async logout () {
    await this.auth.logoutUser()
    this.router.navigate(['login'])
  }

}
