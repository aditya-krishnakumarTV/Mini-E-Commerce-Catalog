import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartItem, Product } from '../models/product.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();

    private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();

    private cartTotalSubject = new BehaviorSubject<number>(0);
    cartTotal$ = this.cartTotalSubject.asObservable();

    addToCart(product: Product, quantity: number = 1): void {
        const currentItems = this.cartItemsSubject.value;
        const existingItem = currentItems.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentItems.push({ product, quantity });
        }

        this.updateCart(currentItems);
    }

    removeFromCart(productId: number): void {
        const currentItems = this.cartItemsSubject.value;
        const updatedItems = currentItems.filter(item => item.product.id !== productId);
        this.updateCart(updatedItems);
    }

    updateQuantity(productId: number, quantity: number): void {
        const currentItems = this.cartItemsSubject.value;
        const item = currentItems.find(item => item.product.id === productId);

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.updateCart(currentItems);
            }
        }
    }

    clearCart(): void {
        this.updateCart([]);
    }

    private updateCart(items: CartItem[]): void {
        this.cartItemsSubject.next(items);

        const count = items.reduce((total, item) => total + item.quantity, 0);
        this.cartCountSubject.next(count);

        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        this.cartTotalSubject.next(total);
    }
}