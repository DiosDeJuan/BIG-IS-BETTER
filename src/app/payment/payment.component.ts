import { Component, OnInit } from '@angular/core';
import { StripeService } from '../services/stripe.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {
    this.setupStripe();
  }

  async setupStripe() {
    const stripe = this.stripeService.getStripe();
    if (!stripe) {
      console.error('Stripe no se ha inicializado');
      return;
    }

    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');

    const form = document.getElementById('payment-form');
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const { token, error } = await stripe.createToken(card);

        if (error) {
          console.error('Error al crear el token', error);
        } else {
          console.log('Token creado:', token);
          // Enviar el token al servidor para procesar el pago
        }
      });
    } else {
      console.error("No se encontró el elemento con ID 'payment-form'");
    }
  }
}

