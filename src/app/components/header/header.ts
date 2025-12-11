import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common'; // 需要 CommonModule 来使用 async 管道
import { Router } from '@angular/router';
import { CartService } from '../../cart'; // 引入 CartService

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})


export class Header {

  private router = inject(Router);
  // 注入 CartService
  public cartService = inject(CartService);

  // 使用 CartService 中的 cartCount$ Observable 来显示数量
  public cartCount$ = this.cartService.cartCount$;

  constructor() {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}