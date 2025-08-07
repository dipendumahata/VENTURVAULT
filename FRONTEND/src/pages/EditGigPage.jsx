import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGigById, updateGig, clearSelectedItem } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';
import { motion } from 'framer-motion';

// Live Preview Component
const GigPreviewCard = ({ formData }) => (
    <motion.div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="p-6">
            <span className="text-sm font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
                {formData?.category || 'Category'}
            </span>
            <h3 className="mt-3 text-xl font-bold text-slate-800">
                {formData?.title || 'Your Gig Title'}
            </h3>
            <p className="text-sm text-slate-600 mt-2 h-16 overflow-hidden">
                {formData?.description || 'Your detailed gig description will appear here.'}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-lg font-bold text-slate-800">
                    ₹{formData?.price ? parseInt(formData.price).toLocaleString('en-IN') : '0'}
                </span>
            </div>
        </div>
    </motion.div>
);


const EditGigPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedItem: gig, loading, error } = useSelector((state) => state.data);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        dispatch(fetchGigById(id));
        return () => dispatch(clearSelectedItem());
    }, [id, dispatch]);

    useEffect(() => {
        if (gig) {
            setFormData(gig);
        }
    }, [gig]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateGig({ id, gigData: formData }))
            .unwrap()
            .then(() => navigate('/my-gigs'))
            .catch(err => console.error("Failed to update gig:", err));
    };

    if (loading || !formData) return <PageLoader />;

    return (
        <div className="bg-slate-50 min-h-full">
            <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Form Section */}
                <motion.div 
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl font-bold text-slate-900">Edit Gig</h1>
                    <p className="mt-1 text-sm text-slate-500">Update the details of your service offering. Changes will be reflected in the live preview.</p>

                    <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-xl shadow-lg space-y-6">
                        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                        
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Gig Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                            <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                                    <option>Legal</option>
                                    <option>Financial Review</option>
                                    <option>Marketing</option>
                                    <option>Business Plan</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price (₹)</label>
                                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="100" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label htmlFor="deliveryTime" className="block text-sm font-medium text-slate-700">Delivery Time (Days)</label>
                                <input type="number" name="deliveryTime" id="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>

                        <div className="flex justify-end pt-5">
                            <button type="button" onClick={() => navigate('/my-gigs')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={loading} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Live Preview Section */}
                <motion.div 
                    className="lg:col-span-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="sticky top-28">
                        <h2 className="text-lg font-semibold text-slate-800">Live Preview</h2>
                        <div className="mt-4">
                            <GigPreviewCard formData={formData} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EditGigPage;