export type OrderStatus = 'pending' | 'received' | 'in_preparation' | 'ready' | 'finished';

export class Order {
    constructor(
      public id: number,
      public items: { id: number; quantity: number; }[],
      public total: number,
      public status: OrderStatus,
      public userId?: number,
    ) {}
  }
