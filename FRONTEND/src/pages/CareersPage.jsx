import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const jobOpenings = [
    {
        id: 1,
        title: 'Senior MERN Stack Developer',
        location: 'Kolkata, West Bengal (Remote Friendly)',
        department: 'Engineering',
        description: "Build and maintain the core backend and frontend of the BizConnect platform. You will work with Node.js, Express, MongoDB, and React to implement new, high-impact features like our AI matching engine and interactive Deal Rooms.",
        requirements: [
            "5+ years of professional experience with the MERN stack.",
            "Deep understanding of Socket.IO for real-time applications.",
            "Proficiency with Redux Toolkit for state management.",
            "Strong skills in Tailwind CSS for building responsive UIs."
        ]
    },
    {
        id: 2,
        title: 'UI/UX Product Designer',
        location: 'Kolkata, West Bengal',
        department: 'Design',
        description: "Design intuitive, beautiful, and user-centric experiences for all user roles on our platform. You will conduct user research, create wireframes and high-fidelity prototypes, and work closely with developers to bring your vision to life.",
        requirements: [
            "A strong portfolio showcasing your work on web applications.",
            "Proficiency in modern design tools like Figma or Sketch.",
            "A deep understanding of responsive design principles and user-centered design.",
        ]
    },
    {
        id: 3,
        title: 'Business Development Manager',
        location: 'Mumbai, Maharashtra',
        department: 'Growth',
        description: "Drive the growth of the BizConnect ecosystem by onboarding new investors, advisors, and banking partners. You will build and maintain key relationships and be the face of BizConnect in the financial community.",
        requirements: [
            "Proven experience in sales or business development, preferably within the startup or financial services industry.",
            "Excellent communication and negotiation skills.",
            "A strong network within the investment community is a plus.",
        ]
    }
];

const CareersPage = () => {
    const [selectedJob, setSelectedJob] = useState(jobOpenings[0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="bg-slate-50">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">Join Our Mission</h2>
                    <p className="mt-1 text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Build the Future of Indian Startups
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-slate-500">
                        We're looking for passionate, talented individuals to join us in empowering the next generation of entrepreneurs.
                    </p>
                </motion.div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Job List */}
                    <motion.div 
                        className="lg:col-span-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h3 className="text-xl font-bold text-slate-800">Open Positions</h3>
                        <div className="mt-4 space-y-3">
                            {jobOpenings.map(job => (
                                <motion.button
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${selectedJob.id === job.id ? 'bg-white border-teal-500 shadow-lg scale-105' : 'bg-white hover:bg-gray-50 border-gray-200'} border`}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <p className="font-semibold text-slate-900">{job.title}</p>
                                    <p className="text-sm text-slate-500">{job.location}</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Job Details */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {selectedJob && (
                                <motion.div
                                    key={selectedJob.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100"
                                >
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-800 bg-teal-100 rounded-full">{selectedJob.department}</span>
                                    <h3 className="mt-4 text-2xl font-bold text-slate-900">{selectedJob.title}</h3>
                                    <p className="mt-1 text-sm text-slate-500">{selectedJob.location}</p>
                                    
                                    <div className="mt-6 prose prose-slate max-w-none">
                                        <p>{selectedJob.description}</p>
                                        <h4 className="font-semibold mt-6">Key Requirements:</h4>
                                        <ul>
                                            {selectedJob.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <motion.a 
                                        href={`mailto:careers@venturvault.com?subject=Application for ${selectedJob.title}`} 
                                        className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600"
                                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(20, 184, 166, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Apply Now
                                    </motion.a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;