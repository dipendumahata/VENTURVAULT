import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGigs } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const GigsListPage = () => {
    const dispatch = useDispatch();
    const { gigs, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchAllGigs());
    }, [dispatch]);

    if (loading) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">Browse Advisory Gigs</h1>
            <p className="mt-1 text-sm text-slate-500">Find fixed-price services from expert advisors to help grow your business.</p>
            {error && <p className="text-red-500 mt-4 p-3 bg-red-100 rounded-md">{error}</p>}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gigs.length > 0 ? (
                    gigs.map(gig => (
                        <div key={gig._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                            <div className="p-6">
                                <span className="text-sm font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">{gig.category}</span>
                                <h3 className="mt-3 text-xl font-bold text-slate-800">{gig.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">By: {gig.advisorId.profile.firstName} {gig.advisorId.profile.lastName}</p>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <span className="text-lg font-bold text-slate-800">₹{gig.price.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-8 col-span-full">No advisory gigs have been posted yet.</p>
                )}
            </div>
        </div>
    );
};

export default GigsListPage;