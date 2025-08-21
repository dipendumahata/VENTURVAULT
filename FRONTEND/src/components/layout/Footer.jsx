import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from '../../assets/icons.jsx'; // Assuming icons are in this file

const Footer = () => {
    // Helper function to scroll to the top of the page on link click
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

                    {/* Brand Section (takes full width on mobile) */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2 mb-4">
                            <BriefcaseIcon className="h-8 w-8 text-teal-500" />
                            <span className="font-bold text-2xl text-white">VENTURVAULT</span>
                        </Link>
                        <p className="text-sm leading-6">
                            Empowering India's next generation of entrepreneurs through technology, mentorship, and capital.
                        </p>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Solutions</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/for-founders" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">For Founders</Link></li>
                            <li><Link to="/for-investors" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">For Investors</Link></li>
                            <li><Link to="/for-advisors" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">For Advisors</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/blog" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Blog</Link></li>
                            <li><Link to="/guides" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Founder Guides</Link></li>
                            <li><Link to="/insights" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Market Insights</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/about" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Careers</Link></li>
                            <li><Link to="/contact" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/privacy" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} VENTURVAULT India. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;