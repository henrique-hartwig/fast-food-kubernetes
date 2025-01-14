import { Order } from '../../domain/entities/Order';

export interface IOrderRepository {
  save(order: Order): Promise<void>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
