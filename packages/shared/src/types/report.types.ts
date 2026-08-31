export interface DashboardKPI {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  totalOrders: number;
  pendingOrders: number;
  totalInventoryValue: number;
  lowStockItems: number;
  totalCustomers: number;
  activeSuppliers: number;
  totalEmployees: number;
  pendingInvoices: number;
  revenueGrowth: number;
  expenseGrowth: number;
}

export interface RevenueDataPoint {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export interface TopCustomer {
  customerId: string;
  customerName: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface InventorySummary {
  totalProducts: number;
  totalInventoryValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  categoryBreakdown: Array<{ category: string; count: number; value: number }>;
}

export interface ProfitLossReport {
  period: string;
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossProfitMargin: number;
  operatingExpenses: number;
  operatingProfit: number;
  otherExpenses: number;
  netProfit: number;
  netProfitMargin: number;
}

export interface AgingReport {
  customerId?: string;
  customerName?: string;
  supplierId?: string;
  supplierName?: string;
  current: number;
  days30: number;
  days60: number;
  days90: number;
  days90Plus: number;
  total: number;
}