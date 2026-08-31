import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { CreateSalesOrderInput } from '@nexaerp/shared';
import { generateSONumber } from '../../utils/sequenceGenerator';
import { calculateOrderTotals } from '../../utils/calculateOrderTotals';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class SalesOrderService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const status = query.status as string | undefined;
    const customerId = query.customerId as string | undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (customerId) where.customerId = customerId;

    const [orders, total] = await Promise.all([
      prisma.salesOrder.findMany({
        where,
        include: { customer: true, createdBy: { select: { firstName: true, lastName: true } }, _count: { select: { items: true } } },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.salesOrder.count({ where }),
    ]);

    return createPaginatedResponse(orders, total, params);
  }

  async getById(id: string) {
    const order = await prisma.salesOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
        invoices: true,
        createdBy: { select: { firstName: true, lastName: true, email: true } },
      },
    });
    if (!order) throw new NotFoundError('Sales Order');
    return order;
  }

  async create(data: CreateSalesOrderInput, createdById: string) {
    const customer = await prisma.customer.findUnique({ where: { id: data.customerId } });
    if (!customer) throw new NotFoundError('Customer');

    for (const item of data.items) {
      const inventory = await prisma.inventory.findUnique({ where: { productId: item.productId } });
      if (!inventory) throw new AppError(`Product ${item.productId} has no inventory record`, 400);
      const available = Number(inventory.quantityOnHand) - Number(inventory.quantityReserved);
      if (available < item.quantity) {
        const product = await prisma.product.findUnique({ where: { id: item.productId }, select: { name: true } });
        throw new AppError(`Insufficient stock for product: ${product?.name}. Available: ${available}`, 400);
      }
    }

    const totals = calculateOrderTotals(
      data.items.map(i => ({ quantity: i.quantity, unitPrice: i.unitPrice, discount: i.discount, taxRate: i.taxRate })),
      data.shippingCost
    );

    const orderNumber = await generateSONumber();

    return prisma.$transaction(async (tx: any) => {
      const order = await tx.salesOrder.create({
        data: {
          orderNumber,
          customerId: data.customerId,
          expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : undefined,
          subtotal: totals.subtotal,
          discountAmount: totals.discountAmount,
          taxAmount: totals.taxAmount,
          shippingCost: totals.shippingCost,
          totalAmount: totals.totalAmount,
          shippingAddress: data.shippingAddress,
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
        include: { customer: true, items: { include: { product: true } } },
      });

      for (const item of data.items) {
        await tx.inventory.update({
          where: { productId: item.productId },
          data: { quantityReserved: { increment: item.quantity } },
        });
      }

      return order;
    });
  }

  async updateStatus(id: string, status: string, _userId: string) {
    const order = await this.getById(id);
    const validTransitions: Record<string, string[]> = {
      DRAFT: ['PENDING', 'CANCELLED'],
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['PROCESSING', 'CANCELLED'],
      PROCESSING: ['SHIPPED', 'CANCELLED'],
      SHIPPED: ['DELIVERED', 'RETURNED'],
      DELIVERED: ['RETURNED'],
    };

    if (!validTransitions[order.status]?.includes(status)) {
      throw new AppError(`Cannot transition from ${order.status} to ${status}`, 400);
    }

    return prisma.$transaction(async (tx: any) => {
      const updated = await tx.salesOrder.update({
        where: { id },
        data: {
          status: status as any,
          actualDeliveryDate: status === 'DELIVERED' ? new Date() : undefined,
        },
      });

      if (status === 'SHIPPED') {
        for (const item of order.items) {
          const inventory = await tx.inventory.findUnique({ where: { productId: item.productId } });
          if (inventory) {
            const newQty = Number(inventory.quantityOnHand) - Number(item.quantity);
            await tx.inventory.update({
              where: { productId: item.productId },
              data: {
                quantityOnHand: newQty,
                quantityReserved: { decrement: Number(item.quantity) },
              },
            });
            await tx.stockMovement.create({
              data: {
                productId: item.productId,
                type: 'OUT',
                quantity: Number(item.quantity),
                previousQuantity: Number(inventory.quantityOnHand),
                newQuantity: newQty,
                referenceType: 'SALES_ORDER',
                referenceId: id,
                createdById: _userId,
              },
            });
          }
        }
      }

      if (status === 'CANCELLED') {
        for (const item of order.items) {
          await tx.inventory.update({
            where: { productId: item.productId },
            data: { quantityReserved: { decrement: Number(item.quantity) } },
          });
        }
      }

      return updated;
    });
  }
}

export const salesOrderService = new SalesOrderService();