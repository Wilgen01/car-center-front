import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = this.addToken(request);
    return next.handle(request).pipe(
      tap({
        next: () =>{},
        error: (e: HttpErrorResponse) => {
          if (e instanceof HttpErrorResponse) {
            
            if (e.status === 401) {
              this.router.navigate(["/auth/login"]);
            } 
          }
        }
      })
    );
  }

  private addToken(request: HttpRequest<unknown>): HttpRequest<unknown>{
    const token = this.tokenService.getToken();
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return authReq;
    }
    return request;
  }
}
