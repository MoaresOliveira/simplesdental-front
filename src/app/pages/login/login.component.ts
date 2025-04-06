import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatError,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    FormFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  userId: number | null = null;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  passwordMismatch(): boolean {
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    console.log(!!confirmPasswordControl?.value);
    return (
      passwordControl?.value &&
      confirmPasswordControl?.value &&
      passwordControl?.value !== confirmPasswordControl?.value
    );
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.authService.getAuthContext().subscribe(() => {
          this.router.navigate(['/home']);
          this.loading = false;
        });
      },
      error: (error) => {
        console.error('Error logging in user', error);
        this.snackBar.open('Error logging in user', 'Close', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.authService.registerUser(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Registration successful', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
        this.initForm();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error registering user', error);
        this.snackBar.open('Error registering user', 'Close', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  registerControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  loginControl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }
}
