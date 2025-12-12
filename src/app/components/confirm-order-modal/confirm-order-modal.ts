// src/app/components/confirm-order-modal/confirm-order-modal.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-order-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-order-modal.html',
  styleUrl: './confirm-order-modal.scss'
})
export class ConfirmOrderModal {

    // 定义两个输出事件 (API 接口)
    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm(): void {
        this.confirm.emit();
    }

    onCancel(): void {
        this.cancel.emit();
    }
}