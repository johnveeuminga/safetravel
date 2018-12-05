import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router, ActivatedRoute  } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { ApiProviderService } from '../providers/api/api-provider.service' 
import { AccidentService } from '../providers/accident/accident.service'
import { AuthService } from '../providers/auth/auth.service'

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.page.html',
  styleUrls: ['./accident-details.page.scss'],
})
export class AccidentDetailsPage implements OnInit {
  accident: any
  loading: any
  sub
  user: any

  constructor(
    private router: Router,
    public api: ApiProviderService,
    private loadingCtrl: LoadingController,
    private accidentService: AccidentService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { 
    this.user = this.auth.user
  }

  async ngOnInit() {
    await this.onEnter();
  }
  
  async onEnter(): Promise<void> {
    try {
      await this.presentLoading()
      this.sub =  this.route.params.subscribe( async routeParams => {
        const id = routeParams['id']
        console.log(id)
        this.accident = await this.accidentService.getAccident(id)
        this.hideLoading()
      })
    } catch(err) {
      console.log(err)
      this.hideLoading()
    }
  }

  async presentLoading(message = null) {
    this.loading = await this.loadingCtrl.create({
      message: message || 'Preparing data...'
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

  async viewMap() {
    this.router.navigateByUrl(`/accidents/${this.accident.id}/map`)
  }

}
