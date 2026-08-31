import { z } from 'zod';
// Discounts Specification and Data Models
export interface DiscountsBaseRecord {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscountsModel1 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema1 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto1 = z.infer<typeof discountsValidationSchema1>;

export function computeDiscountsSummary1(items: DiscountsModel1[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel2 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema2 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto2 = z.infer<typeof discountsValidationSchema2>;

export function computeDiscountsSummary2(items: DiscountsModel2[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel3 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema3 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto3 = z.infer<typeof discountsValidationSchema3>;

export function computeDiscountsSummary3(items: DiscountsModel3[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel4 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema4 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto4 = z.infer<typeof discountsValidationSchema4>;

export function computeDiscountsSummary4(items: DiscountsModel4[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel5 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema5 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto5 = z.infer<typeof discountsValidationSchema5>;

export function computeDiscountsSummary5(items: DiscountsModel5[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel6 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema6 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto6 = z.infer<typeof discountsValidationSchema6>;

export function computeDiscountsSummary6(items: DiscountsModel6[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel7 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema7 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto7 = z.infer<typeof discountsValidationSchema7>;

export function computeDiscountsSummary7(items: DiscountsModel7[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel8 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema8 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto8 = z.infer<typeof discountsValidationSchema8>;

export function computeDiscountsSummary8(items: DiscountsModel8[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel9 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema9 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto9 = z.infer<typeof discountsValidationSchema9>;

export function computeDiscountsSummary9(items: DiscountsModel9[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel10 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema10 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto10 = z.infer<typeof discountsValidationSchema10>;

export function computeDiscountsSummary10(items: DiscountsModel10[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel11 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema11 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto11 = z.infer<typeof discountsValidationSchema11>;

export function computeDiscountsSummary11(items: DiscountsModel11[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel12 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema12 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto12 = z.infer<typeof discountsValidationSchema12>;

export function computeDiscountsSummary12(items: DiscountsModel12[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel13 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema13 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto13 = z.infer<typeof discountsValidationSchema13>;

export function computeDiscountsSummary13(items: DiscountsModel13[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel14 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema14 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto14 = z.infer<typeof discountsValidationSchema14>;

export function computeDiscountsSummary14(items: DiscountsModel14[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel15 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema15 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto15 = z.infer<typeof discountsValidationSchema15>;

export function computeDiscountsSummary15(items: DiscountsModel15[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel16 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema16 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto16 = z.infer<typeof discountsValidationSchema16>;

export function computeDiscountsSummary16(items: DiscountsModel16[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel17 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema17 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto17 = z.infer<typeof discountsValidationSchema17>;

export function computeDiscountsSummary17(items: DiscountsModel17[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel18 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema18 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto18 = z.infer<typeof discountsValidationSchema18>;

export function computeDiscountsSummary18(items: DiscountsModel18[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel19 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema19 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto19 = z.infer<typeof discountsValidationSchema19>;

export function computeDiscountsSummary19(items: DiscountsModel19[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel20 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema20 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto20 = z.infer<typeof discountsValidationSchema20>;

export function computeDiscountsSummary20(items: DiscountsModel20[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel21 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema21 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto21 = z.infer<typeof discountsValidationSchema21>;

export function computeDiscountsSummary21(items: DiscountsModel21[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel22 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema22 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto22 = z.infer<typeof discountsValidationSchema22>;

export function computeDiscountsSummary22(items: DiscountsModel22[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel23 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema23 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto23 = z.infer<typeof discountsValidationSchema23>;

export function computeDiscountsSummary23(items: DiscountsModel23[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel24 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema24 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto24 = z.infer<typeof discountsValidationSchema24>;

export function computeDiscountsSummary24(items: DiscountsModel24[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel25 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema25 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto25 = z.infer<typeof discountsValidationSchema25>;

export function computeDiscountsSummary25(items: DiscountsModel25[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel26 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema26 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto26 = z.infer<typeof discountsValidationSchema26>;

export function computeDiscountsSummary26(items: DiscountsModel26[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel27 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema27 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto27 = z.infer<typeof discountsValidationSchema27>;

export function computeDiscountsSummary27(items: DiscountsModel27[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel28 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema28 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto28 = z.infer<typeof discountsValidationSchema28>;

export function computeDiscountsSummary28(items: DiscountsModel28[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}

export interface DiscountsModel29 {
  id: string;
  recordCode: string;
  title: string;
  category: string;
  amount: number;
  quantity: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  netTotal: number;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  notes: string[];
  attributes: Record<string, string>;
}

export const discountsValidationSchema29 = z.object({
  id: z.string().uuid(),
  recordCode: z.string().min(2).max(60),
  title: z.string().min(1),
  category: z.string().default('GENERAL'),
  amount: z.number().min(0),
  quantity: z.number().min(0),
  taxRate: z.number().min(0).max(100).default(0),
  isApproved: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type DiscountsDto29 = z.infer<typeof discountsValidationSchema29>;

export function computeDiscountsSummary29(items: DiscountsModel29[]) {
  let gross = 0;
  let tax = 0;
  let discount = 0;
  let net = 0;
  for (const item of items) {
    gross += item.amount * item.quantity;
    tax += item.taxAmount;
    discount += item.discountAmount;
    net += item.netTotal;
  }
  return { gross, tax, discount, net, count: items.length };
}
