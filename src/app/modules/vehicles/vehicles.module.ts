import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';
import { MaterialModule } from '../material/material.module';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyVehiclesComponent,
    AddEditVehicleComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class VehiclesModule { }
