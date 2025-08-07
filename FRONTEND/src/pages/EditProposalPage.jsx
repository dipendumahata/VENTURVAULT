import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProposalById, updateProposal, clearSelectedProposal } from '../store/dataSlice.js';
import PageLoader from '../components/layout/PageLoader.jsx';
// We would create a reusable ProposalForm component to handle the form UI

const EditProposalPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProposal, loading } = useSelector((state) => state.data);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        dispatch(fetchProposalById(id));
        return () => dispatch(clearSelectedProposal());
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedProposal) {
            setFormData(selectedProposal);
        }
    }, [selectedProposal]);

    const handleSubmit = (updatedData) => {
        dispatch(updateProposal({ id, proposalData: updatedData }))
            .unwrap()
            .then(() => navigate('/my-proposals'));
    };

    if (loading || !formData) return <PageLoader />;

    return (
        <div>
            <h1>Edit Proposal</h1>
            {/* <ProposalForm initialData={formData} onSubmit={handleSubmit} /> */}
            <p>Edit form for proposals would go here.</p>
            <button onClick={() => handleSubmit(formData)}>Update Proposal</button>
            <button onClick={() => navigate('/my-proposals')}>Cancel</button>
        </div>
    );
};

export default EditProposalPage;