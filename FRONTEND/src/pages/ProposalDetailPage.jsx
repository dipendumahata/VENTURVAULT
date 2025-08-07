import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProposalById, expressInterestInProposal, clearSelectedProposal } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const PitchDeckSection = ({ title, content }) => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-3">{title}</h3>
        <p className="text-slate-600 whitespace-pre-wrap">{content || 'Not provided.'}</p>
    </div>
);

const ProposalDetailPage = () => {
    const { id } = useParams(); // Get proposal ID from the URL
    const dispatch = useDispatch();
    const { selectedProposal: proposal, loading, error } = useSelector((state) => state.data);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(fetchProposalById(id));
        }
        // Cleanup function to clear the proposal from state when leaving the page
        return () => {
            dispatch(clearSelectedProposal());
        };
    }, [id, dispatch]);

    const handleExpressInterest = () => {
        dispatch(expressInterestInProposal(id));
    };
    
    if (loading || !proposal) return <PageLoader />;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    const hasExpressedInterest = proposal.interestedInvestors.includes(user._id);

    return (
        <div className="bg-slate-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg space-y-8">
                        <h1 className="text-3xl font-bold text-slate-900">{proposal.title}</h1>
                        <p className="text-lg text-slate-600">{proposal.description}</p>
                        <PitchDeckSection title="The Problem" content={proposal.pitchDeck.problem} />
                        <PitchDeckSection title="The Solution" content={proposal.pitchDeck.solution} />
                        <PitchDeckSection title="Market Size" content={proposal.pitchDeck.marketSize} />
                        <PitchDeckSection title="Business Model" content={proposal.pitchDeck.businessModel} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-800">The Ask</h2>
                            <div className="mt-4">
                                <p className="text-3xl font-bold text-teal-600">₹{proposal.fundingDetails.totalFundingRequired.toLocaleString('en-IN')}</p>
                                <p className="text-slate-500">for <span className="font-semibold text-slate-700">{proposal.fundingDetails.equityOffered}%</span> equity</p>
                            </div>
                            <div className="mt-6">
                                {user.role === 'investor' && (
                                    <button 
                                        onClick={handleExpressInterest}
                                        disabled={hasExpressedInterest}
                                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {hasExpressedInterest ? 'Interest Sent' : 'Express Interest'}
                                    </button>
                                )}
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-800">Founder</h2>
                            <p className="mt-2 text-slate-700">{proposal.businessId.profile.firstName} {proposal.businessId.profile.lastName}</p>
                            <p className="text-sm text-slate-500">{proposal.businessId.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalDetailPage;
