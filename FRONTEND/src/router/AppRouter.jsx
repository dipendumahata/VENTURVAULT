import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import MyGigsPage from '../pages/MyGigsPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import CreateGigPage from '../pages/CreateGigPage.jsx';
import ProposalsListPage from '../pages/ProposalsListPage.jsx'; 
import PortfolioPage from '../pages/PortfolioPage.jsx';
import MyProposalsPage from '../pages/MyProposalsPage.jsx';
import CreateProposalPage from '../pages/CreateProposalPage.jsx';
import MyLoanProductsPage from '../pages/MyLoanProductsPage.jsx';
import CreateLoanProductPage from '../pages/CreateLoanProductPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import PrivacyPage from '../pages/PrivacyPage.jsx';
import TermsPage from '../pages/TermsPage.jsx';
import CareersPage from '../pages/CareersPage.jsx';
import BlogPage from '../pages/BlogPage.jsx'; 
import GuidesPage from '../pages/GuidesPage.jsx';
import InsightsPage from '../pages/InsightsPage.jsx'; 
import ProposalDetailPage from '../pages/ProposalDetailPage.jsx';
import ProposalDashboardPage from '../pages/ProposalDashboardPage.jsx'; 
import DealRoomPage from '../pages/DealRoomPage.jsx';
import MyDealRoomsPage from '../pages/MyDealRoomsPage.jsx';
import GigsListPage from '../pages/GigsListPage.jsx';
import LoanProductsListPage from '../pages/LoanProductsListPage.jsx';
import GigDetailPage from '../pages/GigDetailPage.jsx';
import EditProposalPage from '../pages/EditProposalPage.jsx';
import EditGigPage from '../pages/EditGigPage.jsx';

const AppRouter = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
            
            {/* --- Footer & Resource Routes --- */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            

            {/* --- Protected Routes --- */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            
            {/* Advisor Routes */}
            <Route path="/my-gigs" element={<ProtectedRoute><MyGigsPage /></ProtectedRoute>} />
            <Route path="/gigs/new" element={<ProtectedRoute><CreateGigPage /></ProtectedRoute>} />
            <Route path="/gigs/:id/edit" element={<ProtectedRoute><EditGigPage /></ProtectedRoute>} />
            
            {/* Investor Routes */}
            <Route path="/proposals" element={<ProtectedRoute><ProposalsListPage /></ProtectedRoute>} />
            <Route path="/proposals/:id" element={<ProtectedRoute><ProposalDetailPage /></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />

            {/* Business Owner Routes */}
            <Route path="/my-proposals" element={<ProtectedRoute><MyProposalsPage /></ProtectedRoute>} />
            <Route path="/my-proposals/:id" element={<ProtectedRoute><ProposalDashboardPage /></ProtectedRoute>} />
            <Route path="/proposals/new" element={<ProtectedRoute><CreateProposalPage /></ProtectedRoute>} />
             <Route path="/proposals/:id/edit" element={<ProtectedRoute><EditProposalPage /></ProtectedRoute>} />

            {/* Banker Routes */}
            <Route path="/my-loan-products" element={<ProtectedRoute><MyLoanProductsPage /></ProtectedRoute>} />
            <Route path="/loan-products/new" element={<ProtectedRoute><CreateLoanProductPage /></ProtectedRoute>} />

            {/* NEW Marketplace Routes */}
            <Route path="/gigs" element={<ProtectedRoute><GigsListPage /></ProtectedRoute>} />
            <Route path="/loan-products" element={<ProtectedRoute><LoanProductsListPage /></ProtectedRoute>} />
            <Route path="/gigs/:id" element={<ProtectedRoute><GigDetailPage /></ProtectedRoute>} />
            
            {/* Shared Protected Routes */}
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/deal-rooms" element={<ProtectedRoute><MyDealRoomsPage /></ProtectedRoute>} />
             <Route path="/deal-rooms/:id" element={<ProtectedRoute><DealRoomPage /></ProtectedRoute>} />
            
            {/* --- Catch-all Route --- */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;