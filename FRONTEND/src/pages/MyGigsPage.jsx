import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyGigs } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const MyGigsPage = () => {
    const dispatch = useDispatch();
    const { gigs, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchMyGigs());
    }, [dispatch]);

    if (loading && gigs.length === 0) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Manage My Gigs</h1>
                <Link to="/gigs/new" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm hover:shadow-md">
                    + Create New Gig
                </Link>
            </div>
            {error && <p className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</p>}
            <div className="mt-8 bg-white rounded-xl shadow-lg">
                <div className="p-6">
                    {gigs.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {gigs.map(gig => (
                                <li key={gig._id} className="py-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-teal-700">{gig.title}</h3>
                                        <p className="text-sm text-slate-600 mt-1">Price: <span className="font-medium">₹{gig.price}</span> | Category: <span className="font-medium">{gig.category}</span></p>
                                    </div>
                                    <div>
                                        {/* This is now a functional Link */}
                                        <Link to={`/gigs/${gig._id}/edit`} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                            Edit
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 text-center py-8">You have not created any gigs yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyGigsPage;
