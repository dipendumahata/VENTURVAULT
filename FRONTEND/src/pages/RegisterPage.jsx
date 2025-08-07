// FILE: /src/pages/RegisterPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/authSlice';
import AuthFormCard from '../components/shared/AuthFormCard';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Select state from the Redux store
    const { loading, error } = useSelector((state) => state.auth);

    // Component state to manage form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'business' // Default role
    });
    
    // Clear any previous errors when the component loads
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    
    // Handler to update state when user types in an input field
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData))
            .unwrap() // Use .unwrap() to handle the promise returned by the thunk
            .then(() => {
                // On success, navigate to the dashboard
                navigate('/dashboard');
            })
            .catch((err) => {
                // Optional: log the error for debugging. The error is already in the Redux state.
                console.error("Registration failed:", err);
            });
    };

    return (
        <AuthFormCard
            title="Create your Account"
            switchPageLink="/login"
            switchPageText="sign in instead"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Display error message if it exists */}
                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700">I am joining as a...</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                    >
                        <option value="business">Business Owner / Entrepreneur</option>
                        <option value="investor">Investor</option>
                        <option value="advisor">Advisor</option>
                        <option value="banker">Banker</option>
                    </select>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
            </form>
        </AuthFormCard>
    );
};

export default RegisterPage;
