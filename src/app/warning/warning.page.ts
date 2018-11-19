import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router'

@Component({
  selector: 'app-warning',
  templateUrl: './warning.page.html',
  styleUrls: ['./warning.page.scss'],
})
export class WarningPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToStepOne() {
    this.router.navigateByUrl('stepone')
  }

  goToHome() {
    this.router.navigateByUrl('/app/tabs/(home:home)')    
  }
}
