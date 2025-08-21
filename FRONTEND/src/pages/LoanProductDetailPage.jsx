import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoanProductById, clearSelectedItem } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const LoanProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedItem: product, loading } = useSelector((state) => state.data);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchLoanProductById(id));
        return () => dispatch(clearSelectedItem());
    }, [id, dispatch]);

    if (loading || !product) return <PageLoader />;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <span className="text-sm font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full capitalize">
                {product.loanType.replace('_', ' ')}
            </span>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">{product.productName}</h1>
            <p className="mt-2 text-lg text-slate-500">Offered by a VENTURVAULT Banking Partner</p>
            <div className="mt-8 prose prose-lg max-w-none text-slate-600">
                <p>{product.description}</p>
            </div>
            <div className="mt-8 p-6 bg-slate-100 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-sm text-slate-500">Interest Rate</p>
                    <p className="text-2xl font-bold text-slate-800">{product.interestRate.min}% - {product.interestRate.max}%</p>
                </div>
                <div>
                    <p className="text-sm text-slate-500">Loan Amount</p>
                    <p className="text-2xl font-bold text-slate-800">₹{product.loanAmount.min.toLocaleString('en-IN')} - ₹{product.loanAmount.max.toLocaleString('en-IN')}</p>
                </div>
            </div>
            
            {/* --- THIS IS THE FIX --- */}
            {/* The "Apply Now" button is now only rendered for business owners */}
            {user.role === 'business' && (
                <div className="mt-8">
                    <Link 
                        to={`/loan-products/${product._id}/apply`} 
                        state={{ product: product }}
                        className="w-full block text-center py-3 px-4 rounded-lg text-white font-semibold bg-teal-600 hover:bg-teal-700 transition-transform transform hover:scale-105"
                    >
                        Apply Now
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LoanProductDetailPage;