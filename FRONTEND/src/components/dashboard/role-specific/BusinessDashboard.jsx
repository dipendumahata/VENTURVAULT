import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProposals, fetchAllGigs, fetchAllLoanProducts } from '../../../store/dataSlice.js';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessDashboard = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('browseProposals');
    const { proposals, gigs, loanProducts, loading } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchAllProposals());
        dispatch(fetchAllGigs());
        dispatch(fetchAllLoanProducts());
    }, [dispatch]);

    const tabs = [
        { id: 'browseProposals', label: 'Browse Proposals' },
        { id: 'browseGigs', label: 'Browse Gigs' },
        { id: 'browseLoans', label: 'Browse Loans' },
    ];

    const renderContent = () => {
        if (loading) return <p className="text-center p-8 text-slate-500">Loading...</p>;
        
        switch (activeTab) {
            case 'browseProposals':
                return proposals.length > 0 ? (
                    proposals.slice(0, 5).map(p => ( // Show first 5 as a preview
                        <Link to={`/proposals/${p._id}`} key={p._id} className="block p-4 border-b hover:bg-gray-50/50 transition-colors">
                            <p className="font-semibold text-slate-800">{p.title}</p>
                            <p className="text-sm text-slate-500">By: {p.businessId.profile.firstName}</p>
                        </Link>
                    ))
                ) : <p className="text-center p-8 text-slate-500">No proposals published yet.</p>;
            case 'browseGigs':
                return gigs.length > 0 ? (
                    gigs.slice(0, 5).map(g => (
                        <Link to="/gigs" key={g._id} className="block p-4 border-b hover:bg-gray-50/50 transition-colors">
                            <p className="font-semibold text-slate-800">{g.title}</p>
                            <p className="text-sm text-slate-500">Price: ₹{g.price}</p>
                        </Link>
                    ))
                ) : <p className="text-center p-8 text-slate-500">No advisory gigs available.</p>;
            case 'browseLoans':
                return loanProducts.length > 0 ? (
                    loanProducts.slice(0, 5).map(l => (
                        <Link to="/loan-products" key={l._id} className="block p-4 border-b hover:bg-gray-50/50 transition-colors">
                            <p className="font-semibold text-slate-800">{l.productName}</p>
                            <p className="text-sm text-slate-500">Type: {l.loanType.replace('_', ' ')}</p>
                        </Link>
                    ))
                ) : <p className="text-center p-8 text-slate-500">No loan products available.</p>;
            default:
                return null;
        }
    };

    return (
        <motion.div 
            className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="p-4 border-b border-gray-200/50">
                <nav className="flex space-x-2">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'text-teal-600' : 'text-slate-500 hover:text-slate-700'} relative px-3 py-2 font-medium text-sm rounded-md transition-colors`}>
                            {activeTab === tab.id && (<motion.span layoutId="bubble" className="absolute inset-0 z-10 bg-teal-100 mix-blend-multiply" style={{ borderRadius: 8 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />)}
                            <span className="relative z-20">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
            <div className="p-2 max-h-[60vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default BusinessDashboard;
