import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const adminHash = await bcrypt.hash('Admin@123', 12);
  const managerHash = await bcrypt.hash('Manager@123', 12);
  const employeeHash = await bcrypt.hash('Employee@123', 12);

  await prisma.user.upsert({
    where: { email: 'admin@nexaerp.com' },
    update: {},
    create: { email: 'admin@nexaerp.com', passwordHash: adminHash, firstName: 'System', lastName: 'Admin', role: 'ADMIN' },
  });

  await prisma.user.upsert({
    where: { email: 'manager@nexaerp.com' },
    update: {},
    create: { email: 'manager@nexaerp.com', passwordHash: managerHash, firstName: 'John', lastName: 'Manager', role: 'MANAGER' },
  });

  await prisma.user.upsert({
    where: { email: 'employee@nexaerp.com' },
    update: {},
    create: { email: 'employee@nexaerp.com', passwordHash: employeeHash, firstName: 'Jane', lastName: 'Employee', role: 'EMPLOYEE' },
  });

  console.log('Users created');

  const depts = await Promise.all([
    prisma.department.upsert({ where: { name: 'Operations' }, update: {}, create: { name: 'Operations', description: 'Operations & Logistics' } }),
    prisma.department.upsert({ where: { name: 'Sales' }, update: {}, create: { name: 'Sales', description: 'Sales & Marketing' } }),
    prisma.department.upsert({ where: { name: 'Finance' }, update: {}, create: { name: 'Finance', description: 'Finance & Accounting' } }),
    prisma.department.upsert({ where: { name: 'HR' }, update: {}, create: { name: 'HR', description: 'Human Resources' } }),
    prisma.department.upsert({ where: { name: 'Technology' }, update: {}, create: { name: 'Technology', description: 'IT & Development' } }),
  ]);

  console.log('Departments created');

  const electronics = await prisma.category.upsert({
    where: { id: 'cat-electronics' },
    update: {},
    create: { id: 'cat-electronics', name: 'Electronics', description: 'Electronic devices and accessories' },
  });

  const furniture = await prisma.category.upsert({
    where: { id: 'cat-furniture' },
    update: {},
    create: { id: 'cat-furniture', name: 'Furniture', description: 'Office and home furniture' },
  });

  const supplies = await prisma.category.upsert({
    where: { id: 'cat-supplies' },
    update: {},
    create: { id: 'cat-supplies', name: 'Office Supplies', description: 'Stationery and office supplies' },
  });

  console.log('Categories created');

  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'LAPTOP-001' },
      update: {},
      create: { sku: 'LAPTOP-001', name: 'Business Laptop 15"', categoryId: electronics.id, unitOfMeasure: 'Unit', costPrice: 800, sellingPrice: 1200, taxRate: 10 },
    }),
    prisma.product.upsert({
      where: { sku: 'MOUSE-001' },
      update: {},
      create: { sku: 'MOUSE-001', name: 'Wireless Mouse', categoryId: electronics.id, unitOfMeasure: 'Unit', costPrice: 15, sellingPrice: 35, taxRate: 10 },
    }),
    prisma.product.upsert({
      where: { sku: 'DESK-001' },
      update: {},
      create: { sku: 'DESK-001', name: 'Standing Desk', categoryId: furniture.id, unitOfMeasure: 'Unit', costPrice: 250, sellingPrice: 450, taxRate: 5 },
    }),
    prisma.product.upsert({
      where: { sku: 'CHAIR-001' },
      update: {},
      create: { sku: 'CHAIR-001', name: 'Ergonomic Chair', categoryId: furniture.id, unitOfMeasure: 'Unit', costPrice: 150, sellingPrice: 280, taxRate: 5 },
    }),
    prisma.product.upsert({
      where: { sku: 'PEN-001' },
      update: {},
      create: { sku: 'PEN-001', name: 'Ballpoint Pens (Pack of 10)', categoryId: supplies.id, unitOfMeasure: 'Pack', costPrice: 2, sellingPrice: 5, taxRate: 0 },
    }),
  ]);

  for (const product of products) {
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: { productId: product.id, quantityOnHand: 100, minStockLevel: 10, reorderPoint: 20, reorderQuantity: 50 },
    });
  }

  console.log('Products and inventory created');

  await prisma.supplier.upsert({
    where: { code: 'SUP-001' },
    update: {},
    create: {
      name: 'TechPro Distributors', code: 'SUP-001', email: 'info@techpro.com',
      phone: '+1-555-0101', city: 'New York', country: 'USA', status: 'ACTIVE', paymentTerms: 30, rating: 5,
    },
  });

  await prisma.supplier.upsert({
    where: { code: 'SUP-002' },
    update: {},
    create: {
      name: 'Office Depot Wholesale', code: 'SUP-002', email: 'sales@officedepot.com',
      phone: '+1-555-0202', city: 'Chicago', country: 'USA', status: 'ACTIVE', paymentTerms: 15,
    },
  });

  console.log('Suppliers created');

  await prisma.customer.upsert({
    where: { code: 'CUST-001' },
    update: {},
    create: {
      name: 'Acme Corporation', code: 'CUST-001', email: 'purchasing@acme.com',
      phone: '+1-555-1001', city: 'Los Angeles', country: 'USA', isActive: true, paymentTerms: 30, creditLimit: 50000,
    },
  });

  await prisma.customer.upsert({
    where: { code: 'CUST-002' },
    update: {},
    create: {
      name: 'Global Enterprises Ltd', code: 'CUST-002', email: 'orders@globalent.com',
      phone: '+1-555-1002', city: 'Miami', country: 'USA', isActive: true, paymentTerms: 15,
    },
  });

  console.log('Customers created');

  await Promise.all([
    prisma.expenseCategory.upsert({ where: { name: 'Travel' }, update: {}, create: { name: 'Travel', description: 'Business travel expenses', budgetAmount: 5000 } }),
    prisma.expenseCategory.upsert({ where: { name: 'Office Supplies' }, update: {}, create: { name: 'Office Supplies', description: 'Office consumables', budgetAmount: 1000 } }),
    prisma.expenseCategory.upsert({ where: { name: 'Software' }, update: {}, create: { name: 'Software', description: 'Software subscriptions', budgetAmount: 3000 } }),
    prisma.expenseCategory.upsert({ where: { name: 'Marketing' }, update: {}, create: { name: 'Marketing', description: 'Marketing and advertising', budgetAmount: 10000 } }),
    prisma.expenseCategory.upsert({ where: { name: 'Utilities' }, update: {}, create: { name: 'Utilities', description: 'Utilities and bills', budgetAmount: 2000 } }),
  ]);

  console.log('Expense categories created');

  await prisma.employee.upsert({
    where: { email: 'jane.doe@nexaerp.com' },
    update: {},
    create: {
      employeeCode: 'EMP-OPS-0001',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@nexaerp.com',
      phone: '+1-555-2001',
      departmentId: depts[0].id,
      designation: 'Operations Manager',
      employmentType: 'FULL_TIME',
      joinDate: new Date('2022-01-15'),
      basicSalary: 5000,
      status: 'ACTIVE',
    },
  });

  await prisma.employee.upsert({
    where: { email: 'john.smith@nexaerp.com' },
    update: {},
    create: {
      employeeCode: 'EMP-SAL-0002',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@nexaerp.com',
      phone: '+1-555-2002',
      departmentId: depts[1].id,
      designation: 'Sales Representative',
      employmentType: 'FULL_TIME',
      joinDate: new Date('2022-03-20'),
      basicSalary: 3500,
      status: 'ACTIVE',
    },
  });

  console.log('Employees created');
  console.log('\nSeed completed successfully!');
  console.log('\nDefault login credentials:');
  console.log('Admin:    admin@nexaerp.com / Admin@123');
  console.log('Manager:  manager@nexaerp.com / Manager@123');
  console.log('Employee: employee@nexaerp.com / Employee@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });