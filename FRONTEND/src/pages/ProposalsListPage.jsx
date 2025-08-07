import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import { fetchAllProposals } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const ProposalsListPage = () => {
    const dispatch = useDispatch();
    const { proposals, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchAllProposals());
    }, [dispatch]);

    if (loading) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">Browse Investment Opportunities</h1>
            {error && <p className="text-red-500 mt-4 p-3 bg-red-100 rounded-md">{error}</p>}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {proposals.length > 0 ? (
                    proposals.map(proposal => (
                        // Wrap the card in a Link component
                        <Link to={`/proposals/${proposal._id}`} key={proposal._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                            <div className="p-6">
                                <span className="text-sm font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">{proposal.category}</span>
                                <h3 className="mt-3 text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{proposal.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">By: {proposal.businessId.profile.firstName} {proposal.businessId.profile.lastName}</p>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <span className="text-lg font-bold text-slate-800">₹{proposal.fundingDetails.totalFundingRequired.toLocaleString('en-IN')}</span>
                                    <span className="text-sm text-slate-500"> for {proposal.fundingDetails.equityOffered}% Equity</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-8 col-span-full">No business proposals have been published yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProposalsListPage;