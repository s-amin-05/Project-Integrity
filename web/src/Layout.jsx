import React from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardCheck, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  ChevronDown
} from 'lucide-react';

const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer mb-1 ${active ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
    {React.cloneElement(icon, { size: 18 })}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 h-full">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center text-white font-bold">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-900">INTEGRITY</h1>
              <p className="text-xs text-blue-500 font-semibold tracking-wide">ADMIN PLATFORM</p>
            </div>
          </div>

          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Main</div>
          <nav className="space-y-1 px-2">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={location.pathname === '/'} 
              onClick={() => navigate('/')}
            />
            <NavItem 
              icon={<FileText size={20} />} 
              label="Projects" 
              active={location.pathname === '/projects'}
              onClick={() => navigate('/projects')}
            />
            <NavItem 
              icon={<ClipboardCheck size={20} />} 
              label="Evidence Review" 
              active={location.pathname === '/evidence-review'}
              onClick={() => navigate('/evidence-review')}
            />

          </nav>

          <div className="px-4 py-2 mt-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Analytics</div>
          <nav className="space-y-1 px-2">
            <NavItem icon={<BarChart3 size={20} />} label="Reports" />
            <NavItem icon={<Settings size={20} />} label="Settings" />
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden">
             {/* Placeholder for Avatar */}
             <img src="/api/placeholder/40/40" alt="SJ" className="w-full h-full object-cover" /> 
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
            <p className="text-xs text-gray-500">Senior Administrator</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </aside>
      
      <main className="flex-1 overflow-y-auto h-full relative">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
