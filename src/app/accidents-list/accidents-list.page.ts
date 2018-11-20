import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { ApiProviderService } from '../providers/api/api-provider.service' 


@Component({
  selector: 'app-accidents-list',
  templateUrl: './accidents-list.page.html',
  styleUrls: ['./accidents-list.page.scss'],
})
export class AccidentsListPage implements OnInit {
  private subscription: Subscription;
  accidents: Array<any>
  loading: any

  constructor(
    private router: Router,
    public api: ApiProviderService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    await this.onEnter();

    this.subscription = this.router.events.subscribe( async (event) => {
      if (event instanceof NavigationEnd && event.url === '/app/tabs/(accidents-list:accidents-list)') {
        await this.onEnter();
      }
    });
  }

  /**
   * TODO: Get accidents reported by user to user using Laravel/ 
   * This is just a mockup
   */
  public async onEnter(): Promise<void> {
    try {
      await this.presentLoading()
      const accidents = await this.api.performGet('/accidents')
      this.accidents = (accidents.filter(accident => accident.id === 1))
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
}
