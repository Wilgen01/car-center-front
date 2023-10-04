import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),
        title: 'Carcenter - Dashboard'
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./../vehicles/vehicles.module').then(m => m.VehiclesModule),
        title: 'Carcenter - vehicles'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
