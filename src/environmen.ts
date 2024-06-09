interface Environment {
    apiUrl: string
    validate: string
    subscription: string
    subscriptionDetail: string
    schedule: string
    payment: string
}



export const environment: Environment = {
    // POST
    apiUrl: 'https://inclubtest.com:2053/api/token/',
    validate: 'https://inclubtest.com:2053/api/payment/validate',
    // GET
    subscription: 'https://inclubtest.com:2053/api/suscription/payment/',//userId needed
    subscriptionDetail: 'https://inclubtest.com:2053/api/suscription/',//userId needed
    schedule: 'https://inclubtest.com:2053/api/payment/schedule/vouchers/',
    payment: 'https://inclubtest.com:2053/api/payment/'
};
