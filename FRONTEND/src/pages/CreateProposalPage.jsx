import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProposal } from '../store/dataSlice.js';

const CreateProposalPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.data);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Technology',
        fundingDetails: { totalFundingRequired: '', equityOffered: '' },
        pitchDeck: {
            problem: '',
            solution: '',
            marketSize: '',
            businessModel: '',
            competitiveAdvantage: '',
            team: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'totalFundingRequired' || name === 'equityOffered') {
            setFormData(prev => ({ ...prev, fundingDetails: { ...prev.fundingDetails, [name]: value } }));
        } else if (Object.keys(formData.pitchDeck).includes(name)) {
            setFormData(prev => ({ ...prev, pitchDeck: { ...prev.pitchDeck, [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProposal(formData))
            .unwrap()
            .then(() => navigate('/my-proposals'))
            .catch(err => console.error("Failed to create proposal:", err));
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-slate-900">Create a New Proposal</h1>
            <p className="mt-1 text-sm text-slate-500">This is your pitch. Fill out each section to generate your proposal health score.</p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                {/* Section 1: The Basics */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-slate-800">1. The Basics</h2>
                    <div className="mt-6 grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Proposal Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Short Summary</label>
                            <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                    </div>
                </div>

                {/* Section 2: The Pitch Deck */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-slate-800">2. The Pitch Deck</h2>
                    <div className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="problem" className="block text-sm font-medium text-slate-700">The Problem You're Solving</label>
                            <textarea name="problem" id="problem" rows="3" value={formData.pitchDeck.problem} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="solution" className="block text-sm font-medium text-slate-700">Your Solution</label>
                            <textarea name="solution" id="solution" rows="3" value={formData.pitchDeck.solution} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        {/* Add other pitch deck fields here... */}
                        <div>
                            <label htmlFor="marketSize" className="block text-sm font-medium text-slate-700">Market Size</label>
                            <textarea name="marketSize" id="marketSize" rows="3" value={formData.pitchDeck.marketSize} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="businessModel" className="block text-sm font-medium text-slate-700">Business Model</label>
                            <textarea name="businessModel" id="businessModel" rows="3" value={formData.pitchDeck.businessModel} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="competitiveAdvantage" className="block text-sm font-medium text-slate-700">Competitive Advantage</label>
                            <textarea name="competitiveAdvantage" id="competitiveAdvantage" rows="3" value={formData.pitchDeck.competitiveAdvantage} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="team" className="block text-sm font-medium text-slate-700">Your Team</label>
                            <textarea name="team" id="team" rows="3" value={formData.pitchDeck.team} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                    </div>
                </div>

                {/* Section 3: The Ask */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-slate-800">3. The Ask</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="totalFundingRequired" className="block text-sm font-medium text-slate-700">Funding Required (₹)</label>
                            <input type="number" name="totalFundingRequired" id="totalFundingRequired" value={formData.fundingDetails.totalFundingRequired} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="equityOffered" className="block text-sm font-medium text-slate-700">Equity Offered (%)</label>
                            <input type="number" name="equityOffered" id="equityOffered" value={formData.fundingDetails.equityOffered} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                </div>

                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

                <div className="flex justify-end pt-5">
                    <button type="button" onClick={() => navigate('/my-proposals')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={loading} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                        {loading ? 'Submitting...' : 'Submit Proposal'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProposalPage;