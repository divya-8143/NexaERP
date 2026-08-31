import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const CreateProductSchema = z.object({
  sku: z.string().min(1, 'SKU is required').max(50),
  name: z.string().min(1, 'Product name is required').max(200),
  description: z.string().optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  unitOfMeasure: z.string().min(1, 'Unit of measure is required'),
  costPrice: z.number().min(0, 'Cost price must be non-negative'),
  sellingPrice: z.number().min(0, 'Selling price must be non-negative'),
  taxRate: z.number().min(0).max(100, 'Tax rate must be between 0 and 100'),
  barcode: z.string().optional(),
  minStockLevel: z.number().min(0).optional().default(0),
  maxStockLevel: z.number().min(0).optional(),
  reorderPoint: z.number().min(0).optional().default(0),
  reorderQuantity: z.number().min(0).optional().default(0),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const StockAdjustmentSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  adjustmentType: z.enum(['INCREASE', 'DECREASE', 'SET']),
  quantity: z.number().positive('Quantity must be positive'),
  reason: z.string().min(1, 'Reason is required'),
  notes: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type StockAdjustmentInput = z.infer<typeof StockAdjustmentSchema>;