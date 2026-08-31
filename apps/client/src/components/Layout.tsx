import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard,
  Package,
  Layers,
  Truck,
  ShoppingCart,
  Users,
  Receipt,
  UserCheck,
  CreditCard,
  BarChart3,
  LogOut,
  Building2,
} from 'lucide-react';

export const Layout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Products Catalog', path: '/products', icon: Package },
    { label: 'Inventory', path: '/inventory', icon: Layers },
    { label: 'Suppliers', path: '/suppliers', icon: Truck },
    { label: 'Purchase Orders', path: '/purchases', icon: ShoppingCart },
    { label: 'Sales Orders', path: '/sales', icon: ShoppingCart },
    { label: 'Customers', path: '/customers', icon: Users },
    { label: 'Invoices & Billing', path: '/invoices', icon: Receipt },
    { label: 'Employees & HR', path: '/employees', icon: UserCheck },
    { label: 'Expenses', path: '/expenses', icon: CreditCard },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <Building2 className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="font-bold text-xl tracking-wider text-white">NexaERP</h1>
            <p className="text-xs text-slate-400">Enterprise Core v1.0</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role?.toLowerCase()}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            {navItems.find((n) => n.path === location.pathname)?.label || 'Overview'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              System Online
            </span>
          </div>
        </header>

        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};