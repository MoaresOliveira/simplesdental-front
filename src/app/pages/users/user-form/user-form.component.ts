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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { SelectFieldComponent } from '../../../shared/components/select-field/select-field.component';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormFieldComponent,
    MatError,
    SelectFieldComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm!: FormGroup;
  userId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== 'new') {
        this.userId = +params['id'];
        this.loadUser(this.userId);
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
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
        this.router.navigate(['/users']);
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const userData: User = {
      ...this.userForm.value,
    };

    this.userService.updateUser(this.userId, userData).subscribe({
      next: (_) => {
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error updating user', error);
        this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  control(controlName: string): FormControl {
    return this.userForm.get(controlName) as FormControl;
  }
}
