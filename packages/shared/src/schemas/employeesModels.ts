import { z } from 'zod';
// Employees Specification and Data Models
export interface EmployeesBaseRecord {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeesModel1 {
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

export const employeesValidationSchema1 = z.object({
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

export type EmployeesDto1 = z.infer<typeof employeesValidationSchema1>;

export function computeEmployeesSummary1(items: EmployeesModel1[]) {
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

export interface EmployeesModel2 {
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

export const employeesValidationSchema2 = z.object({
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

export type EmployeesDto2 = z.infer<typeof employeesValidationSchema2>;

export function computeEmployeesSummary2(items: EmployeesModel2[]) {
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

export interface EmployeesModel3 {
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

export const employeesValidationSchema3 = z.object({
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

export type EmployeesDto3 = z.infer<typeof employeesValidationSchema3>;

export function computeEmployeesSummary3(items: EmployeesModel3[]) {
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

export interface EmployeesModel4 {
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

export const employeesValidationSchema4 = z.object({
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

export type EmployeesDto4 = z.infer<typeof employeesValidationSchema4>;

export function computeEmployeesSummary4(items: EmployeesModel4[]) {
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

export interface EmployeesModel5 {
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

export const employeesValidationSchema5 = z.object({
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

export type EmployeesDto5 = z.infer<typeof employeesValidationSchema5>;

export function computeEmployeesSummary5(items: EmployeesModel5[]) {
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

export interface EmployeesModel6 {
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

export const employeesValidationSchema6 = z.object({
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

export type EmployeesDto6 = z.infer<typeof employeesValidationSchema6>;

export function computeEmployeesSummary6(items: EmployeesModel6[]) {
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

export interface EmployeesModel7 {
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

export const employeesValidationSchema7 = z.object({
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

export type EmployeesDto7 = z.infer<typeof employeesValidationSchema7>;

export function computeEmployeesSummary7(items: EmployeesModel7[]) {
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

export interface EmployeesModel8 {
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

export const employeesValidationSchema8 = z.object({
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

export type EmployeesDto8 = z.infer<typeof employeesValidationSchema8>;

export function computeEmployeesSummary8(items: EmployeesModel8[]) {
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

export interface EmployeesModel9 {
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

export const employeesValidationSchema9 = z.object({
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

export type EmployeesDto9 = z.infer<typeof employeesValidationSchema9>;

export function computeEmployeesSummary9(items: EmployeesModel9[]) {
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

export interface EmployeesModel10 {
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

export const employeesValidationSchema10 = z.object({
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

export type EmployeesDto10 = z.infer<typeof employeesValidationSchema10>;

export function computeEmployeesSummary10(items: EmployeesModel10[]) {
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

export interface EmployeesModel11 {
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

export const employeesValidationSchema11 = z.object({
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

export type EmployeesDto11 = z.infer<typeof employeesValidationSchema11>;

export function computeEmployeesSummary11(items: EmployeesModel11[]) {
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

export interface EmployeesModel12 {
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

export const employeesValidationSchema12 = z.object({
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

export type EmployeesDto12 = z.infer<typeof employeesValidationSchema12>;

export function computeEmployeesSummary12(items: EmployeesModel12[]) {
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

export interface EmployeesModel13 {
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

export const employeesValidationSchema13 = z.object({
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

export type EmployeesDto13 = z.infer<typeof employeesValidationSchema13>;

export function computeEmployeesSummary13(items: EmployeesModel13[]) {
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

export interface EmployeesModel14 {
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

export const employeesValidationSchema14 = z.object({
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

export type EmployeesDto14 = z.infer<typeof employeesValidationSchema14>;

export function computeEmployeesSummary14(items: EmployeesModel14[]) {
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

export interface EmployeesModel15 {
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

export const employeesValidationSchema15 = z.object({
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

export type EmployeesDto15 = z.infer<typeof employeesValidationSchema15>;

export function computeEmployeesSummary15(items: EmployeesModel15[]) {
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

export interface EmployeesModel16 {
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

export const employeesValidationSchema16 = z.object({
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

export type EmployeesDto16 = z.infer<typeof employeesValidationSchema16>;

export function computeEmployeesSummary16(items: EmployeesModel16[]) {
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

export interface EmployeesModel17 {
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

export const employeesValidationSchema17 = z.object({
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

export type EmployeesDto17 = z.infer<typeof employeesValidationSchema17>;

export function computeEmployeesSummary17(items: EmployeesModel17[]) {
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

export interface EmployeesModel18 {
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

export const employeesValidationSchema18 = z.object({
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

export type EmployeesDto18 = z.infer<typeof employeesValidationSchema18>;

export function computeEmployeesSummary18(items: EmployeesModel18[]) {
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

export interface EmployeesModel19 {
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

export const employeesValidationSchema19 = z.object({
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

export type EmployeesDto19 = z.infer<typeof employeesValidationSchema19>;

export function computeEmployeesSummary19(items: EmployeesModel19[]) {
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

export interface EmployeesModel20 {
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

export const employeesValidationSchema20 = z.object({
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

export type EmployeesDto20 = z.infer<typeof employeesValidationSchema20>;

export function computeEmployeesSummary20(items: EmployeesModel20[]) {
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

export interface EmployeesModel21 {
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

export const employeesValidationSchema21 = z.object({
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

export type EmployeesDto21 = z.infer<typeof employeesValidationSchema21>;

export function computeEmployeesSummary21(items: EmployeesModel21[]) {
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

export interface EmployeesModel22 {
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

export const employeesValidationSchema22 = z.object({
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

export type EmployeesDto22 = z.infer<typeof employeesValidationSchema22>;

export function computeEmployeesSummary22(items: EmployeesModel22[]) {
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

export interface EmployeesModel23 {
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

export const employeesValidationSchema23 = z.object({
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

export type EmployeesDto23 = z.infer<typeof employeesValidationSchema23>;

export function computeEmployeesSummary23(items: EmployeesModel23[]) {
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

export interface EmployeesModel24 {
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

export const employeesValidationSchema24 = z.object({
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

export type EmployeesDto24 = z.infer<typeof employeesValidationSchema24>;

export function computeEmployeesSummary24(items: EmployeesModel24[]) {
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

export interface EmployeesModel25 {
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

export const employeesValidationSchema25 = z.object({
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

export type EmployeesDto25 = z.infer<typeof employeesValidationSchema25>;

export function computeEmployeesSummary25(items: EmployeesModel25[]) {
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

export interface EmployeesModel26 {
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

export const employeesValidationSchema26 = z.object({
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

export type EmployeesDto26 = z.infer<typeof employeesValidationSchema26>;

export function computeEmployeesSummary26(items: EmployeesModel26[]) {
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

export interface EmployeesModel27 {
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

export const employeesValidationSchema27 = z.object({
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

export type EmployeesDto27 = z.infer<typeof employeesValidationSchema27>;

export function computeEmployeesSummary27(items: EmployeesModel27[]) {
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

export interface EmployeesModel28 {
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

export const employeesValidationSchema28 = z.object({
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

export type EmployeesDto28 = z.infer<typeof employeesValidationSchema28>;

export function computeEmployeesSummary28(items: EmployeesModel28[]) {
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

export interface EmployeesModel29 {
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

export const employeesValidationSchema29 = z.object({
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

export type EmployeesDto29 = z.infer<typeof employeesValidationSchema29>;

export function computeEmployeesSummary29(items: EmployeesModel29[]) {
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
