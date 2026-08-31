export type StockMovementType = 'IN' | 'OUT' | 'ADJUSTMENT' | 'RETURN';

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  categoryId: string;
  category?: Category;
  unitOfMeasure: string;
  costPrice: number;
  sellingPrice: number;
  taxRate: number;
  barcode?: string;
  imageUrl?: string;
  isActive: boolean;
  variants?: ProductVariant[];
  currentStock?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  attributes: Record<string, string>;
  isActive: boolean;
}

export interface InventoryItem {
  id: string;
  productId: string;
  product?: Product;
  warehouseLocation?: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  minStockLevel: number;
  maxStockLevel?: number;
  reorderPoint: number;
  reorderQuantity: number;
  lastUpdated: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  product?: Product;
  type: StockMovementType;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  referenceType?: string;
  referenceId?: string;
  reason?: string;
  notes?: string;
  createdById: string;
  createdAt: Date;
}

export interface StockAdjustment {
  productId: string;
  adjustmentType: 'INCREASE' | 'DECREASE' | 'SET';
  quantity: number;
  reason: string;
  notes?: string;
}