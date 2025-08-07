import React from 'react';
import InfoPageLayout from '../components/shared/InfoPageLayout.jsx';

const PrivacyPage = () => {
    return (
        <InfoPageLayout title="Privacy Policy">
            <p>
                Your privacy is critically important to us. At BizConnect, we have a few fundamental principles:
            </p>
            <ul>
                <li>We are thoughtful about the personal information we ask you to provide and the personal information that we collect about you through the operation of our services.</li>
                <li>We store personal information for only as long as we have a reason to keep it.</li>
                <li>We aim for full transparency on how we gather, use, and share your personal information.</li>
            </ul>
            <p>This Privacy Policy applies to information that we collect about you when you use our website.</p>
        </InfoPageLayout>
    );
};

export default PrivacyPage;