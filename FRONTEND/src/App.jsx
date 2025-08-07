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

// We create an inner component to access the useLocation hook
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current URL path
  const { token, user, loading: authLoading } = useSelector((state) => state.auth);

  // Determine if the current page is the homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserByToken());
    }
  }, [dispatch, token, user]);

  if (authLoading && token && !user) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col">
      {/* Conditionally render the Navbar. Only show it if it's NOT the homepage. */}
      {!isHomePage && <Navbar />}
      
      <main className="flex-grow">
        <AppRouter />
      </main>

      {/* Conditionally render the Footer. Only show it if it's NOT the homepage. */}
      {!isHomePage && <Footer />}
    </div>
  );
}


export default function App() {
  return (
    // The Router needs to be the outermost component
    <Router>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </Router>
  );
}
