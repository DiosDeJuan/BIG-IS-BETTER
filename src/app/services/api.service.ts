import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia si tu backend está en otro puerto o URL

  constructor(private http: HttpClient) {}

  // Método para obtener productos
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // Método para el login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Método para registrar un usuario
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  // Método para recuperar contraseña
  recoverPassword(email: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, { email, username });
  }

  // Método para crear un producto
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productsC`, product);
  }

  // Método para actualizar un producto
  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productsU`, product);
  }

  // Método para eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productsD/${id}`);
  }
}
