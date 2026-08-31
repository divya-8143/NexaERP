export type SupplierStatus = 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED';

export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxNumber?: string;
  paymentTerms?: number;
  creditLimit?: number;
  currentBalance: number;
  rating?: number;
  status: SupplierStatus;
  notes?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  contactPersonEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierProduct {
  id: string;
  supplierId: string;
  productId: string;
  supplierSku?: string;
  supplierPrice: number;
  leadTimeDays?: number;
  minOrderQuantity?: number;
  isPreferred: boolean;
}