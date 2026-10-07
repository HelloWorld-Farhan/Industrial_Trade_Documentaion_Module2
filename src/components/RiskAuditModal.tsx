import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, CheckCircle2, Loader2, Database, ScanSearch, FileKey2 } from 'lucide-react';

interface RiskAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RiskAuditModal({ isOpen, onClose }: RiskAuditModalProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(0);
      
      const timer1 = setTimeout(() => setStep(1), 800);
      const timer2 = setTimeout(() => setStep(2), 1600);
      const timer3 = setTimeout(() => setStep(3), 2500);
      
      return () => { 
        document.body.style.overflow = 'unset'; 
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  const steps = [
    { icon: Database, title: "Connecting to ERP & Manifest Database", delay: 0 },
    { icon: ScanSearch, title: "Running Vector Anomaly Detection", delay: 0.8 },
    { icon: FileKey2, title: "Validating against Customs Thresholds", delay: 1.6 }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] pointer-events-auto"
          />
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">AI Risk Audit Pipeline</h2>
                    <p className="text-xs text-slate-500 font-medium">Outlier-Forest-v4 Verification</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-white space-y-6">
                
                {step < 3 ? (
                  <div className="space-y-4">
                    {steps.map((s, i) => {
                      const Icon = s.icon;
                      const isActive = step === i;
                      const isComplete = step > i;
                      const isPending = step < i;
                      
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                          className={`flex items-center gap-4 p-4 rounded-xl border ${isActive ? 'bg-slate-50 border-slate-200 shadow-sm' : isComplete ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-transparent'}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-blue-100 text-blue-600' : isComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-sm font-bold ${isActive ? 'text-slate-900' : isComplete ? 'text-emerald-900' : 'text-slate-500'}`}>{s.title}</h4>
                            {isActive && <p className="text-[10px] text-slate-500 mt-1 font-mono">Executing protocol sequence...</p>}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 relative">
                      <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-50"></div>
                      <ShieldAlert className="w-8 h-8 text-rose-600 relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Audit Complete</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-sm">
                      The AI Risk Audit has successfully finished scanning. 1 critical discrepancy has been flagged in consignment <span className="font-mono font-bold text-rose-600">CON-US-99120</span>.
                    </p>
                  </motion.div>
                )}

              </div>
              
              {step === 3 && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                  <button 
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-2.5 text-xs font-bold shadow-sm transition-all w-full"
                  >
                    Review Anomaly Details
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
