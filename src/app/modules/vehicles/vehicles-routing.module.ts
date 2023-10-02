import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: MyVehiclesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
