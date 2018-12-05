import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingController, Events } from '@ionic/angular'
import { ApiProviderService } from '../providers/api/api-provider.service' 
import { AccidentService } from '../providers/accident/accident.service'
import { AuthService } from '../providers/auth/auth.service'

@Component({
  selector: 'app-accidents-list',
  templateUrl: './accidents-list.page.html',
  styleUrls: ['./accidents-list.page.scss'],
})
export class AccidentsListPage implements OnInit {
  private subscription: Subscription;
  accidents: Array<any> = []
  loading: any
  user: any = null

  constructor(
    private router: Router,
    public api: ApiProviderService,
    private loadingCtrl: LoadingController,
    private accident: AccidentService,
    private auth: AuthService,
    private events: Events
  ) { }

  async ngOnInit() {
    await this.onEnter();

    this.user = this.auth.user

    this.events.subscribe('user:logged-in', (user) => {
      this.user = user
    }) 

    this.events.subscribe('user:logged-out', () => {
      this.user = null
    }) 

    this.subscription = this.router.events.subscribe( async (event) => {
      if (event instanceof NavigationEnd && event.url === '/app/tabs/(accidents-list:accidents-list)') {
        await this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    try {
      await this.presentLoading()
      if(this.user) {
        const accidents = await this.accident.fetchAccidents()
        this.accidents = (accidents.filter(accident => accident.user_id === this.auth.user.id))
      }
    }catch(err) {
      console.log(err)
    }

    this.hideLoading()

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Fetching data...'
    })

    this.loading.present()
  }

  hideLoading() {
    if(this.loading) {
      this.loading.dismiss()
    }
  }

  goToDetails (id) {
    this.router.navigateByUrl(`/accidents/${id}`)
  }

  goToLogin() {
    this.router.navigateByUrl('/login')
  }

  goToWarning() {
    this.router.navigateByUrl('/warning')
  }
}
