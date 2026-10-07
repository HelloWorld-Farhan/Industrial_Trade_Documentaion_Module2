import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft, KeyRound, Timer, Building2, Globe2, ScanFace } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type AuthStep = 'login' | 'signup' | 'otp';

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>('login');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus logic
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    
    // Auto-submit logic
    if (index === 5 && value && newOtp.every(v => v !== '')) {
      setTimeout(() => {
        login();
        navigate('/');
      }, 400);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className={`h-screen w-full bg-black flex flex-col lg:flex-row ${step === 'signup' ? 'lg:flex-row-reverse' : ''} overflow-hidden antialiased selection:bg-[#0F172A] selection:text-white transition-all duration-700 ease-in-out`}>
      {/* BACKGROUND AMBIENT PARTICLES / GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <motion.div 
          layout
          className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-white/20 blur-[150px]"
          animate={{
            right: step === 'signup' ? '60%' : '10%',
            backgroundColor: step === 'signup' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.2)'
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.div 
          layout
          className="absolute top-[60%] right-[20%] w-[500px] h-[500px] rounded-full bg-slate-300/10 blur-[170px]"
          animate={{
            right: step === 'signup' ? '70%' : '20%'
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
      
      {/* Dynamic Info Panel */}
      <motion.div 
        layout 
        className={`hidden lg:flex flex-1 flex-col justify-between p-12 lg:p-16 text-white relative z-10 bg-gradient-to-br from-black to-slate-900 border-white/10 ${step === 'signup' ? 'border-l' : 'border-r'}`}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <motion.div layout className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0F172A] shadow-md font-bold">
              <Layers className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                AeroLogix <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white font-mono font-bold border border-white/20">AI</span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide">Enterprise Customs & Freight</p>
            </div>
          </motion.div>

          <div className="relative h-[240px]">
            <AnimatePresence mode="wait">
              {step === 'login' && (
                <motion.div
                  key="info-login"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                    Automate <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
                      Global Customs
                    </span>
                  </h1>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                    AeroLogix AI streamlines cross-border trade documentation, duty calculation, and risk telemetry directly from your ERP.
                  </p>
                </motion.div>
              )}
              {step === 'signup' && (
                <motion.div
                  key="info-signup"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                    Join the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500">
                      Trade Network
                    </span>
                  </h1>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                    Register your organization to access automated clearance workflows, real-time tracking, and multi-jurisdiction compliance.
                  </p>
                </motion.div>
              )}
              {step === 'otp' && (
                <motion.div
                  key="info-otp"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                    Secure <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500">
                      Identity Verification
                    </span>
                  </h1>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                    Protecting enterprise trade data with military-grade encryption and strict SOC2 access controls.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div layout className="space-y-6 max-w-lg relative z-20">
          <AnimatePresence mode="wait">
            {step === 'login' && (
              <motion.div
                key="features-login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm">Enterprise-Grade Security</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fully compliant with SOC2 Type II, ISO 27001, and CBP 19 CFR regulations for secure trade data management.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe2 className="w-5 h-5 text-sky-400" />
                    <h3 className="font-bold text-white text-sm">Multi-Jurisdiction Gateway</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Seamlessly interact with EU TARIC, US-EAST, and Trans-Pacific customs agencies from a single portal.
                  </p>
                </div>
              </motion.div>
            )}
            
            {step === 'signup' && (
              <motion.div
                key="features-signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm hover:bg-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm">Organization Workspaces</h3>
                  </div>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    Create a dedicated, isolated workspace for your entire logistics team with granular RBAC controls.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Layers className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-white text-sm">Seamless ERP Integration</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Connect instantly with SAP, Oracle, and Microsoft Dynamics to sync commercial invoices and packing lists.
                  </p>
                </div>
              </motion.div>
            )}
            
            {step === 'otp' && (
              <motion.div
                key="features-otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <ScanFace className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-white text-sm">Zero-Trust Authentication</h3>
                  </div>
                  <p className="text-xs text-blue-100/70 leading-relaxed">
                    Every login attempt requires cryptographically verified tokens to prevent unauthorized access.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Auth Panel */}
      <motion.div 
        layout 
        className="flex-1 lg:flex-none lg:w-[600px] xl:w-[700px] flex items-center justify-center p-0 sm:p-8 relative z-10 bg-white sm:bg-black/50 sm:backdrop-blur-sm overflow-hidden"
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full max-w-md relative">
          <AnimatePresence mode="wait">
            
            {/* LOGIN FORM */}
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full min-h-screen sm:min-h-0 flex flex-col justify-center max-w-md mx-auto p-6 sm:p-8 md:p-10 bg-white sm:rounded-3xl sm:border border-slate-200/90 sm:shadow-2xl"
              >
                {/* Brand Header */}
                <div className="flex items-center justify-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-md shadow-slate-900/10 font-bold">
                    <Layers className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold tracking-tight text-[#0F172A] flex items-center gap-1.5">
                      AeroLogix <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-bold border border-slate-200">AI</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium tracking-wide">Enterprise Customs & Freight</p>
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Portal Authentication</h2>
                  <p className="text-xs text-slate-500 mt-1">Sign in to manage customs duty clearance & risk telemetry</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>Work Email</span>
                      <span className="text-[10px] text-slate-400 font-normal lowercase">auth@aerologix.io</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        type="email" 
                        defaultValue="emily.jordan@aerologix.io"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>Password</span>
                      <span className="text-[10px] text-slate-400 font-normal">Required</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        type="password" 
                        defaultValue="••••••••••••••••"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      SSO & Multi-factor enforcement active. An automated one-time token will be requested next.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide bg-[#0F172A] hover:bg-slate-800 text-white shadow-md active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Proceed to Identity Verification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-xs text-slate-500">
                    Don't have an enterprise account? 
                    <button onClick={() => setStep('signup')} className="font-bold text-[#0F172A] hover:underline underline-offset-4 ml-1.5 transition-all hover:text-emerald-600">Sign Up</button>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold border border-slate-200 text-[10px]">SOC2 Type II</span>
                  <span className="flex items-center gap-1.5 text-slate-600 text-[11px] font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Node: US-EAST-01
                  </span>
                </div>
              </motion.div>
            )}

            {/* SIGNUP FORM */}
            {step === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full min-h-screen sm:min-h-0 flex flex-col justify-center max-w-lg mx-auto p-6 sm:p-8 bg-white sm:rounded-3xl sm:border border-slate-200/90 sm:shadow-2xl relative"
              >
                <div className="text-center mb-5 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold mb-4 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Secure Portal Registration</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Create Enterprise Account</h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto">
                    Register your freight brokerage, carrier, or enterprise importer organization
                  </p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Organization Legal Name</label>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Required</span>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <input 
                        type="text" 
                        placeholder="e.g. Apex Turbine Dynamics Corp."
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Work Email Address</label>
                      <span className="text-[10px] text-slate-400 font-mono">auth@enterprise.corp</span>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        type="email" 
                        placeholder="emily.jordan@aerologix.io"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>



                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Security Password</label>
                      <span className="inline-flex items-center text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">SOC2 Compliant</span>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        type="password" 
                        placeholder="••••••••••••••••"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium tracking-wider text-slate-800 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2 pb-1">
                    <label className="flex items-start space-x-3 cursor-pointer group p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer" />
                      <span className="text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                        I agree to the Enterprise Terms of Service, SOC2 Data Governance guidelines, and automated Customs Compliance Protocols.
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-[#0F172A] text-white hover:bg-emerald-600 active:scale-[0.99] transition-all shadow-md">
                      <span>Create Enterprise Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-center pt-3 border-t border-slate-100 mt-4">
                    <button type="button" onClick={() => setStep('login')} className="text-xs text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 font-medium">
                      Already registered? <span className="text-[#0F172A] font-bold hover:text-emerald-600 transition-colors underline underline-offset-4">Sign in to Portal</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* OTP FORM */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full min-h-screen sm:min-h-0 flex flex-col justify-center max-w-md mx-auto p-6 sm:p-8 bg-white sm:rounded-3xl sm:border border-slate-200/90 sm:shadow-2xl relative"
              >
                <button 
                  onClick={() => setStep('login')}
                  className="absolute top-6 left-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="flex justify-center mb-6 mt-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm relative">
                    <KeyRound className="w-7 h-7 stroke-[2.2] relative z-10" />
                    <div className="absolute inset-0 bg-blue-400 blur-lg opacity-20 rounded-2xl"></div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Two-Factor Challenge</h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Enter the 6-digit authentication token sent to <br />
                    <span className="text-[#0F172A] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 inline-block mt-1">emily•••••@aerologix.io</span>
                  </p>
                </div>

                <div className="flex justify-between gap-1 sm:gap-2 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="otp-box w-10 sm:w-12 h-12 sm:h-14 text-center text-lg sm:text-xl font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none text-[#0F172A] transition-all shadow-inner"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-8 px-1">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Timer className="w-3.5 h-3.5 text-slate-400" />
                    Expires in <span className="text-slate-800 font-mono font-bold">02:45</span>
                  </span>
                  <button type="button" className="text-slate-800 font-semibold hover:text-blue-600 transition-colors">
                    Resend Code
                  </button>
                </div>

                <button 
                  onClick={() => { login(); navigate('/'); }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide bg-[#0F172A] hover:bg-blue-600 text-white shadow-md active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Token & Access Dashboard</span>
                </button>

                <div className="mt-8 text-center pt-4 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Authorized personnel only. Access monitored under CBP 19 CFR regulations. Activity is logged.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
