import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../cart';
import { CartItem } from '../../models/menu.model';

interface SideOption {
  id: string;
  name: string;
  basePrice: number;
  image: string;
}

@Component({
  selector: 'app-sides',
  imports: [CommonModule, FormsModule],
  templateUrl: './sides.html',
  styleUrl: './sides.scss',
})
export class Sides {
  private router = inject(Router);
  public cartService = inject(CartService);

  sideOptions: SideOption[] = [
    { id: 'garlic-bread', name: 'garlic bread', basePrice: 5.00, image: '/images/garlic_bread.jpg' },
    { id: 'caesar-salad', name: 'Caesar salad', basePrice: 6.00, image: '/images/caesar_salad.jpg' },
    { id: 'chicken-wings', name: 'chicken wings', basePrice: 8.00, image: '/images/chiken_wing.jpg' }
  ];

  selectedSide: SideOption = this.sideOptions[0];
  selectedSize: string = 'small';
  quantity: number = 1;

  sizeOptions = [
    { value: 'small', label: 'Small', price: 0 },
    { value: 'medium', label: 'Medium (+$1)', price: 1 },
    { value: 'large', label: 'Large (+$2)', price: 2 }
  ];

  get unitPrice(): number {
    const sizePrice = this.sizeOptions.find(s => s.value === this.selectedSize)?.price || 0;
    return this.selectedSide.basePrice + sizePrice;
  }

  get subtotal(): number {
    return this.unitPrice * this.quantity;
  }

  addToCart() {
    const cartItem: CartItem = {
      itemId: this.selectedSide.id,
      tempId: '', // cart service gives it an id
      name: this.selectedSide.name,
      type: 'side',
      quantity: this.quantity,
      selectedSize: this.selectedSize,
      unitPrice: this.unitPrice,
      totalPrice: this.subtotal,
      image: this.selectedSide.image
    };

    this.cartService.addToCart(cartItem);
    alert(`Added ${this.quantity} x ${this.selectedSide.name} to cart!`);
    this.router.navigate(['/cart']);
  }

  resetForm() {
    this.selectedSize = 'small';
    this.quantity = 1;
  }
}
