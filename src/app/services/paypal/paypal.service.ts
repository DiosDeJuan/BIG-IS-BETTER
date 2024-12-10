import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private paypalLoaded = false;

  constructor() { }

  // Cargar el SDK de PayPal
  loadPaypalSdk(clientId: string, currency: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.paypalLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
      script.onload = () => {
        this.paypalLoaded = true;
        resolve();
      };
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }
}
