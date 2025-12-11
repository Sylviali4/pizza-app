import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CustomizePizza } from './pages/customize-pizza/customize-pizza';
import { Drinks } from './pages/drinks/drinks';
import { Sides } from './pages/sides/sides';
import { CartPage } from './pages/cart-page/cart-page';
import { OrderSuccess } from './pages/order-success/order-success';

export const routes: Routes = [
    // home
    { path: '', component: Home, title: 'Pizza App | Home' },

    // menu customization pages
    { path: 'customize/:id', component: CustomizePizza, title: 'Pizza App | Customize Pizza' },
    { path: 'drinks', component: Drinks, title: 'Pizza App | Drinks' },
    { path: 'sides', component: Sides, title: 'Pizza App | Sides' },

    // cart and order success
    { path: 'cart', component: CartPage, title: 'Pizza App | Cart' },
    { path: 'order/success', component: OrderSuccess, title: 'Pizza App | Order Success' },

    // default redirect to home page
    { path: '**', redirectTo: '', pathMatch: 'full' }
];