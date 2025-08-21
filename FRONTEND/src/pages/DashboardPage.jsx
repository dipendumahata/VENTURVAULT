import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Settings, MessageSquare, Bell, LogOut, Menu, X } from "lucide-react";
import { BriefcaseIcon } from '../assets/icons.jsx';
import NotificationBell from '../components/shared/NotificationBell.jsx';
import { logout } from '../store/authSlice.js';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarContent = () => {
    const location = useLocation();
    const sidebarLinks = [
        { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
        { name: "Conversations", icon: <MessageSquare size={18} />, path: "/deal-rooms" },
        { name: "My Profile", icon: <User size={18} />, path: "/profile" },
        { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
    ];

    return (
        <>
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
        </>
    );
};

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex min-h-screen text-slate-800 bg-slate-50">
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
            <>
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                />
                {/* Sidebar Content */}
                <motion.aside
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 h-full w-64 bg-white z-50 flex flex-col"
                >
                    <SidebarContent />
                </motion.aside>
            </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8">
          {/* Hamburger Menu Button for Mobile */}
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-slate-600">
            <Menu size={24} />
          </button>
          
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
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
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
            <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;