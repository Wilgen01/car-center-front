import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { Vehicle } from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly http = inject(HttpClient);



  public getVehicles(): Observable<Response<Vehicle[]>>{
    const url = `${environment.API_URL}/vehicle`;
    return this.http.get<Response<Vehicle[]>>(url);
  }

  public createVehicle(vehicle : Vehicle): Observable<void>{
    const url = `${environment.API_URL}/vehicle`;
    return this.http.post<void>(url, vehicle);
  }

  public deleteVehicle(plate : string): Observable<void>{
    const url = `${environment.API_URL}/vehicle`;
    return this.http.delete<void>(url, {body: {plate}});
  }
 
}
