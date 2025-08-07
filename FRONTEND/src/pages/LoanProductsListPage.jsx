import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllLoanProducts } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const LoanProductsListPage = () => {
    const dispatch = useDispatch();
    const { loanProducts, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchAllLoanProducts());
    }, [dispatch]);

    if (loading) return <PageLoader />;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">Browse Loan Products</h1>
            <p className="mt-1 text-sm text-slate-500">Explore debt financing options offered by our banking partners.</p>
            {error && <p className="text-red-500 mt-4 p-3 bg-red-100 rounded-md">{error}</p>}
            <div className="mt-8 space-y-6">
                {loanProducts.length > 0 ? (
                    loanProducts.map(product => (
                        <div key={product._id} className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-teal-700">{product.productName}</h3>
                            <p className="text-sm text-slate-500 mt-1">Offered by: A Partner Bank</p>
                            <p className="text-slate-600 mt-3">{product.description}</p>
                            <div className="mt-4 flex items-center space-x-6">
                                <div>
                                    <p className="text-sm text-slate-500">Interest Rate</p>
                                    <p className="font-semibold text-slate-800">{product.interestRate.min}% - {product.interestRate.max}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Loan Amount</p>
                                    <p className="font-semibold text-slate-800">₹{product.loanAmount.min.toLocaleString('en-IN')} - ₹{product.loanAmount.max.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-8">No loan products have been posted yet.</p>
                )}
            </div>
        </div>
    );
};

export default LoanProductsListPage;