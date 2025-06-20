import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-order-success',
    templateUrl: './order-success.component.html',
    styleUrl: './order-success.component.css',
    standalone: true
})
export class OrderSuccessComponent {
    private router = inject(Router);

    orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

    continueShopping(): void {
        this.router.navigate(['/products']);
    }

    viewOrders(): void {
        // This would typically navigate to an orders page
        this.router.navigate(['/products']);
    }
}