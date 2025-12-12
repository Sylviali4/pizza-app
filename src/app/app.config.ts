// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// 导入 Firebase 和 Firestore 相关的 providers
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// -----------------------------------------------------------------------
// 👇 您的实际 Firebase 配置 (从控制台复制) 👇
// -----------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCvMWQl4PAvOqINb_y1VLBM39MO0mJ0X4E",
  authDomain: "pizza-app-e3b17.firebaseapp.com",
  projectId: "pizza-app-e3b17",
  storageBucket: "pizza-app-e3b17.firebasestorage.app",
  messagingSenderId: "268361802118",
  appId: "1:268361802118:web:50f4c266573407c1a14c07"
};


export const appConfig: ApplicationConfig = {
  providers: [
    // 基础配置
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // -----------------------------------------------------------------------
    // 👇 Firebase 和 Firestore 配置
    // -----------------------------------------------------------------------

    // 1. 初始化 Firebase 应用程序
    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    // 2. 提供 Firestore 服务 (这就是您的 OrderService 将连接的数据源)
    provideFirestore(() => getFirestore()),
  ]
};