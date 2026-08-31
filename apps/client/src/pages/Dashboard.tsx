import React, { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { api } from '../lib/api';
import { DollarSign, AlertTriangle, TrendingUp, CreditCard } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    api.get('/reports/dashboard').then((res) => setKpis(res.data.data)).catch(() => {});
    api.get('/reports/revenue-chart').then((res) => setChartData(res.data.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${kpis?.totalRevenue?.toLocaleString() || 0}`} icon={DollarSign} color="bg-emerald-500" change="+12.5% vs last month" />
        <StatCard title="Total Expenses" value={`$${kpis?.totalExpenses?.toLocaleString() || 0}`} icon={CreditCard} color="bg-rose-500" />
        <StatCard title="Net Profit" value={`$${kpis?.netProfit?.toLocaleString() || 0}`} icon={TrendingUp} color="bg-blue-600" />
        <StatCard title="Low Stock Alerts" value={kpis?.lowStockItems || 0} icon={AlertTriangle} color="bg-amber-500" />
      </div>

      {/* Revenue & Profit Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Overview (Revenue vs Expenses)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#dbeafe" name="Revenue ($)" />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#fee2e2" name="Expenses ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};