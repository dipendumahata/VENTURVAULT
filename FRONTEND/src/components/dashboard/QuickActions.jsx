// FILE: /src/components/dashboard/QuickActions.jsx (FIXED)

import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = ({ userRole }) => {
    let actions = [];

    // Define actions based on the user's role
    switch (userRole) {
        case 'business':
            actions = [
                { name: 'Create New Proposal', link: '/proposals/new' },
                { name: 'Manage My Proposals', link: '/my-proposals' },
            ];
            break;
        case 'investor':
            actions = [
                { name: 'View My Portfolio', link: '/portfolio' },
            ];
            break;
        case 'advisor':
            actions = [
                { name: 'Manage My Gigs', link: '/my-gigs' },
                { name: 'View Client Orders', link: '/orders' },
            ];
            break;
        case 'banker': // ADDED THIS CASE
            actions = [
                { name: 'Post New Loan Product', link: '/loan-products/new' },
                { name: 'Manage My Loan Products', link: '/my-loan-products' },
            ];
            break;
        default:
            // Fallback for 'user' role or any other case
            actions = [{ name: 'Edit Profile', link: '/profile' }];
    }

    return (
        <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                    {actions.map((action) => (
                        <Link
                            key={action.name}
                            to={action.link}
                            className="block w-full text-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            {action.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuickActions;