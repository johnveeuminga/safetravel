import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service'
import { AlertController, Events } from '@ionic/angular'
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
    private router: Router,
    private events: Events
  ) { }

  async ngOnInit() {
    this.user = this.auth.user
    this.events.subscribe('user:logged-in', (user) => {
      this.user = user
    })
  }

  async showAlert() {
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
    this.user = null
    this.router.navigate(['/app'])
  }

  async goToLogin() {
    this.router.navigateByUrl('/login')
  }

  getUserProfileImage () {
    return this.user.image_url || `https://api.adorable.io/avatars/155/${this.user.id}.png`
  }

}
