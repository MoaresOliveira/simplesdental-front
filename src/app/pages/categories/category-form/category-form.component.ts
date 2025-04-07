import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Category, CategoryValidation } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormFieldComponent,
    MatError,
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId: number | null = null;
  validation = CategoryValidation;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== 'new') {
        this.categoryId = +params['id'];
        this.isEditMode = true;
        this.loadCategory(this.categoryId);
      }
    });
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', CategoryValidation.validators.name],
      description: ['', CategoryValidation.validators.description],
    });
  }

  loadCategory(id: number): void {
    this.loading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description || '',
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading category', error);
        this.snackBar.open('Error loading category', 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.router.navigate(['/categories']);
      },
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.loading = true;
    const categoryData: Category = {
      ...this.categoryForm.value,
    };

    if (this.isEditMode && this.categoryId) {
      this.categoryService
        .updateCategory(this.categoryId, categoryData)
        .subscribe({
          next: (_) => {
            this.snackBar.open('Category updated successfully', 'Close', {
              duration: 3000,
            });
            this.loading = false;
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating category', error);
            this.snackBar.open('Error updating category', 'Close', {
              duration: 3000,
            });
            this.loading = false;
          },
        });
    } else {
      this.categoryService.createCategory(categoryData).subscribe({
        next: (_) => {
          this.snackBar.open('Category created successfully', 'Close', {
            duration: 3000,
          });
          this.loading = false;
          this.router.navigate(['/categories']);
        },
        error: (error) => {
          console.error('Error creating category', error);
          this.snackBar.open('Error creating category', 'Close', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
    }
  }
}
