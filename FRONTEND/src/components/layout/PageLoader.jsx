import React from 'react';

const PageLoader = () => (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
    </div>
);

export default PageLoader;