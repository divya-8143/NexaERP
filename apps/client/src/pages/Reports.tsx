import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Reports: React.FC = () => {
  const [pl, setPl] = useState<any>(null);

  useEffect(() => {
    api.get('/reports/profit-loss').then((res) => setPl(res.data?.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Profit & Loss Statement</h3>
      {pl ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 max-w-xl">
          <p className="text-sm text-gray-500 font-semibold">{pl.period}</p>
          <div className="space-y-2 divide-y">
            <div className="flex justify-between py-2"><span className="text-gray-600">Total Revenue:</span><span className="font-bold text-emerald-600">${pl.revenue?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-600">Cost of Goods Sold (COGS):</span><span className="font-bold text-rose-600">${pl.costOfGoodsSold?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between py-2 bg-gray-50 px-2 rounded"><span className="font-bold text-gray-800">Gross Profit:</span><span className="font-bold text-emerald-700">${pl.grossProfit?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-600">Operating Expenses:</span><span className="font-bold text-rose-600">${pl.operatingExpenses?.toLocaleString() || 0}</span></div>
            <div className="flex justify-between py-2 bg-blue-50 px-2 rounded"><span className="font-bold text-blue-900 text-lg">Net Profit:</span><span className="font-bold text-blue-900 text-lg">${pl.netProfit?.toLocaleString() || 0}</span></div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-gray-500 text-sm">
          Loading report data...
        </div>
      )}
    </div>
  );
};