import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AccidentReportingService } from '../providers/accident-reporting/accident-reporting.service'

@Component({
  selector: 'app-stepone',
  templateUrl: './stepone.page.html',
  styleUrls: ['./stepone.page.scss'],
})
export class SteponePage implements OnInit {
  form: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accidentReporting: AccidentReportingService
  ) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(30)]
    })
  }

  ngOnInit() {
  }

  goToStepTwo() {
    this.router.navigateByUrl('/steptwo')
  }

  processForm() {
    this.accidentReporting.addFields(this.form.value)
    this.goToStepTwo()
  }

}
