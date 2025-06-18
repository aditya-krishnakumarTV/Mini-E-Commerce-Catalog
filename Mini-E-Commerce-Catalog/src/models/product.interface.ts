export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    inStock: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CheckoutForm {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}