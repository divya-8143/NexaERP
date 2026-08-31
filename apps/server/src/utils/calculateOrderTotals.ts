export interface OrderItemInput {
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxRate?: number;
}

export interface CalculatedOrderTotals {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
}

export function calculateOrderTotals(
  items: OrderItemInput[],
  shippingCost = 0
): CalculatedOrderTotals {
  let subtotal = 0;
  let discountAmount = 0;
  let taxAmount = 0;

  for (const item of items) {
    const gross = item.quantity * item.unitPrice;
    const discount = item.discount ? gross * (item.discount / 100) : 0;
    const afterDiscount = gross - discount;
    const tax = item.taxRate ? afterDiscount * (item.taxRate / 100) : 0;

    subtotal += gross;
    discountAmount += discount;
    taxAmount += tax;
  }

  const totalAmount = subtotal - discountAmount + taxAmount + shippingCost;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
}