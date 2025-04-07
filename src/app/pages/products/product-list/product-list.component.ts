import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
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
    MatPaginatorModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'status',
    'code',
    'actions',
  ];
  loading = true;
  isAdmin: boolean = false;
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;
  pageCache = new Map<number, Product[]>();

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService
      .getAllProducts(this.pageIndex, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.content;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching products', error);
          this.snackBar.open('Error loading products', 'Close', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 3000,
          });
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product', error);
          this.snackBar.open('Error deleting product', 'Close', {
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
    this.loadProducts();
  }
}
