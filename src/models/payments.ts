export interface PaymentVoucher {
    idPaymentVoucher: number
    operationNumber: string
    note: string
    creationDate: string
    nameMethodTipoPago: string
    base64: string
    [key: string]: any;
}

export interface Payments {
    idPayment: number,
    idSuscription: number
    quoteDescription: string
    nextExpiration: string
    verifText: string
    payDate: string
    totalPay: number
    paymentVouchers: PaymentVoucher[]
    [key: string]: any;
}

export interface PaymentValidation {
    IdSuscription: number;
    ListIdPaymentsValidate: number[];
    IsAcceptedPayment: number;
    ReasonRejection: {
        id: number;
        Detalle: string;
    };
}

export interface ValidatePaymentResponse {
    status: number
    description: string
    objModel: any
}
