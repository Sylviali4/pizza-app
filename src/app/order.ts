// This is order service for submitting orders to Firestore

import { Injectable, inject } from '@angular/core';
// 导入 Firestore 相关的模块
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Order } from './models/menu.model'; // 导入 Order 模型

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // 注入 Firestore
  private firestore = inject(Firestore);

  // 获取 'orders' 集合的引用
  private ordersCollection = collection(this.firestore, 'orders');

  constructor() { }

  /**
   * 提交订单到 Firestore (AJ2Q: 使用 async/await 处理 Promises)
   * @param orderData 包含 items 和 totalPrice 的订单数据
   * @returns Promise<string> 成功提交后返回新订单的 ID
   */
  // Omit<Order, 'timestamp' | 'userId'> 表示传入的数据不包含 timestamp 和 userId，
  // 这两个字段将在 Service 内部生成。
  async submitOrder(orderData: Omit<Order, 'timestamp' | 'userId'>): Promise<string> {
    try {
      const orderToSend = {
          ...orderData,
          timestamp: new Date(), // 使用当前时间作为订单时间
          // 临时生成一个用户ID
          userId: 'guest_' + Math.random().toString(36).substring(2)
      };

      // 使用 addDoc 将数据写入 Firestore
      const docRef = await addDoc(this.ordersCollection, orderToSend);

      console.log(" Your order has been placed! Order ID: ", docRef.id);
      return docRef.id; // 返回新订单的 ID，供 Success Page 使用

    } catch (error) {
      console.error("Failed to submit the order to Firestore.", error);
      // 抛出错误以供组件处理 Reject (AJ2Q)
      throw error;
    }
  }
}