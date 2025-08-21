// FILE: /src/router/AppRouter.jsx (COMPLETE & CORRECTED)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts and Route Protection
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';

// Public Pages
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import PrivacyPage from '../pages/PrivacyPage.jsx';
import TermsPage from '../pages/TermsPage.jsx';
import CareersPage from '../pages/CareersPage.jsx';
import BlogPage from '../pages/BlogPage.jsx';
import GuidesPage from '../pages/GuidesPage.jsx';
import InsightsPage from '../pages/InsightsPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

// Dashboard Content Pages
import DashboardHomePage from '../pages/DashboardHomePage.jsx';
import MyProposalsPage from '../pages/MyProposalsPage.jsx';
import CreateProposalPage from '../pages/CreateProposalPage.jsx';
import ProposalDetailPage from '../pages/ProposalDetailPage.jsx';
import EditProposalPage from '../pages/EditProposalPage.jsx';
import MyGigsPage from '../pages/MyGigsPage.jsx';
import CreateGigPage from '../pages/CreateGigPage.jsx';
import EditGigPage from '../pages/EditGigPage.jsx';
import GigDetailPage from '../pages/GigDetailPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import PortfolioPage from '../pages/PortfolioPage.jsx';
import MyLoanProductsPage from '../pages/MyLoanProductsPage.jsx';
import CreateLoanProductPage from '../pages/CreateLoanProductPage.jsx';
import LoanProductDetailPage from '../pages/LoanProductDetailPage.jsx';
import DealRoomPage from '../pages/DealRoomPage.jsx';
import MyDealRoomsPage from '../pages/MyDealRoomsPage.jsx';
import ProposalsListPage from '../pages/ProposalsListPage.jsx';
import GigsListPage from '../pages/GigsListPage.jsx';
import ProposalDashboardPage from '../pages/ProposalDashboardPage.jsx';
import LoanApplicationPage from '../pages/LoanApplicationPage.jsx';

const AppRouter = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            
            {/* --- Protected Routes (Nested within Dashboard Layout) --- */}
            <Route element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
                <Route path="dashboard" element={<DashboardHomePage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="loan-products/:id/apply" element={<LoanApplicationPage />} />
                
                {/* Business Owner Routes */}
                <Route path="my-proposals" element={<MyProposalsPage />} />
                <Route path="my-proposals/:id" element={<ProposalDashboardPage />} />
                <Route path="proposals/new" element={<CreateProposalPage />} />
                <Route path="proposals/:id/edit" element={<EditProposalPage />} />
                
                {/* Advisor Routes */}
                <Route path="my-gigs" element={<MyGigsPage />} />
                <Route path="gigs/new" element={<CreateGigPage />} />
                <Route path="gigs/:id/edit" element={<EditGigPage />} />
                
                {/* Banker Routes */}
                <Route path="my-loan-products" element={<MyLoanProductsPage />} />
                <Route path="loan-products/new" element={<CreateLoanProductPage />} />
                
                {/* Investor Routes */}
                <Route path="portfolio" element={<PortfolioPage />} />
                
                {/* Shared/Marketplace Routes */}
                <Route path="proposals" element={<ProposalsListPage />} />
                <Route path="proposals/:id" element={<ProposalDetailPage />} />
                <Route path="gigs" element={<GigsListPage />} />
                <Route path="gigs/:id" element={<GigDetailPage />} />
                <Route path="loan-products/:id" element={<LoanProductDetailPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="deal-rooms" element={<MyDealRoomsPage />} />
                {/* THIS IS THE FIX */}
                <Route path="deal-rooms/:id" element={<DealRoomPage />} />
            </Route>
            
            {/* --- Catch-all Route --- */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
