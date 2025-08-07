// FILE: /src/components/layout/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from '../../assets/icons'; // Assuming icons are managed in a central file

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Column 1: Brand */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <BriefcaseIcon className="h-7 w-7 text-teal-500" />
                            <span className="font-bold text-xl text-white">VENTURVAULT</span>
                        </Link>
                        <p className="text-sm">
                            Empowering India's next generation of entrepreneurs through technology, mentorship, and capital.
                        </p>
                    </div>

                    {/* Column 2: Solutions */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Solutions</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/for-founders" className="text-sm hover:text-white transition-colors">For Founders</Link></li>
                            <li><Link to="/for-investors" className="text-sm hover:text-white transition-colors">For Investors</Link></li>
                            <li><Link to="/for-advisors" className="text-sm hover:text-white transition-colors">For Advisors</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/blog" className="text-sm hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="/guides" className="text-sm hover:text-white transition-colors">Founder Guides</Link></li>
                            <li><Link to="/insights" className="text-sm hover:text-white transition-colors">Market Insights</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="text-sm hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section with copyright */}
                <div className="mt-12 border-t border-slate-800 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} VENTURVAULT India. A venture from Kolkata, West Bengal.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
