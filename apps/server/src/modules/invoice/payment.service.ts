import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { RecordPaymentInput } from '@nexaerp/shared';

export class PaymentService {
  async getByInvoice(invoiceId: string) {
    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) throw new NotFoundError('Invoice');
    return prisma.payment.findMany({
      where: { invoiceId },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async create(data: RecordPaymentInput, createdById: string) {
    const invoice = await prisma.invoice.findUnique({ where: { id: data.invoiceId } });
    if (!invoice) throw new NotFoundError('Invoice');
    if (invoice.status === 'PAID' || invoice.status === 'CANCELLED') {
      throw new AppError('Cannot record payment for a paid or cancelled invoice', 400);
    }
    if (data.amount > Number(invoice.balanceDue)) {
      throw new AppError(`Payment amount exceeds balance due (${invoice.balanceDue})`, 400);
    }

    return prisma.$transaction(async (tx: any) => {
      const payment = await tx.payment.create({
        data: {
          invoiceId: data.invoiceId,
          amount: data.amount,
          paymentDate: new Date(data.paymentDate),
          paymentMethod: data.paymentMethod,
          referenceNumber: data.referenceNumber,
          notes: data.notes,
          createdById,
        },
      });

      const newPaidAmount = Number(invoice.paidAmount) + data.amount;
      const newBalanceDue = Number(invoice.totalAmount) - newPaidAmount;
      const newStatus = newBalanceDue <= 0 ? 'PAID' : 'PARTIALLY_PAID';

      await tx.invoice.update({
        where: { id: data.invoiceId },
        data: { paidAmount: newPaidAmount, balanceDue: newBalanceDue, status: newStatus },
      });

      return payment;
    });
  }
}

export const paymentService = new PaymentService();