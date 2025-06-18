import { Component, computed, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    standalone: true,
    imports: [AsyncPipe, DecimalPipe]
})
export class CartComponent {
    private cartService = inject(CartService)
    private router = inject(Router)

    cartItems$ = computed(() => {
        return this.cartService.cartItems$;
    });

    cartTotal$ = computed(() => {
        return this.cartService.cartTotal$;
    });

    updateQuantity(productId: number, quantity: number): void {
        this.cartService.updateQuantity(productId, quantity);
    }

    removeFromCart(productId: number): void {
        this.cartService.removeFromCart(productId);
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

    proceedToCheckout(): void {
        this.router.navigate(['/checkout']);
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }

    goToProducts(): void {
        this.router.navigate(['/products']);
    }
}