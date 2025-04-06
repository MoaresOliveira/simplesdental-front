import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../core/models/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  loading = true;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.snackBar.open('Error loading users', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', {
            duration: 3000,
          });
          this.loadUsers();
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
