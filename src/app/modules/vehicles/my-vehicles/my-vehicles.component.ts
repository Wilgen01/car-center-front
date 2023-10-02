import { Component, OnInit, inject } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from '../../../shared/models/vehicle.model';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss']
})
export class MyVehiclesComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  public vehicles : Vehicle[] = [];
  public columnas = ["plate", "color", "brand"];


  ngOnInit(){
    this.getVehicles();
  }

  public getVehicles(){
    this.vehicleService.getVehicles()
    .subscribe(response => {
      this.vehicles = response.result ?? []      
    })
  }

}
