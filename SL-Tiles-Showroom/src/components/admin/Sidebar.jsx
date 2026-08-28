import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Grid,
  FolderOpen,
  FolderTree,
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  Layers,
  X
} from 'lucide-react';

import { useData } from '../../context/DataContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { settings } = useData();
  const logoUrl = settings?.logoUrl || '/SL_LOGO.png';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Categories', path: '/admin/categories', icon: <FolderOpen size={20} /> },
    { name: 'SubCategories', path: '/admin/subcategories', icon: <FolderTree size={20} /> },
    { name: 'Tile Products', path: '/admin/tiles', icon: <Grid size={20} /> },
    { name: 'Catalogues', path: '/admin/catalogues', icon: <BookOpen size={20} /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 inset-y-0 left-0 w-full max-w-[280px] h-screen bg-brand-white/95 backdrop-blur-md border-r border-gray-100 text-brand-textMuted flex flex-col shrink-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo Area */}
        <div className="h-16 md:h-20 flex items-center justify-between px-6 shrink-0 border-b border-gray-100/50">
          <NavLink to="/admin" className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt={settings?.showroomName || "Showroom Admin"} className="h-10 md:h-12 w-auto object-contain" />
            ) : (
              <>
                <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center text-brand-gold shadow-md">
                  <Layers size={24} />
                </div>
                <div>
                  <h1 className="text-brand-text font-luxury font-bold text-lg leading-tight tracking-wide">TileAdmin</h1>
                  <p className="text-xs text-gray-500 font-medium">Showroom Panel</p>
                </div>
              </>
            )}
          </NavLink>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-brand-textMuted hover:text-brand-gold focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

      <div className="px-6 mb-2">
        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Main Menu</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                isActive
                  ? 'bg-brand-gold text-brand-white shadow-lg shadow-brand-gold/20'
                  : 'text-brand-textMuted hover:bg-gray-50 hover:text-brand-text'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 shrink-0 border-t border-gray-100/50">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-all duration-300 text-brand-textMuted hover:bg-gray-50 hover:text-brand-text text-sm font-medium"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
