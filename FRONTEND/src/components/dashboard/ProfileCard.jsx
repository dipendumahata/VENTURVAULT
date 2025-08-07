import React from 'react';
import { BriefcaseIcon } from '../../assets/icons.jsx';

const ProfileCard = ({ user }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        {/* Placeholder for an avatar image */}
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{user.profile.firstName} {user.profile.lastName}</h3>
                        <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-slate-500">Role</dt>
                            <dd className="mt-1 text-sm text-slate-900 font-semibold capitalize bg-teal-100 text-teal-800 px-2 py-1 rounded-full inline-block">
                                {user.role}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-slate-500">Status</dt>
                            <dd className="mt-1 text-sm text-slate-900">
                                {user.profile.isVerified ? 'Verified' : 'Not Verified'}
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-slate-500">Member Since</dt>
                            <dd className="mt-1 text-sm text-slate-900">
                                {new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
