import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../core/models/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  loading = true;
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;
  pageCache = new Map<number, User[]>();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers(this.pageIndex, this.pageSize).subscribe({
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

  paginationHandler(event: PageEvent): void {
    if(event.pageSize !== this.pageSize) {
      this.pageCache.clear();
    }
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
}
