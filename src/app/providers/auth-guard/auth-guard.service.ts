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
    return new Promise<boolean>(async(resolve, reject) => {
      const user = await this.auth.getStoredUser()

      if(!user) {
        this.router.navigate(['login'])

        resolve(true)
      }

      resolve(true)
    })
  }
}
