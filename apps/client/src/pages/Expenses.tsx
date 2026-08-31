import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    api.get('/expenses')
      .then((res) => setExpenses(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setExpenses([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Expense Vouchers</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Expense #</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono font-semibold text-blue-600">{exp.expenseNumber}</td>
                <td className="p-4 font-bold text-gray-900">{exp.title}</td>
                <td className="p-4 text-gray-600">{exp.category?.name || 'N/A'}</td>
                <td className="p-4 font-bold text-rose-600">${Number(exp.totalAmount || 0).toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">{exp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};