import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { Product } from '../../models/product.interface';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
    standalone: true,
    imports: [AsyncPipe, CommonModule],
})
export class ProductDetailsComponent implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private productService = inject(ProductService);
    private cartService = inject(CartService);

    product$: Observable<Product | undefined>;

    constructor() {
        this.product$ = new Observable();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.product$ = this.productService.getProductById(id);
        });
    }

    addToCart(product: Product): void {
        if (product.inStock) {
            this.cartService.addToCart(product);
        }
    }

    addToCartAndGoToCart(product: Product): void {
        if (product.inStock) {
            this.cartService.addToCart(product);
            this.router.navigate(['/cart']);
        }
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }
}