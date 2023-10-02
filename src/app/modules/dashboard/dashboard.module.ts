import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './pages/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
