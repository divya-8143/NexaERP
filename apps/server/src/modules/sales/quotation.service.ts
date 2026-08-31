import { prisma } from '../../lib/prisma';
import { NotFoundError } from '../../lib/errors';
import { CreateQuotationInput } from '@nexaerp/shared';
import { generateQuoteNumber } from '../../utils/sequenceGenerator';
import { calculateOrderTotals } from '../../utils/calculateOrderTotals';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class QuotationService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const [quotations, total] = await Promise.all([
      prisma.quotation.findMany({
        include: { customer: true, _count: { select: { items: true } } },
        orderBy: { createdAt: 'desc' },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.quotation.count(),
    ]);
    return createPaginatedResponse(quotations, total, params);
  }

  async getById(id: string) {
    const q = await prisma.quotation.findUnique({
      where: { id },
      include: { customer: true, items: { include: { quotation: false } } },
    });
    if (!q) throw new NotFoundError('Quotation');
    return q;
  }

  async create(data: CreateQuotationInput, createdById: string) {
    const customer = await prisma.customer.findUnique({ where: { id: data.customerId } });
    if (!customer) throw new NotFoundError('Customer');

    const totals = calculateOrderTotals(
      data.items.map(i => ({ quantity: i.quantity, unitPrice: i.unitPrice, discount: i.discount, taxRate: i.taxRate }))
    );
    const quoteNumber = await generateQuoteNumber();

    return prisma.quotation.create({
      data: {
        quoteNumber,
        customerId: data.customerId,
        validUntil: new Date(data.validUntil),
        subtotal: totals.subtotal,
        totalAmount: totals.totalAmount,
        notes: data.notes,
        createdById,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: item.discount || 0,
            taxRate: item.taxRate || 0,
            totalAmount: item.quantity * item.unitPrice * (1 - (item.discount || 0) / 100) * (1 + (item.taxRate || 0) / 100),
          })),
        },
      },
      include: { customer: true },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.getById(id);
    return prisma.quotation.update({ where: { id }, data: { status: status as 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' } });
  }
}

export const quotationService = new QuotationService();