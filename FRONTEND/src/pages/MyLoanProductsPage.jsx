import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyLoanProducts } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';

const MyLoanProductsPage = () => {
    const dispatch = useDispatch();
    const { myLoanProducts, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchMyLoanProducts());
    }, [dispatch]);

    if (loading && myLoanProducts.length === 0) return <PageLoader />;
    
    return (
        <div className="bg-slate-50 min-h-full">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center pb-8 border-b border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Loan Products</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage all loan products you have posted on the platform.</p>
                    </div>
                    <Link to="/loan-products/new" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700">
                        + Post New Loan Product
                    </Link>
                </div>
                
                {error && <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Loan Type</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Interest Rate</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {myLoanProducts.map((product) => (
                                            <tr key={product._id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{product.productName}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">{product.loanType.replace('_', ' ')}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.interestRate.min}% - {product.interestRate.max}%</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {product.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a href="#" className="text-teal-600 hover:text-teal-900">Edit</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {myLoanProducts.length === 0 && <p className="text-center py-8 text-gray-500">No loan products found.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLoanProductsPage;
