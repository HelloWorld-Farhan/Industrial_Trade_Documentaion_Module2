import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, Camera, KeyRound, ArrowRight, CheckCircle2, ArrowLeft, Lock, Laptop, Key } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

type ProfileView = 'details' | 'security' | 'otp' | 'new_password' | 'success';

export default function SettingsPage() {
  const [name, setName] = useState('Emily Jordan');
  const [view, setView] = useState<ProfileView>('details');
  const [direction, setDirection] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic
  };

  const navigateTo = (newView: ProfileView, dir: number) => {
    setDirection(dir);
    setView(newView);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`settings-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`settings-otp-${index - 1}`)?.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join('').length === 6) {
      navigateTo('new_password', 1);
    }
  };

  const saveNewPassword = () => {
    navigateTo('success', 1);
    setTimeout(() => {
      navigateTo('security', -1);
      setOtp(['', '', '', '', '', '']);
    }, 2000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 h-full overflow-y-auto relative">
      <TopHeader searchPlaceholder="Search settings, profile, security..." />

      <div className="flex-1 flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-5xl mt-4 md:mt-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          
          {/* Left Panel: Profile Summary (Persistent) */}
          <div className="bg-white w-full md:w-[320px] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center pt-10 pb-8 px-6 shrink-0 sticky top-8">
            <div className="relative mb-5 cursor-pointer group" onClick={handleImageUploadClick}>
              <div className="w-[100px] h-[100px] rounded-full bg-[#FFEBF0] text-[#E11D48] flex items-center justify-center font-bold text-3xl shadow-sm ring-[6px] ring-white relative overflow-hidden transition-all group-hover:ring-rose-100">
                <span>EJ</span>
              </div>
              {/* Permanent Camera Icon */}
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md z-10 text-slate-600 group-hover:text-[#E11D48] transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              {/* Shield Icon */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#059669] border-[3px] border-white rounded-full flex items-center justify-center shadow-sm z-10">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg" 
              />
            </div>
            <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">{name}</h2>
            <p className="text-[13px] text-slate-500 font-medium mt-1">Chief Customs Officer</p>
            <div className="w-full h-px bg-slate-100 my-6"></div>
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigateTo('details', view === 'security' ? -1 : 1)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-colors ${view === 'details' ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <User className="w-4 h-4" />
                Account Settings
              </button>
              <button 
                onClick={() => navigateTo('security', view === 'details' ? 1 : -1)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-colors ${view === 'security' || view === 'otp' || view === 'new_password' || view === 'success' ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <ShieldCheck className="w-4 h-4" />
                Security & Password
              </button>
            </div>
          </div>

          {/* Right Panel: Dynamic Content */}
          <div className="bg-white flex-1 w-full rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col overflow-hidden min-h-[540px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              
              {/* --- ACCOUNT DETAILS VIEW --- */}
              {view === 'details' && (
                <motion.div
                  key="details"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col h-full absolute inset-0"
                >
                  <div className="px-8 py-8 bg-white flex-1 overflow-y-auto custom-scrollbar">
                    <form id="profile-form" onSubmit={handleSave} className="space-y-10 max-w-xl">
                      <div className="space-y-6">
                        <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-4">
                          <User className="w-4 h-4" /> ACCOUNT INFORMATION
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-2">Full Name</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-[15px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-2">Email Address</label>
                              <input
                                type="email"
                                value="emily.jordan@aerologix.com"
                                readOnly
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[15px] font-medium text-slate-500 focus:outline-none cursor-not-allowed shadow-inner"
                              />
                            </div>
                            <div>
                              <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-2">Phone Number</label>
                              <input
                                type="text"
                                value="+1 (555) 019-2834"
                                readOnly
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-[15px] font-medium text-slate-500 focus:outline-none cursor-not-allowed shadow-inner"
                              />
                            </div>
                          </div>
                          <p className="text-[12px] text-slate-400 font-medium px-1">Email and phone number are managed by IT and cannot be changed.</p>
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  {/* Footer */}
                  <div className="px-8 py-5 bg-white flex justify-end items-center gap-4 shrink-0 border-t border-slate-100 relative z-20">
                    <button 
                      type="submit"
                      form="profile-form"
                      className="bg-[#E11D48] hover:bg-rose-700 text-white rounded-[16px] px-8 py-3.5 text-[14px] font-bold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {/* --- SECURITY & PASSWORD VIEW --- */}
              {view === 'security' && (
                <motion.div
                  key="security"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col h-full absolute inset-0"
                >
                  <div className="px-8 py-8 bg-white flex-1 overflow-y-auto custom-scrollbar">
                    <div className="space-y-10 max-w-xl">
                      <div className="space-y-6">
                        <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-4">
                          <ShieldCheck className="w-4 h-4" /> SECURITY SETTINGS
                        </h3>
                        
                        <div className="space-y-4">
                          {/* Password Option */}
                          <div className="p-6 rounded-[24px] border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-600 group-hover:text-[#0F172A] group-hover:bg-slate-100 transition-colors">
                                <Key className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-[16px] font-bold text-slate-900 tracking-tight">Password Authentication</p>
                                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                                  Last changed 90 days ago. Ensure your password is at least 12 characters long.
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigateTo('otp', 1)}
                              className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[13px] font-bold hover:bg-slate-800 transition-all shadow-sm shrink-0 whitespace-nowrap"
                            >
                              Reset Password
                            </button>
                          </div>

                          {/* 2FA Option (Visual Only) */}
                          <div className="p-6 rounded-[24px] border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-75">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 text-slate-400">
                                <Laptop className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-[16px] font-bold text-slate-900 tracking-tight">Two-Factor Authentication</p>
                                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                                  Configured via Microsoft Authenticator. Managed by IT Administrator.
                                </p>
                              </div>
                            </div>
                            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-[12px] font-bold tracking-wide shrink-0">
                              Active
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- OTP VERIFICATION VIEW --- */}
              {view === 'otp' && (
                <motion.div
                  key="otp"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col h-full bg-white p-10 absolute inset-0"
                >
                  <button 
                    onClick={() => navigateTo('security', -1)}
                    className="absolute top-8 left-8 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-[100]"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F172A] shadow-sm mb-6">
                      <KeyRound className="w-8 h-8 stroke-[2.2]" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-3 text-center">Identity Verification</h2>
                    <p className="text-[14px] text-slate-500 mb-10 text-center leading-relaxed">
                      Enter the 6-digit authentication token sent to your device to authorize a secure password reset.
                    </p>

                    <div className="flex justify-center gap-3 mb-10 w-full">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`settings-otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-14 text-center text-xl font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0F172A] outline-none text-[#0F172A] transition-all shadow-inner"
                        />
                      ))}
                    </div>

                    <button 
                      onClick={verifyOtp}
                      disabled={otp.join('').length !== 6}
                      className="w-full py-4 px-6 rounded-[16px] font-bold text-[15px] bg-[#0F172A] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      Verify & Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* --- NEW PASSWORD VIEW --- */}
              {view === 'new_password' && (
                <motion.div
                  key="new_password"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col h-full bg-white p-10 absolute inset-0"
                >
                  <button 
                    onClick={() => navigateTo('otp', -1)}
                    className="absolute top-8 left-8 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-[100]"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F172A] shadow-sm mb-6">
                      <Lock className="w-8 h-8 stroke-[2.2]" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-3 text-center">Create New Password</h2>
                    <p className="text-[14px] text-slate-500 mb-10 text-center leading-relaxed">
                      Your new password must be at least 12 characters and comply with enterprise SOC2 requirements.
                    </p>

                    <div className="space-y-5 mb-10 w-full">
                      <div>
                        <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[15px] font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] transition-all shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wider mb-2">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[15px] font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={saveNewPassword}
                      className="w-full py-4 px-6 rounded-[16px] font-bold text-[15px] bg-[#0F172A] hover:bg-slate-800 text-white shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      Update Password
                    </button>
                  </div>
                </motion.div>
              )}

              {/* --- SUCCESS VIEW --- */}
              {view === 'success' && (
                <motion.div
                  key="success"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col h-full bg-white p-10 items-center justify-center text-center absolute inset-0"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-3">Password Updated</h2>
                  <p className="text-[15px] text-slate-500 mb-8 max-w-sm">
                    Your enterprise credentials have been successfully updated across all gateway nodes.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
