import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../cart';
import { ConfirmOrderModal } from '../../components/confirm-order-modal/confirm-order-modal';
import { OrderService } from '../../order';
import { take, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  // Import required modules and components
  imports: [CommonModule, ConfirmOrderModal, DecimalPipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPageComponent {

  private router = inject(Router);
  public cartService = inject(CartService);
  private orderService = inject(OrderService); // Inject OrderService

  // Subscribe to cart data stream and total price
  public cartItems$ = this.cartService.cartItems$;
  public totalPrice$ = this.cartService.totalPrice$;

  // Control modal display state
  public isModalOpen: boolean = false;

  constructor() { }

  // Navigate to home page
  goToHome(): void {
    this.router.navigate(['/']);
  }

  // Remove item from cart
  removeItem(tempId: string): void {
    this.cartService.removeItem(tempId);
  }

  // Clear cart
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Open confirm order modal
  openCheckoutModal(): void {
    this.isModalOpen = true;
  }

  // --- Order Submission ---

  /**
   * Submit order and handle result (AJ2Q: Promises, core Firestore test point)
   */
  async confirmOrder(): Promise<void> {
    // Use firstValueFrom to get current totalPrice, replacing deprecated toPromise()
    const totalPrice = await firstValueFrom(this.totalPrice$.pipe(take(1)));
    const cartItems = this.cartService.getCurrentCart(); // Get latest value from BehaviorSubject

    if (cartItems.length === 0 || !totalPrice) {
        console.warn('Cart is empty, cannot checkout.');
        this.isModalOpen = false;
        return;
    }

    try {
      // Call OrderService to submit to Firestore
      const orderId = await this.orderService.submitOrder({
          items: cartItems,
          totalPrice: totalPrice
      });

      // On successful submission:
      this.cartService.clearCart(); // Clear local cart
      this.isModalOpen = false;     // Close modal

      // Navigate to success page
      this.router.navigate(['/order/success'], { queryParams: { id: orderId } });

    } catch (error) {
      console.error('Order submission failed:', error);
      // TODO: Show error message to user
      this.isModalOpen = false;
    }
  }

  // Cancel order / Close modal
  cancelOrder(): void {
    this.isModalOpen = false;
  }
}