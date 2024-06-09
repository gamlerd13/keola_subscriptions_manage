import { Component, OnInit} from '@angular/core';
import SubscriptionService from './services/suscriptions.service'
import { CommonModule } from '@angular/common'; //fm


@Component({
  selector: 'app-suscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suscriptions.component.html',
  styleUrl: './suscriptions.component.css'
})
export class SuscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  loading: boolean = true


  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    const DEFAULT_USER_ID: number = 12853
    this.subscriptionService.getSubscription(DEFAULT_USER_ID)
      .subscribe(
        (subscriptions) => {
          this.subscriptions = subscriptions;
          this.loading = false
        },
        (error) => {
          console.error('Error fetching subscriptions:', error);
        }
      );
  }
}
