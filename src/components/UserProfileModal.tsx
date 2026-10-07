import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, KeyRound, ShieldCheck, Mail, Phone, ArrowRight, CheckCircle2, Camera } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PasswordFlow = 'idle' | 'otp' | 'new_password' | 'success';

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const [name, setName] = useState('Emily Jordan');
  const [passwordFlow, setPasswordFlow] = useState<PasswordFlow>('idle');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Reset flow state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPasswordFlow('idle');
        setOtp(['', '', '', '', '', '']);
      }, 300);
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join('').length === 6) {
      setPasswordFlow('new_password');
    }
  };

  const saveNewPassword = () => {
    setPasswordFlow('success');
    setTimeout(() => {
      setPasswordFlow('idle');
      onClose();
    }, 2000);
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
              className="bg-white w-full max-w-[440px] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] pointer-events-auto border border-slate-100 flex flex-col max-h-[90vh] origin-center relative"
            >

            {/* Header Profile Section */}
            <div className="relative pt-8 pb-6 px-6 bg-white flex flex-col items-center rounded-t-[32px] overflow-hidden z-20">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

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
              <p className="text-[13px] text-slate-500 font-medium mt-0.5">Chief Customs Officer</p>
            </div>

            <div className="w-full h-px bg-slate-100 relative z-20"></div>

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
                      <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email Address</label>
                      <input
                        type="email"
                        value="emily.jordan@aerologix.com"
                        readOnly
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone Number</label>
                      <input
                        type="text"
                        value="+1 (555) 019-2834"
                        readOnly
                        className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium px-1">Email and phone number cannot be changed.</p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* Security Section with inline OTP flow */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <KeyRound className="w-4 h-4" /> SECURITY & PASSWORD
                  </h3>

                  <AnimatePresence mode="wait">
                    {passwordFlow === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Current Password</label>
                        <div className="relative">
                          <input
                            type="password"
                            value="••••••••"
                            readOnly
                            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-900 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordFlow('otp')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors"
                          >
                            Reset
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {passwordFlow === 'otp' && (
                      <motion.div 
                        key="otp"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800">Verification Required</p>
                          <p className="text-[11px] text-slate-500 mt-1">Enter the 6-digit code sent to your phone.</p>
                        </div>
                        <div className="flex gap-2">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              value={digit}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              className="w-10 h-12 text-center text-lg font-bold bg-white border border-slate-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none"
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={verifyOtp}
                          disabled={otp.join('').length !== 6}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          Verify Identity <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}

                    {passwordFlow === 'new_password' && (
                      <motion.div 
                        key="new_password"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-4"
                      >
                        <div>
                          <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">New Password</label>
                          <input type="password" placeholder="Min. 8 characters" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Confirm New Password</label>
                          <input type="password" placeholder="Confirm password" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none" />
                        </div>
                        <button
                          type="button"
                          onClick={saveNewPassword}
                          className="w-full py-2.5 bg-[#E11D48] text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Update Password
                        </button>
                      </motion.div>
                    )}

                    {passwordFlow === 'success' && (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-2"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        <p className="text-sm font-bold text-emerald-900">Password Updated</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-5 bg-white flex justify-end items-center gap-4 shrink-0 rounded-b-[32px] relative z-20">
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
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
