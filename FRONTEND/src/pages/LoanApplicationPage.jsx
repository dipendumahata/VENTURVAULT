import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { applyForLoan } from '../store/dataSlice.js';

const LoanApplicationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { product } = location.state || {}; // Get product details passed from the previous page
    const { loading, error } = useSelector((state) => state.data);

    const [applicationDetails, setApplicationDetails] = useState('');
    // In a real app, you would have state for file uploads:
    // const [files, setFiles] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(applyForLoan({ productId: id, applicationData: { applicationDetails } }))
            .unwrap()
            .then(() => {
                alert('Application submitted successfully!');
                navigate('/dashboard'); // Redirect after success
            })
            .catch(err => console.error("Failed to submit application:", err));
    };

    if (!product) {
        // Handle case where user navigates directly to this page
        return <div className="text-center py-20">Loan product details not found. Please go back and select a loan to apply for.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-slate-900">Apply for Loan</h1>
            <p className="mt-2 text-lg text-slate-600">You are applying for: <span className="font-semibold text-teal-700">{product.productName}</span></p>

            <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-xl shadow-lg space-y-6">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                
                <div>
                    <label htmlFor="applicationDetails" className="block text-sm font-medium text-slate-700">Application Details</label>
                    <textarea 
                        name="applicationDetails" 
                        id="applicationDetails" 
                        rows="5" 
                        value={applicationDetails} 
                        onChange={(e) => setApplicationDetails(e.target.value)} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Provide a brief summary of why you need this loan and how you plan to use the funds."
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Upload Documents</label>
                    <div className="mt-1 p-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="text-center">
                            {/* This is a placeholder for a real file upload component */}
                            <p className="text-sm text-slate-500">Drag 'n' drop some files here, or click to select files</p>
                            <p className="text-xs text-slate-400">Business Plan, Bank Statements, etc.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-5">
                    <button type="button" onClick={() => navigate(-1)} className="bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoanApplicationPage;
