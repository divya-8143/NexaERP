import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { CreatePurchaseOrderInput } from '@nexaerp/shared';
import { generatePONumber } from '../../utils/sequenceGenerator';
import { calculateOrderTotals } from '../../utils/calculateOrderTotals';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class PurchaseOrderService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const status = query.status as string | undefined;
    const supplierId = query.supplierId as string | undefined;
    const search = query.search as string | undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (supplierId) where.supplierId = supplierId;
    if (search) where.poNumber = { contains: search, mode: 'insensitive' };

    const [orders, total] = await Promise.all([
      prisma.purchaseOrder.findMany({
        where,
        include: { supplier: true, createdBy: { select: { firstName: true, lastName: true } }, _count: { select: { items: true } } },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.purchaseOrder.count({ where }),
    ]);

    return createPaginatedResponse(orders, total, params);
  }

  async getById(id: string) {
    const order = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        supplier: true,
        items: { include: { product: true } },
        goodsReceipts: { include: { items: true } },
        createdBy: { select: { firstName: true, lastName: true, email: true } },
        approvedBy: { select: { firstName: true, lastName: true } },
      },
    });
    if (!order) throw new NotFoundError('Purchase Order');
    return order;
  }

  async create(data: CreatePurchaseOrderInput, createdById: string) {
    const supplier = await prisma.supplier.findUnique({ where: { id: data.supplierId } });
    if (!supplier) throw new NotFoundError('Supplier');

    const totals = calculateOrderTotals(
      data.items.map(i => ({ quantity: i.orderedQuantity, unitPrice: i.unitPrice, discount: i.discount, taxRate: i.taxRate })),
      data.shippingCost
    );

    const poNumber = await generatePONumber();

    return prisma.purchaseOrder.create({
      data: {
        poNumber,
        supplierId: data.supplierId,
        expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : undefined,
        subtotal: totals.subtotal,
        taxAmount: totals.taxAmount,
        shippingCost: totals.shippingCost,
        totalAmount: totals.totalAmount,
        notes: data.notes,
        termsAndConditions: data.termsAndConditions,
        createdById,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            description: item.description,
            orderedQuantity: item.orderedQuantity,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate || 0,
            discount: item.discount || 0,
            totalAmount: item.orderedQuantity * item.unitPrice * (1 - (item.discount || 0) / 100) * (1 + (item.taxRate || 0) / 100),
          })),
        },
      },
      include: { supplier: true, items: { include: { product: true } } },
    });
  }

  async updateStatus(id: string, status: string, userId: string) {
    const order = await this.getById(id);
    const validTransitions: Record<string, string[]> = {
      DRAFT: ['SENT', 'CANCELLED'],
      SENT: ['PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED'],
      PARTIALLY_RECEIVED: ['RECEIVED', 'CLOSED'],
      RECEIVED: ['CLOSED'],
    };

    if (!validTransitions[order.status]?.includes(status)) {
      throw new AppError(`Cannot transition from ${order.status} to ${status}`, 400);
    }

    const updateData: Record<string, unknown> = { status: status as any };
    if (status === 'SENT') {
      updateData.approvedById = userId;
      updateData.approvedAt = new Date();
    }

    return prisma.purchaseOrder.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    const order = await this.getById(id);
    if (order.status !== 'DRAFT') throw new AppError('Only draft orders can be deleted', 400);
    return prisma.purchaseOrder.delete({ where: { id } });
  }
}

export const purchaseOrderService = new PurchaseOrderService();