import React from 'react';
import InfoPageLayout from '../components/shared/InfoPageLayout.jsx';

const TermsPage = () => {
    return (
        <InfoPageLayout title="Terms of Service">
            <p>
                By accessing or using the BizConnect platform, you agree to be bound by these terms of service. Please read them carefully.
            </p>
            <p>
                <strong>1. Account Responsibility:</strong> You are responsible for safeguarding your account and for all activities that occur under it.
            </p>
            <p>
                <strong>2. Platform Use:</strong> You agree not to misuse the platform or help anyone else to do so. You agree not to engage in any activity that is fraudulent, misleading, or infringes on others' rights.
            </p>
            <p>
                <strong>3. Disclaimers:</strong> BizConnect is a platform to facilitate connections. We do not endorse any user, business, or investment opportunity and are not responsible for the outcome of any negotiations or investments made through the platform.
            </p>
        </InfoPageLayout>
    );
};

export default TermsPage;