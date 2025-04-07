import { Validators } from '@angular/forms';
import { Category } from './category.model';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  status: boolean;
  code?: number;
  category?: Category;
}

export const ProductValidation = {
  name: { required: true, maxLength: 100 },
  description: { maxLength: 255 },
  price: { required: true, min: 0.01 },
  status: { required: true },
  categoryId: { required: true },
  validators: {
    name: [Validators.required, Validators.maxLength(100)],
    description: [Validators.maxLength(255)],
    price: [Validators.required, Validators.min(0.01)],
    status: [Validators.required],
    categoryId: [Validators.required],
  },
};
