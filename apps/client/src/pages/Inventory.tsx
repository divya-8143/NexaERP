import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    api.get('/inventory')
      .then((res) => setInventory(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setInventory([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Inventory Stock Levels</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Quantity On Hand</th>
              <th className="p-4">Reserved</th>
              <th className="p-4">Min Stock</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {inventory.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">{inv.product?.name || 'N/A'}</td>
                <td className="p-4 font-mono text-gray-500">{inv.product?.sku || 'N/A'}</td>
                <td className="p-4 font-bold text-gray-800">{inv.quantityOnHand || 0}</td>
                <td className="p-4 text-amber-600 font-medium">{inv.quantityReserved || 0}</td>
                <td className="p-4 text-gray-500">{inv.minStockLevel || 0}</td>
                <td className="p-4">
                  {(inv.quantityOnHand || 0) <= (inv.minStockLevel || 0) ? (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full">Low Stock</span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};