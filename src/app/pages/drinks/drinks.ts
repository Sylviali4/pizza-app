import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../cart';
import { CartItem } from '../../models/menu.model';

interface DrinkOption {
  id: string;
  name: string;
  basePrice: number;
}

@Component({
  selector: 'app-drinks',
  imports: [CommonModule, FormsModule],
  templateUrl: './drinks.html',
  styleUrl: './drinks.scss',
})
export class Drinks {
  private router = inject(Router);
  public cartService = inject(CartService);

  drinkOptions: DrinkOption[] = [
    { id: 'coca-cola', name: 'Coca-Cola Classic', basePrice: 2.50 },
    { id: 'sprite', name: 'Sprite', basePrice: 2.50 },
    { id: 'pepsi', name: 'Pepsi', basePrice: 2.50 },
    { id: 'diet-coke', name: 'Diet Coke', basePrice: 2.50 },
    { id: 'mountain-dew', name: 'Mountain Dew', basePrice: 2.50 },
    { id: 'dr-pepper', name: 'Dr Pepper', basePrice: 2.50 }
  ];

  selectedDrink: DrinkOption = this.drinkOptions[0];
  selectedSize: string = 'small';
  quantity: number = 1;

  sizeOptions = [
    { value: 'small', label: 'Small', price: 0 },
    { value: 'medium', label: 'Medium (+$1)', price: 1 },
    { value: 'large', label: 'Large (+$2)', price: 2 }
  ];

  get unitPrice(): number {
    const sizePrice = this.sizeOptions.find(s => s.value === this.selectedSize)?.price || 0;
    return this.selectedDrink.basePrice + sizePrice;
  }

  get subtotal(): number {
    return this.unitPrice * this.quantity;
  }

  addToCart() {
    const cartItem: CartItem = {
      itemId: this.selectedDrink.id,
      tempId: '', // CartService will generate a temporary ID
      name: this.selectedDrink.name,
      type: 'drink',
      quantity: this.quantity,
      selectedSize: this.selectedSize,
      unitPrice: this.unitPrice,
      totalPrice: this.subtotal
    };

    this.cartService.addToCart(cartItem);
    alert(`Added ${this.quantity} x ${this.selectedDrink.name} to cart!`);
    this.router.navigate(['/cart']);
  }

  resetForm() {
    this.selectedSize = 'small';
    this.quantity = 1;
  }
}
