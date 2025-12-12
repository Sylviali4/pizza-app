import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart';
import { CartItem } from '../../models/menu.model';

// SLO Q1 - clean code with good indentation, naming, and comments
interface PizzaOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

@Component({
  selector: 'app-customize-pizza',
  imports: [CommonModule, FormsModule],
  templateUrl: './customize-pizza.html',
  styleUrl: './customize-pizza.scss',
})
export class CustomizePizza implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public cartService = inject(CartService);

  pizzaOptions: PizzaOption[] = [
    { id: 'margarita', name: 'Margarita (Cheese)', description: 'Mozzarella, tomato sauce, fresh basil.', basePrice: 8.00, image: '/images/pizza_br.png' },
    { id: 'pepperoni', name: 'Pepperoni', description: 'Pepperoni, mozzarella, tomato sauce.', basePrice: 10.00, image: '/images/pizza_bl.png' },
    { id: 'hawaiian', name: 'Hawaiian', description: 'Ham, pineapple, mozzarella.', basePrice: 11.00, image: '/images/pizza_tl.png' },
    { id: 'meatlovers', name: 'Meatlovers', description: 'Pepperoni, sausage, bacon, beef.', basePrice: 12.00, image: '/images/pizza_tr.png' },
    { id: 'bacon_lettuce', name: 'Bacon & Lettuce', description: 'Crispy bacon with fresh lettuce.', basePrice: 10.50, image: '/images/bacon_lettecs.jpg' },
    { id: 'chicken_ranch', name: 'Chicken Ranch', description: 'Grilled chicken with ranch sauce.', basePrice: 11.50, image: '/images/chicken_ranch.jpg' },
    { id: 'veggie', name: 'Veggie', description: 'Fresh vegetables and herbs.', basePrice: 9.50, image: '/images/veggie.jpg' },
    { id: 'pepper', name: 'Pepper', description: 'Mixed peppers with spices.', basePrice: 9.00, image: '/images/pepper.jpg' },
    { id: 'cheese', name: 'Classic Cheese', description: 'Simple mozzarella cheese pizza.', basePrice: 8.00, image: '/images/cheese_pizza.jpg' },
    { id: 'steak', name: 'Steak', description: 'Premium steak slices.', basePrice: 13.00, image: '/images/steak.jpg' },
    { id: 'durian', name: 'Durian Special', description: 'Unique durian flavor pizza.', basePrice: 12.50, image: '/images/durian.jpg' },
    { id: 'mushroom', name: 'Mushroom', description: 'Fresh mushrooms and herbs.', basePrice: 9.50, image: '/images/mushroom.jpg' }
  ];

  selectedPizza: PizzaOption = this.pizzaOptions[0];
  selectedPizzaId: string = this.pizzaOptions[0].id;
  selectedSize: string = 'small';
  selectedCrust: string = 'regular';
  quantity: number = 1;

  sizeOptions = [
    { value: 'small', label: 'Small', price: 0 },
    { value: 'medium', label: 'Medium (+$1)', price: 1 },
    { value: 'large', label: 'Large (+$2)', price: 2 }
  ];

  crustOptions = [
    { value: 'thin', label: 'Thin (+$1)', price: 1 },
    { value: 'regular', label: 'Regular', price: 0 },
    { value: 'thick', label: 'Thick (+$1)', price: 1 }
  ];

  // SLO J7 - closure
  /**
   * J7: Closure - creates a price calculator that remembers the pizza option
   * 闭包示例：创建一个记住特定pizza选项的价格计算器
   * This demonstrates how closures can encapsulate state and create specialized functions
   */
  createPriceCalculator() {
    // The outer function captures the current selectedPizza in its scope
    const basePizza = this.selectedPizza;
    const sizeOpts = this.sizeOptions;
    const crustOpts = this.crustOptions;

    // J7: This inner function is a closure - it "closes over" the variables above
    // 这个内部函数就是闭包 - 它"封闭"了上面的变量，即使外部函数已经返回，这些变量仍然可以访问
    return (size: string, crust: string, qty: number) => {
      const sizePrice = sizeOpts.find(s => s.value === size)?.price || 0;
      const crustPrice = crustOpts.find(c => c.value === crust)?.price || 0;
      return (basePizza.basePrice + sizePrice + crustPrice) * qty;
    };
  }

  // 页面加载时从URL参数获取pizza ID
  ngOnInit() {
    const pizzaId = this.route.snapshot.paramMap.get('id');
    if (pizzaId) {
      const pizza = this.pizzaOptions.find(p => p.id === pizzaId);
      if (pizza) {
        this.selectedPizza = pizza;
        this.selectedPizzaId = pizza.id;
      }
    }
  }

  // SLO J5Q - short-circuit && and ternary operator
  // 计算单价：基础价格加上尺寸和饼皮的额外费用
  get unitPrice(): number {
    const sizePrice = this.sizeOptions.find(s => s.value === this.selectedSize)?.price || 0;
    const crustPrice = this.crustOptions.find(c => c.value === this.selectedCrust)?.price || 0;
    return this.selectedPizza.basePrice + sizePrice + crustPrice;
  }

  get subtotal(): number {
    return this.unitPrice * this.quantity;
  }

  // 根据选择的ID更新pizza对象
  onPizzaChange() {
    const pizza = this.pizzaOptions.find(p => p.id === this.selectedPizzaId);
    if (pizza) {
      this.selectedPizza = pizza;
    }
  }

  addToCart() {
    // J7: Use the closure to calculate price - demonstrates practical closure usage
    // 使用闭包计算价格 - 展示闭包的实际应用
    const priceCalculator = this.createPriceCalculator();
    const calculatedTotal = priceCalculator(this.selectedSize, this.selectedCrust, this.quantity);

    const cartItem: CartItem = {
      itemId: this.selectedPizza.id,
      tempId: '', // cart service makes a unique id for this
      name: this.selectedPizza.name,
      type: 'pizza',
      quantity: this.quantity,
      selectedSize: this.selectedSize,
      selectedCrust: this.selectedCrust,
      unitPrice: this.unitPrice,
      totalPrice: calculatedTotal, // using closure's calculated price
      image: this.selectedPizza.image
    };

    this.cartService.addToCart(cartItem);
    alert(`Added ${this.quantity} x ${this.selectedPizza.name} to cart!`);
    this.router.navigate(['/cart']);
  }

  resetForm() {
    this.selectedSize = 'small';
    this.selectedCrust = 'regular';
    this.quantity = 1;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
