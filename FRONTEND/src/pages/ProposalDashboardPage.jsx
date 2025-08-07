import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProposalById, acceptInvestorInterest, clearSelectedProposal } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const ProposalDashboardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProposal: proposal, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        if (id) {
            dispatch(fetchProposalById(id));
        }
        return () => {
            dispatch(clearSelectedProposal());
        };
    }, [id, dispatch]);

    const handleAcceptInterest = (investorId) => {
        dispatch(acceptInvestorInterest({ proposalId: id, investorId }))
            .unwrap()
            .then((dealRoom) => {
                // On success, navigate to the newly created deal room
                navigate(`/deal-rooms/${dealRoom._id}`);
            })
            .catch(err => console.error("Failed to accept interest:", err));
    };

    if (loading || !proposal) return <PageLoader />;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="bg-slate-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Proposal Details */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                        <h1 className="text-3xl font-bold text-slate-900">{proposal.title}</h1>
                        <p className="mt-2 text-lg text-slate-600">{proposal.description}</p>
                        {/* You can add more proposal details here */}
                    </div>

                    {/* Interested Investors Sidebar */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold text-slate-800 border-b pb-3">Interested Investors</h2>
                        <div className="mt-4 space-y-4">
                            {proposal.interestedInvestors.length > 0 ? (
                                proposal.interestedInvestors.map(investor => (
                                    <div key={investor._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-slate-700">{investor.profile.firstName} {investor.profile.lastName}</p>
                                            <p className="text-sm text-slate-500">{investor.email}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleAcceptInterest(investor._id)}
                                            className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-4">No investors have shown interest yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalDashboardPage;
