import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyProposals, publishProposal } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const StatusBadge = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
    const statusClasses = {
        draft: "bg-gray-100 text-gray-800",
        published: "bg-green-100 text-green-800",
        funded: "bg-blue-100 text-blue-800",
        closed: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const MyProposalsPage = () => {
    const dispatch = useDispatch();
    const { myProposals, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchMyProposals());
    }, [dispatch]);

    const handlePublish = (proposalId) => {
        if (window.confirm('Are you sure you want to publish this proposal? It will be visible to all investors.')) {
            dispatch(publishProposal(proposalId));
        }
    };

    if (loading && myProposals.length === 0) return <PageLoader />;

    return (
        <div className="bg-slate-50 min-h-full">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center pb-8 border-b border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Business Proposals</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage, edit, and track the performance of your proposals.</p>
                    </div>
                    <Link to="/proposals/new" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm hover:shadow-md">
                        + Create New Proposal
                    </Link>
                </div>

                {error && <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                
                <div className="mt-8">
                    {myProposals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myProposals.map(proposal => (
                                <div key={proposal._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-slate-800 leading-tight">{proposal.title}</h3>
                                            <StatusBadge status={proposal.status} />
                                        </div>
                                        <p className="text-sm text-slate-500 mt-2">{proposal.category}</p>
                                        <div className="mt-4 flex justify-between items-center text-sm">
                                            <span className="font-semibold text-teal-600">Health: {proposal.healthScore}%</span>
                                            <span className="text-slate-500">{proposal.interestedInvestors.length} Interested</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-3 border-t flex items-center justify-between">
                                        {/* THIS IS THE FIX: The link now points to the correct route */}
                                        <Link to={`/my-proposals/${proposal._id}`} className="text-sm font-semibold text-teal-600 hover:text-teal-800">
                                            Manage
                                        </Link>
                                        {proposal.status === 'draft' && (
                                            <button 
                                                onClick={() => handlePublish(proposal._id)}
                                                className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-green-600 hover:bg-green-700"
                                            >
                                                Publish
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-slate-800">No proposals yet</h3>
                            <p className="mt-2 text-slate-500">Ready to share your big idea? Create your first proposal.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProposalsPage;