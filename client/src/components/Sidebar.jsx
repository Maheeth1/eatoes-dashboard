import { LayoutDashboard, UtensilsCrossed, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Orders' },
    { path: '/menu', icon: <UtensilsCrossed size={20} />, label: 'Menu Management' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 p-4">
      <h1 className="text-2xl font-bold mb-8 text-orange-500">Eatoes Admin</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path ? 'bg-orange-600' : 'hover:bg-slate-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;