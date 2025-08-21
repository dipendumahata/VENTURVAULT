// FILE: /src/App.jsx (FIXED)

import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserByToken } from './store/authSlice.js';
import { SocketProvider } from './context/SocketContext.jsx';
import AppRouter from './router/AppRouter.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import PageLoader from './components/layout/PageLoader.jsx';

// This inner component is necessary to use the `useLocation` hook within the Router context.
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current URL path
  const { token, user, loading: authLoading } = useSelector((state) => state.auth);

  // This is the key logic: We define which routes are part of the new dashboard layout.
  const dashboardRoutes = [
    '/dashboard', '/my-proposals', '/proposals', '/my-gigs', '/gigs', 
    '/orders', '/portfolio', '/my-loan-products', '/loan-products', 
    '/profile', '/settings', '/deal-rooms'
  ];

  // Check if the current path starts with any of the dashboard routes.
  const isDashboardRoute = dashboardRoutes.some(route => location.pathname.startsWith(route));
  
  // Also check if it's the animated homepage.
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // On initial load, if a token exists but user data is not in state, fetch it.
    if (token && !user) {
      dispatch(fetchUserByToken());
    }
  }, [dispatch, token, user]);

  // Show a full-page loader only during the initial token validation.
  if (authLoading && token && !user) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col">
      {/* Conditionally render the main Navbar. Hide it on dashboard routes and the homepage. */}
      {!isDashboardRoute && !isHomePage && <Navbar />}
      
      <main className="flex-grow">
        <AppRouter />
      </main>

      {/* Conditionally render the main Footer. */}
      {!isDashboardRoute && !isHomePage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </Router>
  );
}
