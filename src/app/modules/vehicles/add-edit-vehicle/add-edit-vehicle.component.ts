import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/shared/models/brand.model';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService)
  private readonly snackBar = inject(MatSnackBar); 


  public marcas : Brand[] = [{id: 1, name: "Chevrolet"}, {id: 2, name: "Renault"}];
  public vehicleForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(){
    if (this.vehicleForm.invalid) return;
    
    this.vehicleService.createVehicle(this.vehicleForm.value).subscribe((res) => {
      this.snackBar.open(`Se ha creado el vehículo con placa ${this.vehicleForm.value.plate} `)
    });
  }

  public onInputPlate(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.vehicleForm.get('plate')?.setValue(value.toLocaleUpperCase())
  }

  public initForm(){
    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{3}$")]],
      color: ['', Validators.required],
      brand_id: ['', Validators.required]
    })
  }

}
