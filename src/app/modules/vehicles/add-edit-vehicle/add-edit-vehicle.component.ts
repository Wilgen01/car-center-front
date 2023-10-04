import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/shared/models/brand.model';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from 'src/app/shared/models/vehicle.model';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService)
  private readonly brandService = inject(BrandService)
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<AddEditVehicleComponent>);



  public brands: Brand[] = [];
  public vehicleForm!: FormGroup;
  public vehicleToEdit: Vehicle | undefined = this.modalData;
  public operation: string = "Crear ";
  public isEdit: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public modalData: Vehicle) { }

  ngOnInit(): void {
    this.initForm();
    this.setVehicleToEdit();
    this.getBrands();
  }

  setVehicleToEdit() {
    if (this.vehicleToEdit != undefined) {
      this.operation = "Actualizar"
      this.isEdit = true;
      this.vehicleForm.setValue({
        plate: this.vehicleToEdit.plate,
        color: this.vehicleToEdit.color,
        brand_id: this.vehicleToEdit.brand.id,
      });
      this.vehicleForm.get('plate')?.disable();
    }
  }

  public onSubmit() {
    if (this.vehicleForm.invalid) return;

    if (!this.isEdit) {
      this.vehicleService.createVehicle(this.vehicleForm.value).subscribe(() => {
        this.snackBar.open(`Se ha creado el vehículo con placa ${this.vehicleForm.value.plate} `, '', {duration: 2000});
        this.dialogRef.close({ok: true})
      });
    }else{
      this.vehicleForm.get('plate')?.enable();
      this.vehicleService.updateVehicle(this.vehicleForm.value).subscribe(() => {
        this.snackBar.open(`Se ha actualizado el vehículo con placa ${this.vehicleForm.value.plate} `, '', {duration: 2000});
        this.dialogRef.close({ok: true})
      });
    }

  }

  public getBrands(){
    this.brandService.getBrands().subscribe(
      (data) => {
        this.brands = data.result ?? [];
      }
    )
  }

  public onInputPlate(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.vehicleForm.get('plate')?.setValue(value.toLocaleUpperCase())
  }

  public initForm() {
    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required, Validators.pattern("^[A-Z]{3}[0-9]{3}$")]],
      color: ['', Validators.required],
      brand_id: ['', Validators.required]
    })
  }

}
