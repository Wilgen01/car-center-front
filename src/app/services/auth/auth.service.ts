import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  public login(username: string, password: string){
    const url: string = `${environment.API_URL}/auth/login`

    return this.http.post<{token: string}>(url, {username, password})
    .pipe(
      tap(data => this.tokenService.saveToken(data.token))
    )
  }

  public logout(){
    this.tokenService.clearToken();
  }
}
