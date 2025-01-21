export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'billet';

export class Payment {
    constructor(
        public id: number,
        public orderId: number,
        public status: PaymentStatus,
        public paymentMethod: PaymentMethod,
        public amount: number,
    ) {}
}