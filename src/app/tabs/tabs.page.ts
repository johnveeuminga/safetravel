import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular'
import { AccidentService } from '../providers/accident/accident.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor( 
    private accidentService: AccidentService
  ) {
    
  }

  async ngOnInit () {
    await this.accidentService.fetchAccidents()
  }
}
