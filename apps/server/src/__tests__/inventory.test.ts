import { inventoryService } from '../modules/inventory/inventory.service';
import { prisma } from '../lib/prisma';

describe('Suite 2: Inventory & Stock Movement Tests', () => {
  let testProductId: string;
  let testUserId: string;

  beforeAll(async () => {
    // Create test category & product
    const category = await prisma.category.create({
      data: { name: 'Test Inventory Category' },
    });

    const product = await prisma.product.create({
      data: {
        sku: 'TEST-INV-SKU-01',
        name: 'Test Inventory Item',
        categoryId: category.id,
        unitOfMeasure: 'Pcs',
        costPrice: 50,
        sellingPrice: 100,
      },
    });

    await prisma.inventory.create({
      data: {
        productId: product.id,
        quantityOnHand: 10,
        minStockLevel: 5,
        reorderPoint: 8,
      },
    });

    const user = await prisma.user.findFirst();
    testUserId = user ? user.id : 'system-test-user';
    testProductId = product.id;
  });

  afterAll(async () => {
    await prisma.stockMovement.deleteMany({ where: { productId: testProductId } });
    await prisma.inventory.deleteMany({ where: { productId: testProductId } });
    await prisma.product.deleteMany({ where: { id: testProductId } });
  });

  it('should get inventory by product ID', async () => {
    const item = await inventoryService.getByProductId(testProductId);
    expect(item).toBeDefined();
    expect(Number(item.quantityOnHand)).toBe(10);
  });

  it('should increase stock on positive adjustment', async () => {
    const adjusted = await inventoryService.adjustStock(
      {
        productId: testProductId,
        adjustmentType: 'INCREASE',
        quantity: 15,
        reason: 'Restock test',
      },
      testUserId
    );

    expect(Number(adjusted.quantityOnHand)).toBe(25);
  });

  it('should decrease stock on negative adjustment', async () => {
    const adjusted = await inventoryService.adjustStock(
      {
        productId: testProductId,
        adjustmentType: 'DECREASE',
        quantity: 5,
        reason: 'Damage test',
      },
      testUserId
    );

    expect(Number(adjusted.quantityOnHand)).toBe(20);
  });
});