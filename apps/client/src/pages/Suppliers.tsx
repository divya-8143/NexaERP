import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/suppliers')
      .then((res) => setSuppliers(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setSuppliers([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Supplier Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-900">{s.name}</h4>
              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{s.code}</span>
            </div>
            <p className="text-sm text-gray-600">Email: {s.email || 'N/A'}</p>
            <p className="text-sm text-gray-600">Phone: {s.phone || 'N/A'}</p>
            <div className="pt-2 flex justify-between items-center text-xs text-gray-500 border-t">
              <span>Terms: {s.paymentTerms || 30} days</span>
              <span className="font-bold text-amber-500">Rating: â˜… {s.rating || 5}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};