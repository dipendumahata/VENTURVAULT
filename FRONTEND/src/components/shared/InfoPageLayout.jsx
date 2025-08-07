import React from 'react';

const InfoPageLayout = ({ title, children }) => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">VENTURVAULT India</h2>
                    <p className="mt-1 text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        {title}
                    </p>
                </div>
                <div className="mt-12 prose prose-lg text-slate-500 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InfoPageLayout;