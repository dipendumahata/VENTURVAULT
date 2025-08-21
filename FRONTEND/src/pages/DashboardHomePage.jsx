import React from 'react';
import { useSelector } from 'react-redux';
import QuickActions from '../components/dashboard/QuickActions.jsx';
import ProfileCard from '../components/dashboard/ProfileCard.jsx';
import BusinessDashboard from '../components/dashboard/role-specific/BusinessDashboard.jsx';
import InvestorDashboard from '../components/dashboard/role-specific/InvestorDashboard.jsx';
import AdvisorDashboard from '../components/dashboard/role-specific/AdvisorDashboard.jsx';
import BankerDashboard from '../components/dashboard/role-specific/BankerDashboard.jsx';

const DashboardHomePage = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user) return null;

    const renderRoleSpecificContent = () => {
        switch (user.role) {
            case "business": return <BusinessDashboard />;
            case "investor": return <InvestorDashboard />;
            case "advisor": return <AdvisorDashboard />;
            case "banker": return <BankerDashboard />;
            default:
                return (
                    <div className="bg-slate-100 border p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-slate-800">Welcome to your Dashboard</h2>
                        <p className="mt-1 text-slate-600">Explore and manage your account.</p>
                    </div>
                );
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">{renderRoleSpecificContent()}</div>
            <div className="space-y-6">
                <QuickActions userRole={user.role} />
                <ProfileCard user={user} />
            </div>
        </div>
    );
};

export default DashboardHomePage;

