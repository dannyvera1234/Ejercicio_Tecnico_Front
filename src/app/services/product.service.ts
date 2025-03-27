import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }


  getProducts() {
    return this._http.get(`${environment.BASE_API_SISTEMA}/products`);
  }

  createProduct(product: Product) {
    return this._http.post(`${environment.BASE_API_SISTEMA}/products`, product);
  }

  updateProduct(id: string, product: Product) {
    return this._http.put(`${environment.BASE_API_SISTEMA}/products/${id}`, product);
  }


  deleteProduct(id: string) {
    return this._http.delete(`${environment.BASE_API_SISTEMA}/products/${id}`);
  }

  VerificationId(id: string) {
    return this._http.get(`${environment.BASE_API_SISTEMA}/products/verification/${id}`);
  }

}
