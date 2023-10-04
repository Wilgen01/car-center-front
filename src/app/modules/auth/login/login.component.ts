import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit() {
    if (this.authForm.invalid) return;
    const { email, password } = this.authForm.value
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/vehicles']);
        },
        error: () => {
          this.openSnackBar('Invalid credentials', 'Close');
        }
      })

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  public initForm() {
    this.authForm = this.fb.group({
      email: ["user@gmail.com", Validators.required],
      password: ["123456", Validators.required]
    })
  }

}
