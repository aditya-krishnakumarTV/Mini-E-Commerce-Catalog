import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product.interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    standalone: true,
    imports: [FormsModule, AsyncPipe],
})
export class ProductListComponent implements OnInit {
    private productService = inject(ProductService);
    private cartService = inject(CartService);
    private router = inject(Router);

    searchTerm = signal('');
    selectedCategory = signal('');
    minPrice = signal(0);
    maxPrice = signal(1000);

    categories$ = computed(() => {
        return this.productService.getCategories();
    })

    filteredProducts$ = computed(() => {
        return this.productService.filterProducts(
            this.searchTerm(),
            this.selectedCategory(),
            this.minPrice(),
            this.maxPrice()
        );;
    })

    ngOnInit(): void {
        // this.onFilterChange();
    }

    // onFilterChange(): void {
    //     this.filteredProducts$
    // }

    addToCart(product: Product): void {
        if (product.inStock) {
            this.cartService.addToCart(product);
        }
    }

    viewProduct(id: number): void {
        this.router.navigate(['/product', id]);
    }
}