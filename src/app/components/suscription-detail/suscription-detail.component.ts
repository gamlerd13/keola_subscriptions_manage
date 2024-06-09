import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import SuscriptionDetailService  from './services/suscription-detail.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suscription-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suscription-detail.component.html',
  styleUrl: './suscription-detail.component.css'
})
export class SuscriptionDetailComponent implements OnInit {
  subscription: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private subscriptionDetailService: SuscriptionDetailService) { }

  ngOnInit(): void {
    this.getDetailSubscription();
  }

  getDetailSubscription(): void {

    // const id = +this.route.snapshot.paramMap.get('id');
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id){
      this.subscriptionDetailService.getDetailSubscription(id)
        .subscribe(
          (subscription) => {
            this.subscription = subscription;
          },
          (error) => {
            console.error('Error fetching subscriptions:', error);
          }
        );
    }
    }
   
}
