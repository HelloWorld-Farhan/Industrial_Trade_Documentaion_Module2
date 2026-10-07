import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Calculator, Server, Globe2, ShieldCheck, FileCheck2 } from 'lucide-react';

interface TaxRecalculateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: 'Connecting to EU TARIC Database...', icon: Server },
  { id: 2, label: 'Validating HS Code (8481.80.9050)...', icon: Globe2 },
  { id: 3, label: 'Applying Preferential Origin Rules (US → NL)...', icon: ShieldCheck },
  { id: 4, label: 'Re-calculating Taxable Base & Surcharges...', icon: Calculator },
  { id: 5, label: 'Finalizing AI Assessment...', icon: FileCheck2 },
];

export function TaxRecalculateModal({ isOpen, onClose }: TaxRecalculateModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsComplete(false);
      document.body.style.overflow = 'hidden';

      // Sequence the steps
      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        if (step <= STEPS.length) {
          setCurrentStep(step);
        } else {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onClose();
          }, 3000); // Close automatically after 3 seconds of success
        }
      }, 1200);

      return () => {
        clearInterval(interval);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isComplete ? undefined : onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] pointer-events-auto"
          />
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className="relative pt-8 pb-6 px-6 bg-slate-50 border-b border-slate-100 flex flex-col items-center text-center">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm mb-4 ring-4 ring-white relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isComplete ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-emerald-500"
                      >
                        <CheckCircle2 className="w-8 h-8" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative flex items-center justify-center w-full h-full"
                      >
                        <Calculator className="w-7 h-7 text-blue-500 z-10" />
                        <Loader2 className="w-full h-full absolute inset-0 text-blue-200 animate-spin" strokeWidth={1} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {isComplete ? 'Recalculation Complete' : 'AI Tax Recalculation'}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {isComplete ? 'Taxes and duties updated successfully.' : 'Syncing data and applying tariff rules...'}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="p-6 bg-white space-y-5">
                {STEPS.map((step, idx) => {
                  const isActive = currentStep === step.id;
                  const isDone = currentStep > step.id;
                  const isPending = currentStep < step.id;
                  const Icon = step.icon;

                  return (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: isPending ? 0.4 : 1, 
                        x: 0,
                        scale: isActive ? 1.02 : 1
                      }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex items-center gap-4 ${isPending ? 'grayscale' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isDone ? 'bg-emerald-100 text-emerald-600' : 
                        isActive ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500/20' : 
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[13px] font-semibold transition-colors duration-300 ${
                          isDone ? 'text-emerald-700' : 
                          isActive ? 'text-blue-700' : 
                          'text-slate-500'
                        }`}>
                          {step.label}
                        </p>
                        {isActive && (
                          <motion.div 
                            layoutId="active-bar"
                            className="h-0.5 bg-blue-100 rounded-full w-full mt-1.5 overflow-hidden"
                          >
                            <motion.div 
                              className="h-full bg-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1.2, ease: "linear" }}
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button 
                  onClick={onClose}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isComplete 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isComplete ? 'View Results' : 'Cancel Process'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
