import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../services/CartService/cart.service';
import { Product } from '../../models/Product.model';
import { ReceiptService } from '../../services/ReceiptService/receipt.service';
import { Router } from '@angular/router';
import { PaypalService } from '../../services//paypal/paypal.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements AfterViewInit {
  products: Product[] = [];
  total: number = 0;

  @ViewChild('paypalButtonContainer', { static: false }) paypalButtonContainer!: ElementRef;

  constructor(
    private cartService: CartService,
    private receiptService: ReceiptService,
    private router: Router,
    private paypalService: PaypalService
  ) {
    this.products = cartService.getItems();
    this.total = cartService.getTotal() * Number(1.16);
  }

  ngAfterViewInit(): void {
    // Cargar el SDK de PayPal y mostrar el botón
    this.paypalService.loadPaypalSdk('AXJc1hoAdWHOAEP8_fUVjFqHXpdad6fCZGEbu6lRRfgfdZ3buAdxoYM4ACOxMxdb1_aG3HsKmC5uBKoq', 'MXN').then(() => {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.total.toString()
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Pago completado por ' + details.payer.name.given_name);
            this.cartService.clearCart();  // Vaciar el carrito después del pago
            this.receiptService.generateReceipt(this.products,this.total);
            this.router.navigate(['']); // Redirigir después del pago
          });
        },
        onError: (err: any) => {
          console.error(err);
        }
      }).render(this.paypalButtonContainer.nativeElement);
    }).catch(error => {
      console.error('Error al cargar el SDK de PayPal:', error);
    });
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.products = this.cartService.getItems();
    this.total = this.cartService.getTotal() * Number(1.16);
  }
}
