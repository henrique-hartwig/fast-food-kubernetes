export class Order {
    constructor(
      public id: number,
      public items: { id: number; quantity: number; }[],
      public total: number,
      public status: 'received' | 'in_preparation' | 'ready' | 'finished',
      public userId?: number,
    ) {}
  }
