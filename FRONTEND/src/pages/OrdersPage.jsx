import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.data);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    if (loading) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">
                {user.role === 'advisor' ? 'Client Orders' : 'My Orders'}
            </h1>
            {error && <p className="text-red-500 mt-4 p-3 bg-red-100 rounded-md">{error}</p>}
            <div className="mt-8 bg-white rounded-xl shadow-lg">
                 <div className="p-6">
                    {orders.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {orders.map(order => (
                                <li key={order._id} className="py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold text-teal-700">{order.gigId.title}</h3>
                                            <p className="text-sm text-slate-600 mt-1">
                                                {user.role === 'advisor' 
                                                    ? `Client: ${order.businessId.profile.firstName} ${order.businessId.profile.lastName}`
                                                    : `Advisor: ${order.advisorId.profile.firstName} ${order.advisorId.profile.lastName}`
                                                }
                                            </p>
                                        </div>
                                        <div className="text-right">
                                             <p className="text-lg font-bold text-slate-800">₹{order.totalAmount}</p>
                                             <p className="text-sm text-slate-500 capitalize">{order.status.replace('_', ' ')}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 text-center py-8">No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;