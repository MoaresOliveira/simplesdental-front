import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-list',
  standalone: true,
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
    MatPaginatorModule
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  loading = true;
  isAdmin: boolean = false;
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;
  pageCache = new Map<number, Category[]>();

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;

    const cachedPage = this.pageCache.get(this.pageIndex);
    if (cachedPage) {
      this.categories = cachedPage;
      this.loading = false;
      return;
    }

    this.categoryService.getAllCategories(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        console.log(data)
        this.categories = data.content;
        this.totalElements = data.totalElements;

        this.pageCache.set(this.pageIndex, this.categories);

        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.snackBar.open('Error loading categories', 'Close', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Category deleted successfully', 'Close', {
            duration: 3000,
          });
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error deleting category', error);
          this.snackBar.open('Error deleting category', 'Close', {
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
    this.loadCategories();
  }
}
