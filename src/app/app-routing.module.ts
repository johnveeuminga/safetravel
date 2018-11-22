import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './providers/auth-guard/auth-guard.service'

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
  { path: 'warning', loadChildren: './warning/warning.module#WarningPageModule' },
  { path: 'stepone', loadChildren: './stepone/stepone.module#SteponePageModule' },
  { path: 'steptwo', loadChildren: './steptwo/steptwo.module#SteptwoPageModule' },
  { path: 'stepthree', loadChildren: './stepthree/stepthree.module#StepthreePageModule' },
  { path: 'thankyou', loadChildren: './thankyou/thankyou.module#ThankyouPageModule' },
  { path: 'chooselocation', loadChildren: './chooselocation/chooselocation.module#ChooselocationPageModule' },
  { path: 'accidents-list', loadChildren: './accidents-list/accidents-list.module#AccidentsListPageModule' },
  { path: 'accidents/:id', loadChildren: './accident-details/accident-details.module#AccidentDetailsPageModule' },
  { path: 'accidents/:id/map', loadChildren: './accident-map-view/accident-map-view.module#AccidentMapViewPageModule' },
  { path: '**', redirectTo: 'app' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
