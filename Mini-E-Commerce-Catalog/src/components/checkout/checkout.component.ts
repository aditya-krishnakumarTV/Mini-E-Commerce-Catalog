import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CartItem, CheckoutForm } from '../../models/product.interface';

import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    standalone: true,
    imports: [FormsModule, AsyncPipe, DecimalPipe],
})
export class CheckoutComponent {
    private router = inject(Router);
    private cartService = inject(CartService);

    cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
    cartTotal$: Observable<number> = this.cartService.cartTotal$;

    isProcessing = false;

    form: CheckoutForm = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    };

    onSubmit(): void {
        this.isProcessing = true;

        // Simulate API call
        setTimeout(() => {
            this.cartService.clearCart();
            this.router.navigate(['/order-success']);
        }, 2000);
    }
}