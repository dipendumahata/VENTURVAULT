import React from 'react';
import InfoPageLayout from '../components/shared/InfoPageLayout.jsx';

const InsightsPage = () => {
    return (
        <InfoPageLayout title="Market Insights">
            <p>
                Leveraging the anonymized data from our platform, this section will provide a unique, data-driven view into the Indian startup ecosystem. Discover which sectors are gaining traction, the average funding asks in different cities, and other trends that can help you make smarter decisions.
            </p>
            <p>
                <em>Our public data dashboard is currently in development.</em>
            </p>
        </InfoPageLayout>
    );
};

export default InsightsPage;