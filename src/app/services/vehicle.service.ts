import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Vehicle } from '../shared/models/vehicle.model';
import { Response } from '../shared/models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly http = inject(HttpClient);



  public getVehicles(){
    const url = `${environment.API_URL}/vehicle`
    return this.http.get<Response<Vehicle[]>>(url)
  }
 
}
