import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createLoanProduct } from '../store/dataSlice.js';

const CreateLoanProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.data);
    const [formData, setFormData] = useState({
        productName: '',
        loanType: 'business_loan',
        description: '',
        interestRate: { min: '', max: '' },
        loanAmount: { min: '', max: '' },
        tenure: { min: '', max: '' },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nestedFields = ['interestRate', 'loanAmount', 'tenure'];
        let isNested = false;
        for (const field of nestedFields) {
            if (name.startsWith(field)) {
                const subField = name.split('.')[1];
                setFormData(prev => ({ ...prev, [field]: { ...prev[field], [subField]: value } }));
                isNested = true;
                break;
            }
        }
        if (!isNested) {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createLoanProduct(formData))
            .unwrap()
            .then(() => navigate('/my-loan-products'))
            .catch(err => console.error("Failed to create loan product:", err));
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-slate-900">Post a New Loan Product</h1>
            <p className="mt-1 text-sm text-slate-500">Detail the financial product you are offering to businesses.</p>
            
            <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-xl shadow-lg space-y-8">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                
                <div className="space-y-6">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-slate-700">Product Name</label>
                        <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="loanType" className="block text-sm font-medium text-slate-700">Loan Type</label>
                        <select id="loanType" name="loanType" value={formData.loanType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                            <option value="business_loan">Business Loan</option>
                            <option value="startup_loan">Startup Loan</option>
                            <option value="equipment_loan">Equipment Loan</option>
                            <option value="working_capital">Working Capital</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                        <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                </div>

                <fieldset className="space-y-6 border-t border-gray-200 pt-8">
                    <legend className="text-lg font-medium text-slate-900">Loan Details</legend>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="interestRate.min" className="block text-sm font-medium text-slate-700">Min Interest Rate (%)</label>
                            <input type="number" name="interestRate.min" id="interestRate.min" value={formData.interestRate.min} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="interestRate.max" className="block text-sm font-medium text-slate-700">Max Interest Rate (%)</label>
                            <input type="number" name="interestRate.max" id="interestRate.max" value={formData.interestRate.max} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    {/* Add similar grid divs for Loan Amount and Tenure */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="loanAmount.min" className="block text-sm font-medium text-slate-700">Min Loan Amount ($)</label>
                            <input type="number" name="loanAmount.min" id="loanAmount.min" value={formData.loanAmount.min} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="loanAmount.max" className="block text-sm font-medium text-slate-700">Max Loan Amount ($)</label>
                            <input type="number" name="loanAmount.max" id="loanAmount.max" value={formData.loanAmount.max} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="tenure.min" className="block text-sm font-medium text-slate-700">Min Tenure (months)</label>
                            <input type="number" name="tenure.min" id="tenure.min" value={formData.tenure.min} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="tenure.max" className="block text-sm font-medium text-slate-700">Max Tenure (months)</label>
                            <input type="number" name="tenure.max" id="tenure.max" value={formData.tenure.max} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                </fieldset>

                <div className="flex justify-end pt-5">
                    <button type="button" onClick={() => navigate('/my-loan-products')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={loading} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                        {loading ? 'Posting...' : 'Post Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateLoanProductPage;