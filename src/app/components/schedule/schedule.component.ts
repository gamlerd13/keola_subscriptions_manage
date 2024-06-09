import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import ScheduleService from './services/schedule.service'
import { ActivatedRoute } from '@angular/router';
import { Payments, PaymentVoucher } from '../../../models/payments'



@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{
  scheduleList: Payments[] = [];
  isModalOpen = false;
  currentVouchers: any[] = [];
  idSusbcription: string | null = ""
  loading: boolean = true

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getScheduleService();
    this.idSusbcription = this.route.snapshot.paramMap.get('id');
  }

  getScheduleService(): void {

    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id){
      console.log(id);
      this.scheduleService.getListSchedule(id)
        .subscribe(
          (schedule) => {
            this.scheduleList = schedule;
            this.loading = false
          },
          (error) => {
            console.error('Error fetching subscriptions:', error);
          }
        );
    }
    }
  
  openModal(vouchers: any[]) {
    this.currentVouchers = vouchers;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentVouchers = [];
  }
}

