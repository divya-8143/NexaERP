import { z } from 'zod';

export const CreatePurchaseOrderSchema = z.object({
  supplierId: z.string().uuid('Invalid supplier ID'),
  expectedDeliveryDate: z.string().datetime().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid('Invalid product ID'),
        description: z.string().optional(),
        orderedQuantity: z.number().positive('Quantity must be positive'),
        unitPrice: z.number().min(0, 'Unit price must be non-negative'),
        taxRate: z.number().min(0).max(100).default(0),
        discount: z.number().min(0).max(100).default(0),
      })
    )
    .min(1, 'At least one item is required'),
  shippingCost: z.number().min(0).default(0),
  notes: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

export const UpdatePurchaseOrderSchema = CreatePurchaseOrderSchema.partial();

export const CreateGoodsReceiptSchema = z.object({
  purchaseOrderId: z.string().uuid('Invalid purchase order ID'),
  receivedDate: z.string().datetime(),
  items: z
    .array(
      z.object({
        purchaseOrderItemId: z.string().uuid(),
        productId: z.string().uuid(),
        receivedQuantity: z.number().min(0),
        acceptedQuantity: z.number().min(0),
        rejectedQuantity: z.number().min(0),
        rejectionReason: z.string().optional(),
        batchNumber: z.string().optional(),
        expiryDate: z.string().datetime().optional(),
      })
    )
    .min(1, 'At least one item is required'),
  notes: z.string().optional(),
});

export type CreatePurchaseOrderInput = z.infer<typeof CreatePurchaseOrderSchema>;
export type UpdatePurchaseOrderInput = z.infer<typeof UpdatePurchaseOrderSchema>;
export type CreateGoodsReceiptInput = z.infer<typeof CreateGoodsReceiptSchema>;