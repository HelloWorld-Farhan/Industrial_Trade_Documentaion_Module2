import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, User, ShieldCheck, Camera } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const [name, setName] = useState('Emily Jordan');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
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

                <div className="w-full h-px bg-slate-50"></div>

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
