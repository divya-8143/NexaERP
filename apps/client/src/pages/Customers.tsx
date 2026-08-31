import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/customers')
      .then((res) => setCustomers(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setCustomers([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Customer Profiles & CRM</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-900">{c.name}</h4>
              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{c.code}</span>
            </div>
            <p className="text-sm text-gray-600">Email: {c.email || 'N/A'}</p>
            <p className="text-sm text-gray-600">Phone: {c.phone || 'N/A'}</p>
            <div className="pt-2 flex justify-between items-center text-xs text-gray-500 border-t">
              <span>Credit Limit: ${c.creditLimit || 0}</span>
              <span className="font-bold text-blue-600">Balance: ${c.currentBalance || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};