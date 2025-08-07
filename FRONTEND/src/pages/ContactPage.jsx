import React from 'react';
import InfoPageLayout from '../components/shared/InfoPageLayout.jsx';

const ContactPage = () => {
    return (
        <InfoPageLayout title="Contact Us">
            <p>
                We'd love to hear from you. Whether you're a founder with a question, an investor looking to partner, or just want to share feedback, please don't hesitate to reach out.
            </p>
            <ul>
                <li><strong>General Inquiries:</strong> <a href="mailto:hello@bizconnect.com">hello@bizconnect.com</a></li>
                <li><strong>Support:</strong> <a href="mailto:support@bizconnect.com">support@bizconnect.com</a></li>
                <li><strong>Address:</strong> 123 Tech Park, Salt Lake, Kolkata, West Bengal, India</li>
            </ul>
        </InfoPageLayout>
    );
};

export default ContactPage;
