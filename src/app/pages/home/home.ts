import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Main pizza flavors (显示在中间大圆形的4个部分)
  mainFlavors = [
    { id: 'hawaiian', name: 'Hawaiian', image: 'images/pizza_tl.png', position: 'top-left' },
    { id: 'meatlovers', name: 'Meatlovers', image: 'images/pizza_tr.png', position: 'top-right' },
    { id: 'pepperoni', name: 'Pepperoni', image: 'images/pizza_bl.png', position: 'bottom-left' },
    { id: 'margarita', name: 'Margarita', image: 'images/pizza_br.png', position: 'bottom-right' }
  ];

  // Small pizza wheels (每个用4个不同口味拼成)
  smallPizzas = [
    {
      id: 'pizza1',
      name: 'Cheese',
      slices: [
        { position: 'tl', image: '/images/bacon_lettecs.jpg', flavorId: 'bacon_lettuce' },
        { position: 'tr', image: '/images/chicken_ranch.jpg', flavorId: 'chicken_ranch' },
        { position: 'bl', image: '/images/veggie.jpg', flavorId: 'veggie' },
        { position: 'br', image: '/images/pepper.jpg', flavorId: 'pepper' }
      ]
    },
    {
      id: 'pizza2',
      name: 'Veggie',
      slices: [
        { position: 'tl', image: '/images/cheese_pizza.jpg', flavorId: 'cheese' },
        { position: 'tr', image: '/images/steak.jpg', flavorId: 'steak' },
        { position: 'bl', image: '/images/durian.jpg', flavorId: 'durian' },
        { position: 'br', image: '/images/mushroom.jpg', flavorId: 'mushroom' }
      ]
    },
    {
      id: 'pizza3',
      name: 'Bacon',
      slices: [
        { position: 'tl', image: '/images/bacon_lettecs.jpg', flavorId: 'bacon_lettuce' },
        { position: 'tr', image: '/images/chicken_ranch.jpg', flavorId: 'chicken_ranch' },
        { position: 'bl', image: '/images/veggie.jpg', flavorId: 'veggie' },
        { position: 'br', image: '/images/pepper.jpg', flavorId: 'pepper' }
      ]
    },
    {
      id: 'pizza4',
      name: 'Mushroom',
      slices: [
        { position: 'tl', image: '/images/cheese_pizza.jpg', flavorId: 'cheese' },
        { position: 'tr', image: '/images/steak.jpg', flavorId: 'steak' },
        { position: 'bl', image: '/images/durian.jpg', flavorId: 'durian' },
        { position: 'br', image: '/images/mushroom.jpg', flavorId: 'mushroom' }
      ]
    }
  ];

  pizzas: any[] = [
    {
      id: 'veggie',
      name: 'Veggie Pizza',
      type: 'pizza',
      basePrice: 12.99,
      description: 'Fresh vegetables with cheese',
      image: 'assets/images/veggie-pizza.png',
      flavors: ['Classic Veggie', 'Mediterranean'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'meat',
      name: 'Meat Lovers',
      type: 'pizza',
      basePrice: 14.99,
      description: 'Loaded with premium meats',
      image: 'assets/images/meat-pizza.png',
      flavors: ['BBQ Meat', 'Traditional Meat'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'mushroom',
      name: 'Mushroom Pizza',
      type: 'pizza',
      basePrice: 11.99,
      description: 'Fresh mushrooms and cheese',
      image: 'assets/images/mushroom-pizza.png',
      flavors: ['Classic Mushroom', 'Truffle Mushroom'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'durian',
      name: 'Durian Pizza',
      type: 'pizza',
      basePrice: 15.99,
      description: 'Unique durian flavor for adventurous taste',
      image: 'assets/images/durian-pizza.png',
      flavors: ['Sweet Durian', 'Durian Cheese'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'chicken',
      name: 'Chicken Ranch',
      type: 'pizza',
      basePrice: 13.99,
      description: 'Grilled chicken with ranch sauce',
      image: 'assets/images/chicken-pizza.png',
      flavors: ['Classic Ranch', 'BBQ Chicken'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'jalapeno',
      name: 'Jalapeño Fiesta',
      type: 'pizza',
      basePrice: 12.99,
      description: 'Spicy jalapeños with cheese',
      image: 'assets/images/jalapeno-pizza.png',
      flavors: ['Spicy Jalapeño', 'Mild Pepper'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'bacon',
      name: 'Bacon Deluxe',
      type: 'pizza',
      basePrice: 14.99,
      description: 'Crispy bacon and cheese',
      image: 'assets/images/bacon-pizza.png',
      flavors: ['Classic Bacon', 'Maple Bacon'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    },
    {
      id: 'cheese',
      name: 'Classic Cheese',
      type: 'pizza',
      basePrice: 10.99,
      description: 'Simple and delicious cheese pizza',
      image: 'assets/images/cheese-pizza.png',
      flavors: ['Mozzarella', 'Four Cheese'],
      sizes: [
        { name: 'Small', priceAdjustment: 0 },
        { name: 'Medium', priceAdjustment: 3 },
        { name: 'Large', priceAdjustment: 5 }
      ],
      crusts: [
        { name: 'Thin Crust', priceAdjustment: 0 },
        { name: 'Regular', priceAdjustment: 0 },
        { name: 'Thick Crust', priceAdjustment: 2 }
      ]
    }
  ];

  constructor(private router: Router) {}

  // 点击主披萨区域的某个口味
  selectMainFlavor(flavor: any) {
    this.router.navigate(['/customize', flavor.id]);
  }

  // 点击侧边的更多口味
  selectMoreFlavor(flavor: any) {
    this.router.navigate(['/customize', flavor.id]);
  }

  // 点击小pizza的单个切片
  selectSlice(slice: any) {
    this.router.navigate(['/customize', slice.flavorId]);
  }

  // 导航到 Sides 页面
  goToSides() {
    this.router.navigate(['/sides']);
  }

  // 导航到 Drinks 页面
  goToDrinks() {
    this.router.navigate(['/drinks']);
  }
}
