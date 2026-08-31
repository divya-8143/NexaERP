import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Sales: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get('/sales-orders')
      .then((res) => setOrders(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Sales Orders</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Order #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {orders.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono font-semibold text-blue-600">{s.orderNumber}</td>
                <td className="p-4 text-gray-900">{s.customer?.name || 'N/A'}</td>
                <td className="p-4 font-bold text-emerald-600">${Number(s.totalAmount || 0).toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">{s.status}</span>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">{s.paymentStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};