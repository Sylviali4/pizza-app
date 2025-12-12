import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common'; // 导入管道
import { Router } from '@angular/router';
import { CartService } from '../../cart';
import { CartItem } from '../../models/menu.model';
import { ConfirmOrderModal } from '../../components/confirm-order-modal/confirm-order-modal'; // 导入模态框组件
import { OrderService } from '../../order'; // 导入 OrderService
import { take } from 'rxjs'; // 导入 take 操作符

@Component({
  selector: 'app-cart-page',
  standalone: true,
  // 导入所需的模块和组件
  imports: [CommonModule, ConfirmOrderModal, CurrencyPipe, DecimalPipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPageComponent {

  private router = inject(Router);
  public cartService = inject(CartService);
  private orderService = inject(OrderService); // 注入 OrderService

  // 订阅购物车数据流和总价
  public cartItems$ = this.cartService.cartItems$;
  public totalPrice$ = this.cartService.totalPrice$;

  // 控制模态框的显示状态
  public isModalOpen: boolean = false;

  constructor() { }

  // 导航到主页
  goToHome(): void {
    this.router.navigate(['/']);
  }

  // 从购物车移除项目
  removeItem(tempId: string): void {
    this.cartService.removeItem(tempId);
  }

  // 清空购物车
  clearCart(): void {
    this.cartService.clearCart();
  }

  // 打开确认订单模态框
  openCheckoutModal(): void {
    this.isModalOpen = true;
  }

  // --- 订单提交逻辑 (核心) ---

  /**
   * 提交订单并处理结果 (AJ2Q: Promises, 核心的 Firestore 测试点)
   */
  async confirmOrder(): Promise<void> {
    // 使用 take(1).toPromise() 获取当前的 totalPrice，确保只取一个值后完成
    const totalPrice = await this.totalPrice$.pipe(take(1)).toPromise();
    const cartItems = this.cartService.getCurrentCart(); // 从 BehaviorSubject 获取最新值

    if (cartItems.length === 0 || !totalPrice) {
        console.warn('Cart is empty, cannot checkout.');
        this.isModalOpen = false;
        return;
    }

    try {
      // 调用 OrderService 提交到 Firestore
      const orderId = await this.orderService.submitOrder({
          items: cartItems,
          totalPrice: totalPrice
      });

      // 提交成功后：
      this.cartService.clearCart(); // 清空本地购物车
      this.isModalOpen = false;     // 关闭模态框

      // 跳转到成功页面
      this.router.navigate(['/order/success'], { queryParams: { id: orderId } });

    } catch (error) {
      console.error('Order submission failed:', error);
      // TODO: 显示错误消息给用户
      this.isModalOpen = false;
    }
  }

  // 取消订单/关闭模态框
  cancelOrder(): void {
    this.isModalOpen = false;
  }
}