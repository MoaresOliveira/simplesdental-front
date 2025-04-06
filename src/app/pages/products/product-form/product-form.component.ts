import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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

import { Category } from '../../../core/models/category.model';
import { Product } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
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
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productId: number | null = null;
  isEditMode = false;
  loading = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();

    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== 'new') {
        this.productId = +params['id'];
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      status: [true, [Validators.required]],
      code: [0],
      categoryId: [''],
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.content;
      },
      error: (error) => {
        console.error('Error loading categories', error);
        this.snackBar.open('Error loading categories', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description || '',
          price: product.price,
          status: product.status,
          code: product.code || '',
          categoryId: product.category?.id || '',
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product', error);
        this.snackBar.open('Error loading product', 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.router.navigate(['/products']);
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.loading = true;
    const productData: Product = {
      ...this.productForm.value,
    };

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: (_) => {
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 3000,
          });
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.snackBar.open('Error updating product', 'Close', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: (_) => {
          this.snackBar.open('Product created successfully', 'Close', {
            duration: 3000,
          });
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error creating product', error);
          this.snackBar.open('Error creating product', 'Close', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
    }
  }
}
