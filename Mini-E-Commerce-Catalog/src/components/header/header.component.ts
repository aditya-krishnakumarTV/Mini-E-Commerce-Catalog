import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AsyncPipe } from "@angular/common";

import { CartService } from "../../services/cart.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: true,
    imports: [AsyncPipe]
})
export class HeaderComponent {
    private cartService = inject(CartService);
    private router = inject(Router);

    cartCount$ = this.cartService.cartCount$;

    navigateHome(): void {
        this.router.navigate(['/products']);
    }
}