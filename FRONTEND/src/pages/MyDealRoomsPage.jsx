import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyDealRooms } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const MyDealRoomsPage = () => {
    const dispatch = useDispatch();
    const { dealRooms, loading, error } = useSelector((state) => state.data);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMyDealRooms());
    }, [dispatch]);

    if (loading && dealRooms.length === 0) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="pb-8 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-slate-900">My Deal Rooms</h1>
                <p className="mt-1 text-sm text-slate-500">All your active conversations with founders and investors.</p>
            </div>
            {error && <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
            <div className="mt-8">
                {dealRooms.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {dealRooms.map((room) => {
                                const otherParty = user._id === room.businessId._id ? room.investorId : room.businessId;
                                return (
                                    <li key={room._id}>
                                        <Link to={`/deal-rooms/${room._id}`} className="block hover:bg-gray-50">
                                            <div className="p-4 sm:p-6 flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-teal-600 truncate">
                                                        {otherParty.profile.firstName} {otherParty.profile.lastName}
                                                    </p>
                                                    <p className="text-sm text-slate-800 font-medium mt-1">
                                                        {room.proposalId.title}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(room.updatedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-800">No Active Deal Rooms</h3>
                        <p className="mt-2 text-slate-500">When a business owner accepts your interest, a deal room will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDealRoomsPage;