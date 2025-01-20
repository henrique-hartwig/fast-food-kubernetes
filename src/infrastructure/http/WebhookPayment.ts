import { PaymentService } from '../../application/services/PaymentService';
import { OrderService } from '../../application/services/OrderService';


export class WebhookController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  async handlePaymentWebhook(req: any, res: any) {
    try {
      const signature = req.headers['x-webhook-signature'];
      // Implementar verificação de assinatura aqui
      
      const { status, order_id } = req.body;
      
      // Atualizar status do pagamento
      await this.paymentService.updatePaymentStatus(order_id, status);

      // Atualizar status do pedido baseado no pagamento
      if (status === 'paid') {
        await this.orderService.updateOrderStatus(order_id, 'received');
      } else if (status === 'cancelled') {
        await this.orderService.updateOrderStatus(order_id, 'cancelled');
      }

      return res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({ error: 'Error processing webhook' });
    }
  }
}