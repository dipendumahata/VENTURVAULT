import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createGig, clearDataError } from '../store/dataSlice.js'; // This import will now work

const CreateGigPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.data);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Legal', // Default category
        price: '',
        deliveryTime: '',
    });

    useEffect(() => {
        // Clear any previous errors when the component loads
        dispatch(clearDataError()); 
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGig(formData))
            .unwrap()
            .then(() => {
                navigate('/my-gigs'); // Redirect to the gigs list on success
            })
            .catch(err => console.error("Failed to create gig:", err));
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">Create a New Gig</h1>
            <p className="mt-2 text-slate-600">Offer a fixed-price service to businesses on the platform.</p>

            <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-xl shadow-lg space-y-6">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">Gig Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                    <p className="mt-2 text-xs text-slate-500">Example: "I will review your 1-page executive summary."</p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                            <option>Legal</option>
                            <option>Financial Review</option>
                            <option>Marketing</option>
                            <option>Business Plan</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price (₹)</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="100" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                    </div>
                    <div>
                        <label htmlFor="deliveryTime" className="block text-sm font-medium text-slate-700">Delivery Time (Days)</label>
                        <input type="number" name="deliveryTime" id="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button type="button" onClick={() => navigate('/my-gigs')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                            {loading ? 'Creating...' : 'Create Gig'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateGigPage;
