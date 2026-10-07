import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShieldCheck, Camera, KeyRound, ArrowRight, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProfileView = 'details' | 'otp' | 'new_password' | 'success';

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const [name, setName] = useState('Emily Jordan');
  const [view, setView] = useState<ProfileView>('details');
  const [direction, setDirection] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('details');
        setOtp(['', '', '', '', '', '']);
      }, 300);
    }
  }, [isOpen]);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
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
    
    // Auto advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`profile-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`profile-otp-${index - 1}`)?.focus();
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
      onClose();
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay and Centered Modal Container */}
          <div 
            className="fixed inset-0 z-[9998] bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-[440px] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] pointer-events-auto border border-slate-100 flex flex-col max-h-[90vh] origin-center relative overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors z-[100]"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait" custom={direction}>
                {view === 'details' && (
                  <motion.div
                    key="details"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full"
                  >
                    {/* Header Profile Section */}
                    <div className="relative pt-8 pb-6 px-6 bg-white flex flex-col items-center rounded-t-[32px] overflow-hidden z-20 shrink-0">
                      <div className="relative mb-4 group cursor-pointer" onClick={handleImageUploadClick}>
                        <div className="w-[88px] h-[88px] rounded-full bg-[#FFEBF0] text-[#E11D48] flex items-center justify-center font-bold text-3xl shadow-sm ring-[6px] ring-white relative overflow-hidden transition-all group-hover:ring-rose-100">
                          <span>EJ</span>
                          {/* Upload overlay on hover */}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#059669] border-[3px] border-white rounded-full flex items-center justify-center shadow-sm z-10">
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
                    </div>

                    <div className="w-full h-px bg-slate-100 relative z-20 shrink-0"></div>

                    {/* Form Body */}
                    <div className="px-6 py-6 bg-white overflow-y-auto custom-scrollbar flex-1 relative z-20">
                      <form id="profile-form" onSubmit={handleSave} className="space-y-8">
                        {/* Account Information Section */}
                        <div className="space-y-4">
                          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <User className="w-4 h-4" /> ACCOUNT INFORMATION
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Full Name</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Email Address</label>
                              <input
                                type="email"
                                value="emily.jordan@aerologix.com"
                                readOnly
                                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Phone Number</label>
                              <input
                                type="text"
                                value="+1 (555) 019-2834"
                                readOnly
                                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-500 focus:outline-none"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium px-1 pt-2">Email and phone number cannot be changed.</p>
                          </div>
                        </div>

                        {/* Security Section added back */}
                        <div className="space-y-4">
                          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> SECURITY
                          </h3>
                          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-slate-900">Password</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">Last changed 90 days ago</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigateTo('otp', 1)}
                              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-5 bg-white flex justify-end items-center gap-4 shrink-0 rounded-b-[32px] relative z-20 border-t border-slate-50">
                      <button 
                        type="button"
                        onClick={onClose}
                        className="text-[14px] font-bold text-slate-700 hover:text-slate-900 transition-colors"
                      >
                        Cancel
                      </button>
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

                {view === 'otp' && (
                  <motion.div
                    key="otp"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full bg-white p-8"
                  >
                    <button 
                      onClick={() => navigateTo('details', -1)}
                      className="absolute top-6 left-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-[100]"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="pt-8 flex flex-col items-center justify-center h-full">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F172A] shadow-sm mb-6">
                        <KeyRound className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      
                      <h2 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2 text-center">Identity Verification</h2>
                      <p className="text-xs text-slate-500 mb-8 text-center px-4">
                        Enter the 6-digit authentication token sent to your device to authorize a password reset.
                      </p>

                      <div className="flex justify-center gap-2 mb-8">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`profile-otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-10 h-12 text-center text-lg font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0F172A] outline-none text-[#0F172A] transition-all"
                          />
                        ))}
                      </div>

                      <button 
                        onClick={verifyOtp}
                        disabled={otp.join('').length !== 6}
                        className="w-full py-3.5 px-4 rounded-[16px] font-bold text-[14px] bg-[#0F172A] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        Verify & Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {view === 'new_password' && (
                  <motion.div
                    key="new_password"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full bg-white p-8"
                  >
                    <button 
                      onClick={() => navigateTo('otp', -1)}
                      className="absolute top-6 left-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-[100]"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="pt-8 flex flex-col h-full">
                      <div className="mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F172A] shadow-sm mb-4">
                          <Lock className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">Create New Password</h2>
                        <p className="text-xs text-slate-500">Your new password must be at least 12 characters and comply with SOC2 requirements.</p>
                      </div>

                      <div className="space-y-4 mb-8 flex-1">
                        <div>
                          <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">New Password</label>
                          <input
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] transition-all"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={saveNewPassword}
                        className="w-full py-3.5 px-4 rounded-[16px] font-bold text-[14px] bg-[#0F172A] hover:bg-slate-800 text-white shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        Update Password
                      </button>
                    </div>
                  </motion.div>
                )}

                {view === 'success' && (
                  <motion.div
                    key="success"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full bg-white p-8 items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">Password Updated</h2>
                    <p className="text-sm text-slate-500 mb-8">
                      Your enterprise credentials have been successfully updated across all gateway nodes.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
