import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  change?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color = 'bg-blue-500', change }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && <p className="text-xs text-emerald-600 mt-1 font-semibold">{change}</p>}
      </div>
      <div className={`p-3 rounded-lg text-white ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};