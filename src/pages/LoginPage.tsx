import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft, KeyRound, Timer, Building2, Globe2 } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6 antialiased selection:bg-[#0F172A] selection:text-white">
      {/* BACKGROUND AMBIENT PARTICLES / GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-white/40 blur-[150px]"></div>
        <div className="absolute top-[50%] -right-[15%] w-[700px] h-[700px] rounded-full bg-slate-300/30 blur-[170px]"></div>
        <div className="absolute -bottom-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-slate-200/40 blur-[140px]"></div>
      </div>
      
      <div className="w-full max-w-xl relative z-10">
        <AnimatePresence mode="wait">
          {step === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const }}
              className="w-full max-w-md mx-auto p-8 md:p-10 bg-white rounded-3xl border border-slate-200/90 shadow-2xl"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    SSO & Multi-factor enforcement active. An automated one-time token will be requested next.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 px-4 rounded-full font-bold text-xs tracking-wide bg-[#0F172A] hover:bg-slate-800 text-white shadow-md active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  <span>Proceed to Identity Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="text-center mt-5">
                <p className="text-xs text-slate-500">
                  Don't have an enterprise account? 
                  <button onClick={() => setStep('signup')} className="font-bold text-[#0F172A] hover:underline underline-offset-4 ml-1">Sign Up</button>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200 text-[10px]">SOC2 Type II</span>
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

          {step === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const }}
              className="w-full mx-auto p-6 sm:p-9 bg-white rounded-3xl border border-slate-200/90 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Secure Portal Registration</span>
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Create Enterprise Account</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Register your freight brokerage, carrier, or enterprise importer organization
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Organization Legal Name</label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Required</span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="e.g. Apex Turbine Dynamics Corp."
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:outline-none transition-all placeholder:text-slate-400"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Role / Position</label>
                    <div className="relative">
                      <select required className="w-full py-2.5 pl-3 pr-10 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:outline-none transition-all appearance-none cursor-pointer">
                        <option value="customs_officer">Chief Customs Officer</option>
                        <option value="customs_broker">Customs Broker</option>
                        <option value="freight_forwarder">Freight Forwarder</option>
                        <option value="compliance_officer">Compliance Officer</option>
                        <option value="supply_chain_director">Supply Chain Director</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Region / Jurisdiction</label>
                    <div className="relative">
                      <select required className="w-full py-2.5 pl-3 pr-10 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:outline-none transition-all appearance-none cursor-pointer">
                        <option value="us_east_eu">Rotterdam (RTM) & EU TARIC</option>
                        <option value="us_east">US-EAST / North America</option>
                        <option value="us_west_asia">US-WEST / Trans-Pacific & APAC</option>
                        <option value="eu_central">EMEA / EU Union Customs Code (UCC)</option>
                        <option value="global_all">Global Multi-Jurisdiction Gateway</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <Globe2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Security Password</label>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-[#DCFCE7] px-2 py-0.5 rounded-full">SOC2 Compliant</span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type="password" 
                      placeholder="••••••••••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs font-medium tracking-wider text-slate-800 rounded-xl border border-slate-200 focus:border-[#0F172A] focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="pt-1 pb-1">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] cursor-pointer" />
                    <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors">
                      I agree to Enterprise Terms of Service, SOC2 Data Governance, and Customs Compliance Protocols.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-bold bg-[#0F172A] text-white hover:bg-slate-800 active:scale-[0.99] transition-all shadow-sm">
                    <span>Create Enterprise Workspace & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-center pt-2">
                  <button type="button" onClick={() => setStep('login')} className="text-xs text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 font-medium">
                    Already registered? <span className="text-[#0F172A] font-bold underline underline-offset-4 hover:text-slate-700">Sign in to Portal</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const }}
              className="w-full max-w-md mx-auto p-8 md:p-10 bg-white rounded-3xl border border-slate-200/90 shadow-2xl relative"
            >
              <button 
                onClick={() => setStep('login')}
                className="absolute top-6 left-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0F172A] shadow-sm">
                  <KeyRound className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Two-Factor Challenge</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the 6-digit authentication token sent to <br />
                  <span className="text-[#0F172A] font-mono font-bold">emily•••••@aerologix.io</span>
                </p>
              </div>

              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp-box w-11 h-12 text-center text-lg font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0F172A] outline-none text-[#0F172A] transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
                <span className="flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-slate-400" />
                  Expires in <span className="text-slate-800 font-mono font-bold">02:45</span>
                </span>
                <button type="button" className="text-slate-800 font-semibold hover:underline transition-colors underline-offset-4">
                  Resend Code
                </button>
              </div>

              <button 
                onClick={() => { login(); navigate('/'); }}
                className="w-full py-3 px-4 rounded-full font-bold text-xs tracking-wide bg-[#0F172A] hover:bg-slate-800 text-white shadow-md active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Token & Access Dashboard</span>
              </button>

              <div className="mt-6 text-center">
                <p className="text-[11px] text-slate-400">
                  Authorized personnel only. Access monitored under CBP 19 CFR regulations.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
