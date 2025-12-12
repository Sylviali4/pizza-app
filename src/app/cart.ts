
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './models/menu.model';
import { map } from 'rxjs/operators';

// SLO AN9 - separation of view (HTML) from logic and data services
// P5: 用于 localStorage 的键
const CART_STORAGE_KEY = 'pizza_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // 存储购物车项目的私有 BehaviorSubject (应用运行时状态)
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // 暴露给组件订阅的 Observable
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  // SLO J4Q - map/filter/reduce
  // J4Q: 计算购物车总价的 Observable
  public totalPrice$: Observable<number> = this.cartItems$.pipe(
    map(items =>
      items.reduce((total, item) => total + item.totalPrice, 0)
    )
  );

  // J4Q: 计算购物车中项目总数
  public cartCount$: Observable<number> = this.cartItems$.pipe(
    map(items =>
      items.reduce((total, item) => total + item.quantity, 0)
    )
  );

  constructor() {
    // P5: 服务初始化时，尝试从 localStorage 加载数据
    this.loadCartFromLocalStorage();
  }

  // SLO P1 - data persistence with localStorage
  /**
   * P5: 从 localStorage 加载购物车状态
   */
  private loadCartFromLocalStorage(): void {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const items: CartItem[] = JSON.parse(storedCart);
        this.cartItemsSubject.next(items);
      }
    } catch (error) {
      console.error("无法从 localStorage 加载购物车:", error);
      // 如果数据损坏，清除旧数据
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }

  /**
   * P5: 保存当前购物车状态到 localStorage
   */
  private saveCartToLocalStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("无法保存购物车到 localStorage:", error);
    }
  }

  /**
   * 添加项目到购物车
   */
  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;

    // 给新项目一个唯一的临时ID，用于在购物车中进行操作 (例如移除)
    const newItem: CartItem = {
        ...item,
        tempId: Date.now().toString() + Math.random().toString(36).substring(2)
    };

    const updatedItems = [...currentItems, newItem];
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems); // 👈 保存到 localStorage
  }

  /**
   * 从购物车移除项目 (通过 tempId 查找)
   */
  removeItem(tempId: string): void {
    const currentItems = this.cartItemsSubject.value;
    // J4Q: 使用 filter 过滤掉要移除的项目
    const updatedItems = currentItems.filter(item => item.tempId !== tempId);

    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems); // 👈 更新 localStorage
  }

  /**
   * 清空购物车
   */
  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(CART_STORAGE_KEY); // 👈 清除本地存储
  }

  /**
   * 获取当前购物车状态 (用于提交订单)
   */
  getCurrentCart(): CartItem[] {
      return this.cartItemsSubject.value;
  }
}