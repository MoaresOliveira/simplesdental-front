import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    FormFieldComponent,
    MatError,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userForm!: FormGroup;
  userId: number | null = null;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUser();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      role: [''],
      password: ['', [Validators.required]],
    });
  }

  loadUser(): void {
    this.loading = true;
    this.authService.getAuthContext().subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role,
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user', error);
        this.snackBar.open('Error loading user', 'Close', { duration: 3000 });
        this.loading = false;
        this.router.navigate(['/categories']);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }

  updatePassword(): void {
    if (this.userForm.invalid) {
      return;
    }

    const password = this.userForm.get('password')?.value;

    this.loading = true;
    this.userService.updatePassword(password).subscribe({
      next: () => {
        this.snackBar.open('Password updated successfully', 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error updating password', error);
        this.snackBar.open('Error updating password', 'Close', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }
}
