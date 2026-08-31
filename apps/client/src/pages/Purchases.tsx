import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Purchases: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get('/purchase-orders')
      .then((res) => setOrders(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Purchase Orders</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">PO Number</th>
              <th className="p-4">Supplier</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono font-semibold text-blue-600">{o.poNumber}</td>
                <td className="p-4 text-gray-900">{o.supplier?.name || 'N/A'}</td>
                <td className="p-4 font-bold text-gray-800">${Number(o.totalAmount || 0).toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{o.status}</span>
                </td>
                <td className="p-4 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};