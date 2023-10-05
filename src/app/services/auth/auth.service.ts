import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';
import { Response } from 'src/app/shared/models/response.model';
import { Profile } from 'src/app/shared/models/profile.model';
import { map } from 'rxjs/operators';

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

  public register(name: string, email: string, password: string ){
    const url: string = `${environment.API_URL}/auth/register`
    const roles = ["USER"]

    return this.http.post<{token: string}>(url, {name, email, password, roles})
    .pipe(
      tap(data => this.tokenService.saveToken(data.token))
    )
  }

  public getProfile(){
    const url: string = `${environment.API_URL}/auth/profile`

    return this.http.get<Response<Profile>>(url).pipe(
      map((result) => result.result)
    );

  }

  public logout(){
    this.tokenService.clearToken();
  }
}
