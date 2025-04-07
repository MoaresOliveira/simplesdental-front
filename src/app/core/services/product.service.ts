import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api/v2/products';

  constructor(private http: HttpClient) {}

  getAllProducts(page: number, size: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(this.apiUrl, {
      params: { page, size },
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
