
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss'
})
export class OrderSuccessComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // J4Q: get order ID from route parameters and store it in a public property
  public orderId: string | null = null;

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map(params => params['id'])
      )
      .subscribe(id => {
        this.orderId = id;
      });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}