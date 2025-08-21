import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Settings, MessageSquare, Bell, LogOut } from "lucide-react";
import { BriefcaseIcon } from '../../assets/icons.jsx';
import NotificationBell from '../../components/shared/NotificationBell.jsx';
import { logout } from '../../store/authSlice.js';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Conversations", icon: <MessageSquare size={18} />, path: "/deal-rooms" },
    { name: "My Profile", icon: <User size={18} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen text-slate-800 bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="px-6 py-5 border-b">
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <BriefcaseIcon className="h-8 w-8 text-teal-600" />
              <span className="font-bold text-2xl text-slate-800">VENTURVAULT</span>
            </Link>
        </div>
        <nav className="mt-6 flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 mx-4 px-4 py-3 text-sm font-medium rounded-lg transition ${
                    isActive 
                    ? 'bg-teal-50 text-teal-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              {/* This could be dynamic based on the page */}
              Dashboard Overview
            </h1>
          </div>
          <div className="flex items-center space-x-5">
            <NotificationBell />
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content - This is where the nested routes will render */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
            <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;