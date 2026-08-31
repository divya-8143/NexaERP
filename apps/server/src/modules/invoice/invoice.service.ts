import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { CreateInvoiceInput } from '@nexaerp/shared';
import { generateInvoiceNumber } from '../../utils/sequenceGenerator';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class InvoiceService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const status = query.status as string | undefined;
    const type = query.type as string | undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: {
          customer: true,
          supplier: true,
          createdBy: { select: { firstName: true, lastName: true } },
          _count: { select: { payments: true } },
        },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.invoice.count({ where }),
    ]);

    return createPaginatedResponse(invoices, total, params);
  }

  async getById(id: string) {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        supplier: true,
        items: true,
        payments: true,
        salesOrder: true,
        purchaseOrder: true,
        createdBy: { select: { firstName: true, lastName: true } },
      },
    });
    if (!invoice) throw new NotFoundError('Invoice');
    return invoice;
  }

  async create(data: CreateInvoiceInput, createdById: string) {
    let subtotal = 0;
    let taxAmount = 0;
    const itemsWithTotals = data.items.map(item => {
      const gross = item.quantity * item.unitPrice;
      const discountAmt = gross * ((item.discount || 0) / 100);
      const afterDiscount = gross - discountAmt;
      const tax = afterDiscount * ((item.taxRate || 0) / 100);
      const total = afterDiscount + tax;
      subtotal += afterDiscount;
      taxAmount += tax;
      return { ...item, totalAmount: total };
    });

    const totalAmount = subtotal + taxAmount;
    const invoiceNumber = await generateInvoiceNumber(data.type);

    return prisma.invoice.create({
      data: {
        invoiceNumber,
        type: data.type,
        customerId: data.customerId,
        supplierId: data.supplierId,
        salesOrderId: data.salesOrderId,
        purchaseOrderId: data.purchaseOrderId,
        issueDate: new Date(data.issueDate),
        dueDate: new Date(data.dueDate),
        subtotal,
        taxAmount,
        totalAmount,
        balanceDue: totalAmount,
        notes: data.notes,
        termsAndConditions: data.termsAndConditions,
        createdById,
        items: {
          create: itemsWithTotals.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: item.discount || 0,
            taxRate: item.taxRate || 0,
            totalAmount: item.totalAmount,
          })),
        },
      },
      include: { items: true, customer: true, supplier: true },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.getById(id);
    return prisma.invoice.update({ where: { id }, data: { status: status as 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'CANCELLED' } });
  }

  async getOverdueInvoices() {
    return prisma.invoice.findMany({
      where: {
        dueDate: { lt: new Date() },
        status: { in: ['SENT', 'PARTIALLY_PAID'] },
      },
      include: { customer: true, supplier: true },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getAgingReport() {
    const now = new Date();
    const invoices = await prisma.invoice.findMany({
      where: { status: { in: ['SENT', 'PARTIALLY_PAID'] }, type: 'SALES' },
      include: { customer: true },
    });

    const agingMap = new Map<string, { customerId: string; customerName: string; current: number; days30: number; days60: number; days90: number; days90Plus: number }>();

    for (const inv of invoices) {
      const daysDue = Math.floor((now.getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24));
      const balance = Number(inv.balanceDue);
      const key = inv.customerId || 'unknown';
      if (!agingMap.has(key)) {
        agingMap.set(key, { customerId: key, customerName: inv.customer?.name || 'Unknown', current: 0, days30: 0, days60: 0, days90: 0, days90Plus: 0 });
      }
      const entry = agingMap.get(key)!;
      if (daysDue <= 0) entry.current += balance;
      else if (daysDue <= 30) entry.days30 += balance;
      else if (daysDue <= 60) entry.days60 += balance;
      else if (daysDue <= 90) entry.days90 += balance;
      else entry.days90Plus += balance;
    }

    return Array.from(agingMap.values()).map(e => ({ ...e, total: e.current + e.days30 + e.days60 + e.days90 + e.days90Plus }));
  }
}

export const invoiceService = new InvoiceService();