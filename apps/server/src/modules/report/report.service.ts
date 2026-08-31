import { prisma } from '../../lib/prisma';
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';

export class ReportService {
  async getDashboardKPIs() {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const [
      totalRevenue,
      lastMonthRevenue,
      totalExpenses,
      lastMonthExpenses,
      totalOrders,
      pendingOrders,
      inventoryValue,
      lowStockCount,
      totalCustomers,
      activeSuppliers,
      totalEmployees,
      pendingInvoices,
    ] = await Promise.all([
      prisma.invoice.aggregate({ where: { type: 'SALES', status: 'PAID', createdAt: { gte: thisMonthStart } }, _sum: { totalAmount: true } }),
      prisma.invoice.aggregate({ where: { type: 'SALES', status: 'PAID', createdAt: { gte: lastMonthStart, lte: lastMonthEnd } }, _sum: { totalAmount: true } }),
      prisma.expense.aggregate({ where: { status: 'PAID', createdAt: { gte: thisMonthStart } }, _sum: { totalAmount: true } }),
      prisma.expense.aggregate({ where: { status: 'PAID', createdAt: { gte: lastMonthStart, lte: lastMonthEnd } }, _sum: { totalAmount: true } }),
      prisma.salesOrder.count({ where: { createdAt: { gte: thisMonthStart } } }),
      prisma.salesOrder.count({ where: { status: { in: ['PENDING', 'CONFIRMED', 'PROCESSING'] } } }),
      prisma.inventory.aggregate({ _sum: { quantityOnHand: true } }),
      prisma.inventory.count({ where: { quantityOnHand: { lte: 10 } } }),
      prisma.customer.count({ where: { isActive: true } }),
      prisma.supplier.count({ where: { status: 'ACTIVE' } }),
      prisma.employee.count({ where: { status: 'ACTIVE' } }),
      prisma.invoice.count({ where: { status: { in: ['SENT', 'PARTIALLY_PAID'] } } }),
    ]);

    const revenue = Number(totalRevenue._sum.totalAmount || 0);
    const prevRevenue = Number(lastMonthRevenue._sum.totalAmount || 0);
    const expenses = Number(totalExpenses._sum.totalAmount || 0);
    const prevExpenses = Number(lastMonthExpenses._sum.totalAmount || 0);

    return {
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit: revenue - expenses,
      profitMargin: revenue > 0 ? ((revenue - expenses) / revenue) * 100 : 0,
      totalOrders,
      pendingOrders,
      totalInventoryValue: Number(inventoryValue._sum.quantityOnHand || 0),
      lowStockItems: lowStockCount,
      totalCustomers,
      activeSuppliers,
      totalEmployees,
      pendingInvoices,
      revenueGrowth: prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0,
      expenseGrowth: prevExpenses > 0 ? ((expenses - prevExpenses) / prevExpenses) * 100 : 0,
    };
  }

  async getRevenueChart(months = 12) {
    const result = [];
    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      const [revenue, expenses] = await Promise.all([
        prisma.invoice.aggregate({ where: { type: 'SALES', status: 'PAID', createdAt: { gte: start, lte: end } }, _sum: { totalAmount: true } }),
        prisma.expense.aggregate({ where: { status: 'PAID', createdAt: { gte: start, lte: end } }, _sum: { totalAmount: true } }),
      ]);

      const rev = Number(revenue._sum.totalAmount || 0);
      const exp = Number(expenses._sum.totalAmount || 0);

      result.push({ period: format(date, 'MMM yyyy'), revenue: rev, expenses: exp, profit: rev - exp });
    }
    return result;
  }

  async getTopProducts(limit = 10) {
    return prisma.$queryRaw`
      SELECT p.id as "productId", p.name as "productName",
             SUM(soi.quantity) as "totalQuantitySold",
             SUM(soi."totalAmount") as "totalRevenue"
      FROM sales_order_items soi
      JOIN products p ON p.id = soi."productId"
      JOIN sales_orders so ON so.id = soi."salesOrderId"
      WHERE so.status IN ('DELIVERED', 'SHIPPED')
      GROUP BY p.id, p.name
      ORDER BY "totalRevenue" DESC
      LIMIT ${limit}
    `;
  }

  async getTopCustomers(limit = 10) {
    return prisma.$queryRaw`
      SELECT c.id as "customerId", c.name as "customerName",
             COUNT(so.id) as "totalOrders",
             SUM(so."totalAmount") as "totalRevenue"
      FROM customers c
      JOIN sales_orders so ON so."customerId" = c.id
      WHERE so.status NOT IN ('CANCELLED', 'DRAFT')
      GROUP BY c.id, c.name
      ORDER BY "totalRevenue" DESC
      LIMIT ${limit}
    `;
  }

  async getProfitLoss(startDate: Date, endDate: Date) {
    const [revenue, cogs, expenses] = await Promise.all([
      prisma.invoice.aggregate({ where: { type: 'SALES', status: 'PAID', issueDate: { gte: startDate, lte: endDate } }, _sum: { totalAmount: true } }),
      prisma.salesOrderItem.aggregate({
        where: { salesOrder: { status: 'DELIVERED', createdAt: { gte: startDate, lte: endDate } } },
        _sum: { totalAmount: true },
      }),
      prisma.expense.aggregate({ where: { status: 'PAID', expenseDate: { gte: startDate, lte: endDate } }, _sum: { totalAmount: true } }),
    ]);

    const rev = Number(revenue._sum.totalAmount || 0);
    const costOfGoods = Number(cogs._sum.totalAmount || 0) * 0.6;
    const grossProfit = rev - costOfGoods;
    const opExpenses = Number(expenses._sum.totalAmount || 0);
    const netProfit = grossProfit - opExpenses;

    return {
      period: `${format(startDate, 'MMM dd, yyyy')} - ${format(endDate, 'MMM dd, yyyy')}`,
      revenue: rev,
      costOfGoodsSold: costOfGoods,
      grossProfit,
      grossProfitMargin: rev > 0 ? (grossProfit / rev) * 100 : 0,
      operatingExpenses: opExpenses,
      operatingProfit: grossProfit - opExpenses,
      otherExpenses: 0,
      netProfit,
      netProfitMargin: rev > 0 ? (netProfit / rev) * 100 : 0,
    };
  }

  async getInventorySummary() {
    const [totalProducts, inventoryValue, lowStock, outOfStock, categories] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.inventory.aggregate({ _sum: { quantityOnHand: true } }),
      prisma.inventory.count({ where: { quantityOnHand: { lte: 10 } } }),
      prisma.inventory.count({ where: { quantityOnHand: 0 } }),
      prisma.category.findMany({
        include: { _count: { select: { products: true } } },
      }),
    ]);

    return {
      totalProducts,
      totalInventoryValue: Number(inventoryValue._sum.quantityOnHand || 0),
      lowStockItems: lowStock,
      outOfStockItems: outOfStock,
      categoryBreakdown: categories.map((c: any) => ({
        category: c.name,
        count: (c._count as Record<string, number>).products,
        value: 0,
      })),
    };
  }
}

export const reportService = new ReportService();