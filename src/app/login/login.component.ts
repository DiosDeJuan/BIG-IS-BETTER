import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Lógica del componente puede ir aquí
  onLogin() {
    // Lógica para manejar el ingreso
    console.log("Usuario ha ingresado");
  }

  onRecoverPassword() {
    // Lógica para manejar la recuperación de contraseña
    console.log("Recuperar contraseña");
  }
}
