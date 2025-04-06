import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-detail',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId!: number;
  user: User | null = null;
  loading = true;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  loadUser(): void {
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user', error);
        this.snackBar.open('Error loading user details', 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.router.navigate(['/users']);
      },
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error deleting user', error);
          this.snackBar.open('Error deleting user', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
