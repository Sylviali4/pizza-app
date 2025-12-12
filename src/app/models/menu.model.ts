//This file 定义了披萨、饮料、配菜以及购物车项目 (CartItem) 的数据结构，这样 CartService 和 OrderService 才知道如何处理数据。

// 基础选项结构 (大小/外壳等)
export interface Option {
  name: string;
  priceAdjustment: number; // 价格调整 (例如：大号 +$2)
}

// 菜单项的基础结构 (披萨、饮料、配菜都继承它)
export interface MenuItem {
  id: string;
  name: string;
  type: 'pizza' | 'drink' | 'side'; // 区分类型
  basePrice: number; // 基础价格
  description: string;
  image: string;
}

// Pizza 特定模型
export interface Pizza extends MenuItem {
  type: 'pizza';
  flavors: string[]; // 可选择的口味 (例如: Hawaiian, Pepperoni)
  sizes: Option[]; // 可选择的大小
  crusts: Option[]; // 可选择的外壳
}

// Drink 特定模型
export interface Drink extends MenuItem {
    type: 'drink';
    sizes: Option[];
}

// Side 特定模型
export interface Side extends MenuItem {
    type: 'side';
    sizes: Option[];
}

// 购物车项目的结构（用户添加到购物车中的定制项）
export interface CartItem {
  itemId: string;        // 菜单项的 ID (用于唯一标识)
  tempId: string;        // 临时 ID，用于在购物车中区分同类定制项
  name: string;          // 名称
  type: 'pizza' | 'drink' | 'side';
  quantity: number;
  selectedFlavor?: string; // 仅 Pizza 需要
  selectedSize: string;    // 选择的大小名称
  selectedCrust?: string;  // 仅 Pizza 需要
  unitPrice: number;     // 该定制项的最终单价
  totalPrice: number;    // 单价 * 数量
  image?: string;        // 商品图片路径
}

// 订单模型的结构 (用于提交到 Firestore)
export interface Order {
  orderId?: string; // Firestore ID
  userId: string;   // 用户标识（可以是 Session ID）
  timestamp: Date;
  items: CartItem[];
  totalPrice: number;
}