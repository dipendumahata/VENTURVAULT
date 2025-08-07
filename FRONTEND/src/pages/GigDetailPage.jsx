import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGigById, clearSelectedItem } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const GigDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedItem: gig, loading } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchGigById(id));
        return () => dispatch(clearSelectedItem());
    }, [id, dispatch]);

    if (loading || !gig) return <PageLoader />;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <span className="text-sm font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">{gig.category}</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">{gig.title}</h1>
            <p className="mt-2 text-lg text-slate-500">Offered by {gig.advisorId.profile.firstName} {gig.advisorId.profile.lastName}</p>
            <div className="mt-8 prose prose-lg">
                <p>{gig.description}</p>
            </div>
            <div className="mt-8 p-6 bg-slate-100 rounded-lg">
                <p className="text-2xl font-bold text-slate-800">Price: ₹{gig.price.toLocaleString('en-IN')}</p>
                <button className="mt-4 w-full py-3 px-4 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700">Purchase Gig</button>
            </div>
        </div>
    );
};

export default GigDetailPage;