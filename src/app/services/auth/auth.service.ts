import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  public login(username: string, password: string){
    const url: string = `${environment.API_URL}/auth/login`
    return this.http.post(url, {username, password})
  }
}
