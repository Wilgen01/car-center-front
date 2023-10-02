import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    MyVehiclesComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MaterialModule
  ]
})
export class VehiclesModule { }
