import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Hace el componente standalone
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Asegúrate de importar ReactiveFormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  

  onLogin(event: Event): void {
    event.preventDefault();
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username);
      console.log(password);
      this.authService.login(username, password).subscribe(
        (response: any) => {
          if (response.success) {
            this.successMessage = response.message;
            this.errorMessage = '';
            const admin = response.admin; // Almacena la contraseña recuperada
            if(admin == 1)
              this.router.navigate(['/admin']);
            else
              this.router.navigate(['/catalogo']);           
            
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
            console.log("Usuario incorrecto");
          }
        },
        (error) => {
          this.errorMessage = 'Error en el servidor';
          this.successMessage = '';
          console.log("Formulario no funcionando");
        }
      );
    }
  }
  
}
