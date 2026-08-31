import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Plus } from 'lucide-react';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Product Catalog</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">SKU</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Cost Price</th>
              <th className="p-4">Selling Price</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono font-medium text-blue-600">{p.sku}</td>
                <td className="p-4 font-semibold text-gray-900">{p.name}</td>
                <td className="p-4 text-gray-600">{p.category?.name || 'Uncategorized'}</td>
                <td className="p-4 text-gray-600">${Number(p.costPrice || 0).toFixed(2)}</td>
                <td className="p-4 font-bold text-emerald-600">${Number(p.sellingPrice || 0).toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};