import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if(!await this.auth.getStoredUser()) {
      this.router.navigateByUrl('/login')
      return false
    }

    return true
  }
}
