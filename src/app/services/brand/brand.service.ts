import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand.model';
import { Response } from 'src/app/shared/models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly http = inject(HttpClient);

  public getBrands(){
    const url = `${environment.API_URL}/brand`;
    return this.http.get<Response<Brand[]>>(url);
  }
}
