import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router, ActivatedRoute  } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { ApiProviderService } from '../providers/api/api-provider.service' 

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.page.html',
  styleUrls: ['./accident-details.page.scss'],
})
export class AccidentDetailsPage implements OnInit {
  private subscription: Subscription;
  accident: any
  loading: any
  sub

  constructor(
    private router: Router,
    public api: ApiProviderService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.onEnter();
  }

    /**
   * TODO: Get accidents reported by user to user using Laravel/ 
   * This is just a mockup
   */
  async onEnter(): Promise<void> {
    try {
      await this.presentLoading()
      this.sub =  this.route.params.subscribe( async routeParams => {
        const id = routeParams['id']
        this.accident = await this.api.performGet(`/accidents/${id}`)
        console.log(this.accident)
        this.hideLoading()
      })
    } catch(err) {
      console.log(err)
      this.hideLoading()
    }


  }

  async presentLoading(message = null) {
    this.loading = await this.loadingCtrl.create({
      message: message || 'Fetching data...'
    })

    this.loading.present()
  }

  hideLoading() {
    if(this.loading) {
      this.loading.dismiss()
    }
  }

  async markAccidentAsResolved() {
    await this.presentLoading('Please wait...')
    await this.api.performPut(`/accidents/${this.accident.id}`, {
      ...this.accident,
      status: 0,
    } )
    this.accident.status = 0
    await this.loading.dismiss()
  }

}
