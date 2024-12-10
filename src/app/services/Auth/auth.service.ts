
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  private apiUrlR = 'http://localhost:3000/api/register';
  private apiUrlRP = 'http://localhost:3000/api/recover-password'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlR, { username, email, password });
  }

  recoverPassword(email: string, username: string): Observable<any> {
    return this.http.post<any>(this.apiUrlRP, { email, username });
  }
  
}

  
