import { Component, OnInit, inject } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditVehicleComponent } from '../add-edit-vehicle/add-edit-vehicle.component';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss']
})
export class MyVehiclesComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  public dialog = inject(MatDialog);

  public vehicles : Vehicle[] = [];
  public columnas = ["plate", "color", "brand", "acciones"];


  ngOnInit(){
    this.getVehicles();
  }

  public getVehicles(){
    this.vehicleService.getVehicles()
    .subscribe(response => {
      this.vehicles = response.result ?? []      
    })
  }

  public openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(AddEditVehicleComponent, {
      width: '600px',
      autoFocus: false,
      hasBackdrop: true
    });
  }

}
