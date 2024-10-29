// payment.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions, Token, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { environment } from '../../environments/environment'; // Asegúrate de tener configurado el entorno

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('card', { static: false }) card: StripeCardComponent;
  @ViewChild('cardErrors', { static: false }) cardErrors: ElementRef;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(private stripeService: StripeService, private http: HttpClient) {}

  ngOnInit() {
    // No es necesario llamar a setupStripe aquí ya que ngx-stripe maneja la inicialización
  }

  async onSubmit() {
    // Crear el token de Stripe utilizando ngx-stripe
    const { token, error } = await this.stripeService.createToken(this.card.element);

    if (error) {
      // Mostrar error al usuario
      if (this.cardErrors && this.cardErrors.nativeElement) {
        this.cardErrors.nativeElement.textContent = error.message;
      }
      console.error('Error al crear el token:', error);
    } else {
      // Enviar el token al servidor
      console.log('Token creado:', token);
      this.processPayment(token);
    }
  }

  processPayment(token: Token) {
    this.http.post(`${environment.apiUrl}/charge`, { token: token.id })
      .subscribe(
        response => {
          console.log('Pago realizado:', response);
          // Manejar acciones posteriores al pago, como mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al procesar el pago:', error);
          // Manejar errores, como mostrar un mensaje de error al usuario
        }
      );
  }
}
