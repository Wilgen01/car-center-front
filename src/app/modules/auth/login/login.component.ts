import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

enum TabsNames {
  LOGIN = 0,
  REGISTER = 1,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private snackBar = inject(MatSnackBar);



  public authForm!: FormGroup;
  public currentTab : TabsNames = TabsNames.LOGIN;

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit() {
    if (this.authForm.invalid) return;

    const { name, email, password } = this.authForm.value

    const operation = this.currentTab == TabsNames.LOGIN
      ? this.authService.login(email, password)
      : this.authService.register(name, email, password);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/admin/vehicles']);
      },
      error: (e : HttpErrorResponse) => {
        e.status == 409
          ? this.snackBar.open(e.error.message, '', { duration: 2000, panelClass: ['error-snackbar'] })
          : this.snackBar.open('Ha ocurrido un error', '', { duration: 2000, panelClass: ['error-snackbar'] });
      }
    })

  }

  public initForm() {
    this.authForm = this.fb.group({
      name: [""],
      email: ["user@gmail.com", Validators.required],
      password: ["123456", Validators.required]
    })
  }

  public onTabChange(tabIndex: number) {
    tabIndex == TabsNames.LOGIN
      ? this.authForm.get('name')?.removeValidators(Validators.required)
      : this.authForm.get('name')?.addValidators(Validators.required);

    this.authForm.get('name')?.updateValueAndValidity();
    this.currentTab = tabIndex;
  }

}
