import { Validators } from '@angular/forms';
import { Product } from './product.model';

export interface Category {
  id?: number;
  name: string;
  description?: string;
  products?: Product[];
}

export const CategoryValidation = {
  name: {
    required: true,
    maxLength: 100,
  },
  description: {
    maxLength: 255,
  },
  validators: {
    name: [Validators.required, Validators.maxLength(100)],
    description: [Validators.maxLength(255)],
  }
}
