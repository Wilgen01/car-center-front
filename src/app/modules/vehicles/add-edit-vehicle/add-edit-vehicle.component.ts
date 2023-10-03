import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/shared/models/brand.model';
import { VehicleService } from '../../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService) 

  public marcas : Brand[] = [{id: 1, name: "Chevrolet"}, {id: 2, name: "Renault"}];
  public vehicleForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(){
    console.log(this.vehicleForm);
    
    if (this.vehicleForm.invalid) return;
    
    console.log(this.vehicleForm.value);
    this.vehicleService.createVehicle(this.vehicleForm.value).subscribe((res) => {
      console.log(res);
      
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
