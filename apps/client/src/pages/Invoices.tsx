import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    api.get('/invoices')
      .then((res) => setInvoices(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setInvoices([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Invoices & Billing</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Invoice #</th>
              <th className="p-4">Type</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Balance Due</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono font-semibold text-blue-600">{inv.invoiceNumber}</td>
                <td className="p-4 text-xs font-bold text-slate-500 uppercase">{inv.type}</td>
                <td className="p-4 font-bold text-gray-900">${Number(inv.totalAmount || 0).toFixed(2)}</td>
                <td className="p-4 font-bold text-rose-600">${Number(inv.balanceDue || 0).toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};