import { Component, OnInit, inject } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditVehicleComponent } from '../add-edit-vehicle/add-edit-vehicle.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss']
})
export class MyVehiclesComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  public dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar); 


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

  public deleteVehicle(plate: string){
    console.log(plate);
    
    this.vehicleService.deleteVehicle(plate).subscribe(() => {
      this.openSnackBar("Se ha eliminado el Vehículo con placa" + plate);
      this.getVehicles();
    });
  }

  public openSnackBar(message : string, ){
    this.snackBar.open(message, '', {duration: 2000})
  }

}
