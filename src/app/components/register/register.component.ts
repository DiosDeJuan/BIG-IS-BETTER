import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister(event: Event): void {
    event.preventDefault();
    console.log("Confirmacion")
    if (this.registerForm.valid) {
      const { username, email, password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }
      this.authService.register(username, email, password).subscribe(
        (response: any) => {
          if (response.success) {
            this.successMessage = response.message;
            this.errorMessage = '';
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = 'Error en el servidor';
        }
      );
    }
  }
}
