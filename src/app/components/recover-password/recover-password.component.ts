
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Incluye ReactiveFormsModule aquí
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'] // Asegúrate de importar ReactiveFormsModule aquí
})
export class RecoverPasswordComponent {
  recoverForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  passwordRecovered: string = ''; // Propiedad para almacenar la contraseña recuperada

  onRecover(event: Event): void {
    console.log("Registro");
    event.preventDefault();
    if (this.recoverForm.valid) {
      const { username, email } = this.recoverForm.value;
      this.authService.recoverPassword(email, username).subscribe(
        (response: any) => {
          if (response.success) {
            this.successMessage = response.message;
            this.passwordRecovered = response.password; // Almacena la contraseña recuperada
            
            this.errorMessage = '';
          } else {
            this.errorMessage = response.message;
            this.passwordRecovered = ''; // Limpia la contraseña si no tiene éxito
          }
        },
        (error) => {
          this.errorMessage = 'Error en el servidor';
          this.passwordRecovered = ''; // Limpia la contraseña en caso de error
        }
      );
    }
  }

}
