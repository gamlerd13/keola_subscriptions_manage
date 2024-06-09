import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import PaymentDetailService from './services/payments.service';
import ValidatePaymentService from './services/validatePayment.service';
import { PaymentValidation, ValidatePaymentResponse } from '../../../models/payments'

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  detailPayment: any = {};
  mensaje: string = ""

  constructor(
    private route: ActivatedRoute,
    private paymentDetailService: PaymentDetailService,
    private validatePaymentService: ValidatePaymentService) { }


  ngOnInit(): void {
    this.getDetailSubscription();
  }

  getDetailSubscription(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id){
      this.paymentDetailService.getDetailPayment(id)
        .subscribe(
          (payment) => {
            this.detailPayment = payment;
          },
          (error) => {
            console.error('Error fetching subscriptions:', error);
          }
        );
    }
    }


    validatePayment(accept: boolean, idPayment: number, idSubscription:number): void {
      const IS_ACCEPTED_PAYMEMT = accept ? 1 : 0
      const ID_REASON_REJECTION = accept ? 285947 : 1
      const DETAIL_REASON_REJECTION = accept ? "": "EL CÓDIGO DE OPERACIÓN ES INCORRECTO O NO EXISTE"

      const params: PaymentValidation = {
        "IdSuscription": idSubscription,
        "ListIdPaymentsValidate": [
          idPayment
        ],
        "IsAcceptedPayment": IS_ACCEPTED_PAYMEMT,
        "ReasonRejection": {
        "id": ID_REASON_REJECTION,
        "Detalle": DETAIL_REASON_REJECTION
        }
        }

      console.log(accept, idPayment, idSubscription);

      this.validatePaymentService.validate(params).subscribe(
        (response: ValidatePaymentResponse) => {
          if (response.status === 0) {
            console.error('Error response from API:', response.description);
            this.mensaje = response.description
            this.hideMensaje()
          } else {
            console.log('Éxito:', response);
            this.mensaje = "Operación existosa"
            this.hideMensaje()
          }
        },
        (error) => {
          console.error('Unexpected error:', error);
        }
    )}

    hideMensaje (){
      setTimeout(() => {
        this.mensaje = "";
      }, 4000);
    }
}
