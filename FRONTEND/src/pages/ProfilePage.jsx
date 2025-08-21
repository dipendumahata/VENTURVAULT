// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../store/authSlice.js';
import { fetchInvestorProfile, updateInvestorProfile } from '../store/dataSlice.js';
import { motion } from 'framer-motion';
import { User, Briefcase, Settings } from 'lucide-react';

// Reusable card section
const ProfileSection = ({ title, Icon, children }) => (
  <motion.div
    className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center gap-2 bg-teal-50 px-6 py-4 border-b">
      <Icon size={18} className="text-teal-600" />
      <h2 className="text-lg font-semibold text-teal-700">{title}</h2>
    </div>
    <div className="p-6 space-y-4">
      {children}
    </div>
  </motion.div>
);

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { investorProfile } = useSelector((state) => state.data);

  const [coreProfile, setCoreProfile] = useState({
    firstName: '', lastName: '', phone: '', location: '', linkedin: '', bio: ''
  });

  const [invProfile, setInvProfile] = useState({
    investorType: 'individual', minInvestment: '', maxInvestment: '', preferredSectors: ''
  });

  useEffect(() => {
    if (user) {
      setCoreProfile({
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        phone: user.profile.phone || '',
        location: user.profile.location || '',
        linkedin: user.profile.linkedin || '',
        bio: user.profile.bio || ''
      });

      if (user.role === 'investor') {
        dispatch(fetchInvestorProfile());
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (investorProfile) {
      setInvProfile({
        investorType: investorProfile.investorType,
        minInvestment: investorProfile.investmentCapacity?.minInvestment || '',
        maxInvestment: investorProfile.investmentCapacity?.maxInvestment || '',
        preferredSectors: investorProfile.preferredSectors?.join(', ') || ''
      });
    }
  }, [investorProfile]);

  const handleCoreChange = (e) => setCoreProfile({ ...coreProfile, [e.target.name]: e.target.value });
  const handleInvestorChange = (e) => setInvProfile({ ...invProfile, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(coreProfile));
    if (user.role === 'investor') {
      dispatch(updateInvestorProfile({
        investorType: invProfile.investorType,
        investmentCapacity: {
          minInvestment: invProfile.minInvestment,
          maxInvestment: invProfile.maxInvestment
        },
        preferredSectors: invProfile.preferredSectors.split(',').map(s => s.trim()),
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* PERSONAL */}
        <ProfileSection title="Personal Information" Icon={User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600">First Name</label>
              <input
                type="text" name="firstName" value={coreProfile.firstName} onChange={handleCoreChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">Last Name</label>
              <input
                type="text" name="lastName" value={coreProfile.lastName} onChange={handleCoreChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">Phone</label>
            <input
              type="text" name="phone" value={coreProfile.phone} onChange={handleCoreChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">Location</label>
            <input
              type="text" name="location" value={coreProfile.location} onChange={handleCoreChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">LinkedIn URL</label>
            <input
              type="url" name="linkedin" value={coreProfile.linkedin} onChange={handleCoreChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">Bio / Summary</label>
            <textarea
              name="bio" rows="4" value={coreProfile.bio} onChange={handleCoreChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
              placeholder="A short intro..."
            />
          </div>
        </ProfileSection>

        {/* INVESTOR ONLY */}
        {user.role === 'investor' && (
          <ProfileSection title="Investor Profile" Icon={Briefcase}>
            <div>
              <label className="block text-sm font-medium text-slate-600">Investor Type</label>
              <select
                name="investorType" value={invProfile.investorType} onChange={handleInvestorChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
              >
                <option value="individual">Individual</option>
                <option value="angel">Angel Investor</option>
                <option value="vc">Venture Capital</option>
                <option value="private_equity">Private Equity</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600">Min Investment (₹)</label>
                <input
                  type="number" name="minInvestment" value={invProfile.minInvestment} onChange={handleInvestorChange}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">Max Investment (₹)</label>
                <input
                  type="number" name="maxInvestment" value={invProfile.maxInvestment} onChange={handleInvestorChange}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">Preferred Sectors</label>
              <input
                type="text" name="preferredSectors" value={invProfile.preferredSectors} onChange={handleInvestorChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:border-teal-500 focus:ring-teal-200"
                placeholder="comma separated"
              />
            </div>
          </ProfileSection>
        )}

        {/* save btn */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
