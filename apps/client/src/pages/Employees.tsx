import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    api.get('/employees')
      .then((res) => setEmployees(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => setEmployees([]));
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">Employee Directory & HR</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Code</th>
              <th className="p-4">Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono font-semibold text-blue-600">{emp.employeeCode}</td>
                <td className="p-4 font-bold text-gray-900">{emp.firstName} {emp.lastName}</td>
                <td className="p-4 text-gray-600">{emp.department?.name || 'N/A'}</td>
                <td className="p-4 text-gray-600">{emp.designation}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">{emp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};