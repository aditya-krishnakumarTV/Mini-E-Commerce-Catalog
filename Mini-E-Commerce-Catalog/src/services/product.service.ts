import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsSubject = new BehaviorSubject<Product[]>(this.getMockProducts());
    products$ = this.productsSubject.asObservable();

    // getProducts(): Observable<Product[]> {
    //     return this.products$;
    // }

    getProductById(id: number): Observable<Product | undefined> {
        return this.products$.pipe(
            map(products => products.find(product => product.id === id))
        );
    }

    getCategories(): Observable<string[]> {
        return this.products$.pipe(
            map(products => [...new Set(products.map(product => product.category))])
        );
    }

    filterProducts(searchTerm: string, category: string, minPrice: number, maxPrice: number): Observable<Product[]> {
        return this.products$.pipe(
            map(products => products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = !category || product.category === category;
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

                return matchesSearch && matchesCategory && matchesPrice;
            }))
        );
    }

    private getMockProducts(): Product[] {
        return [
            {
                id: 1,
                name: 'Wireless Bluetooth Headphones',
                description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
                price: 199.99,
                category: 'Electronics',
                image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.5,
                inStock: true
            },
            {
                id: 2,
                name: 'Smart Fitness Watch',
                description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
                price: 299.99,
                category: 'Electronics',
                image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.3,
                inStock: true
            },
            {
                id: 3,
                name: 'Organic Cotton T-Shirt',
                description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
                price: 29.99,
                category: 'Clothing',
                image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.2,
                inStock: true
            },
            {
                id: 4,
                name: 'Premium Coffee Beans',
                description: 'Single-origin arabica coffee beans roasted to perfection.',
                price: 24.99,
                category: 'Food',
                image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.7,
                inStock: true
            },
            {
                id: 5,
                name: 'Leather Laptop Bag',
                description: 'Handcrafted leather laptop bag with multiple compartments and adjustable strap.',
                price: 149.99,
                category: 'Accessories',
                image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.4,
                inStock: true
            },
            {
                id: 6,
                name: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
                price: 39.99,
                category: 'Electronics',
                image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.1,
                inStock: false
            },
            {
                id: 7,
                name: 'Designer Sunglasses',
                description: 'Stylish sunglasses with UV protection and polarized lenses.',
                price: 89.99,
                category: 'Accessories',
                image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.0,
                inStock: true
            },
            {
                id: 8,
                name: 'Yoga Mat',
                description: 'High-quality non-slip yoga mat for all types of yoga practice.',
                price: 49.99,
                category: 'Sports',
                image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.6,
                inStock: true
            }
        ];
    }
}