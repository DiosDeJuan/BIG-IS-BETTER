import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  private apiUrlC = 'http://localhost:3000/api/productsC';
  private apiUrlU = 'http://localhost:3000/api/productsU';
  private apiUrlD = 'http://localhost:3000/api/productsD';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  removeProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

   // Crear un nuevo producto
   createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrlC, product);
    //return this.http.post<any>(this.apiUrlC, { username, email, password });
  }

  // Actualizar un producto
  updateProduct(id: number, nombre: string, descripcion: string, precio: string, imagenURL: string): Observable<any> {
    return this.http.put<any>(this.apiUrlU, {id, nombre, descripcion, precio, imagenURL});
    //id, nombre, descripcion, precio, imagenURL
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    // Usa la URL correcta para la eliminación, y pasa el id correctamente en la URL
    return this.http.delete<any>(`${this.apiUrlD}/${id}`);
  }  
}
