import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-teal-600">404</h1>
        <p className="text-2xl font-semibold text-slate-800 mt-4">Page Not Found</p>
        <p className="text-slate-500 mt-2">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
            Go Home
        </Link>
    </div>
);

export default NotFoundPage;