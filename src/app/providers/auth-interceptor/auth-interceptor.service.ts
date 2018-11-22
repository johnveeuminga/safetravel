import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service'
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.user && this.auth.user.accessToken) {
      request = request.clone(
        {
          headers: request.headers.set('Authorization', `Bearer ${this.auth.user.accessToken}`)
        }
      )

      console.log(request)
    }
   
    return next.handle(request)
  }

}
