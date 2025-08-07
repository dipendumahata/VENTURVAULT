import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvestorPortfolio } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const PortfolioPage = () => {
    const dispatch = useDispatch();
    const { portfolio, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchInvestorPortfolio());
    }, [dispatch]);

    if (loading) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">My Investment Portfolio</h1>
            <p className="mt-2 text-slate-600">These are the proposals you have shown interest in.</p>
            {error && <p className="text-red-500 mt-4 p-3 bg-red-100 rounded-md">{error}</p>}
            <div className="mt-8 space-y-6">
                {portfolio.length > 0 ? (
                    portfolio.map(proposal => (
                         <div key={proposal._id} className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-teal-700">{proposal.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">By: {proposal.businessId.profile.firstName} {proposal.businessId.profile.lastName}</p>
                         </div>
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-8">You have not shown interest in any proposals yet.</p>
                )}
            </div>
        </div>
    );
};

export default PortfolioPage;