import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from '../../assets/icons';

const AuthFormCard = ({ children, title, switchPageLink, switchPageText }) => (
    <div className="min-h-full bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <BriefcaseIcon className="mx-auto h-12 w-auto text-teal-600" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">{title}</h2>
            <p className="mt-2 text-center text-sm text-slate-600">
                Or{' '}
                <Link to={switchPageLink} className="font-medium text-teal-600 hover:text-teal-500">
                    {switchPageText}
                </Link>
            </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
                {children}
            </div>
        </div>
    </div>
);

export default AuthFormCard;