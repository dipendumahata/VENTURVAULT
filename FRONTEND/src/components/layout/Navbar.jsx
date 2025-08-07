import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { BriefcaseIcon } from '../../assets/icons.jsx';
import NotificationBell from '../shared/NotificationBell.jsx';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={user ? '/dashboard' : '/'} className="flex-shrink-0 flex items-center space-x-2 group">
            <BriefcaseIcon className="h-8 w-8 text-teal-600 group-hover:text-teal-500 transition-colors" />
            <span className="font-bold text-2xl text-slate-800 group-hover:text-slate-600 transition-colors">VENTURVAULT</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell />
                <Link to="/dashboard" className="hidden sm:block px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-gray-100 transition-all">Dashboard</Link>
                {/* NEW LINK TO DEAL ROOMS */}
                <Link to="/deal-rooms" className="hidden sm:block px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-gray-100 transition-all">Conversations</Link>
                <button onClick={handleLogout} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-all">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-gray-100 hover:bg-gray-200 transition-all">Log In</Link>
                <Link to="/register" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm hover:shadow-md">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;