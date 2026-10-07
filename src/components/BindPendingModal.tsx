import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Zap, ShieldCheck, FileCheck2, Loader2, CheckCircle2 } from 'lucide-react';

interface BindPendingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BindPendingModal({ isOpen, onClose }: BindPendingModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state on open
      setIsProcessing(false);
      setProgress(0);
      setIsComplete(false);
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isOpen]);

  const handleStartBind = () => {
    setIsProcessing(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setIsComplete(true);
        }, 500);
      }
    }, 200);
  };

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
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Bind All Pending Policies</h2>
                    <p className="text-xs text-slate-500 font-medium">Batch Auto-Underwriting Execution</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 bg-white space-y-6 flex-1 overflow-y-auto">
                
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-800">
                  <Zap className="w-5 h-5 shrink-0 text-amber-500" />
                  <p className="text-sm font-medium">
                    You are about to execute a batch operation to instantly generate and bind <strong>3 pending policies</strong> via the syndicated underwriting API.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Queue Management</h4>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <FileCheck2 className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">CON-US-99120</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">110% CIF • Ready</p>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-700">$243.54</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <FileCheck2 className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">CON-EU-33104</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Base CIF • Ready</p>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-700">$118.00</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between opacity-70">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-600">CON-AS-77519</p>
                        <p className="text-[10px] text-rose-500 uppercase tracking-wider font-semibold">Missing Valuation</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">SKIPPED</span>
                  </div>
                </div>

                {isProcessing && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">Transmitting to API...</span>
                      <span className="text-xs font-bold text-emerald-600 font-mono">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${progress}%` }} 
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                )}

                {isComplete && (
                  <div className="pt-2">
                     <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        <div>
                          <p className="font-bold text-emerald-900">Successfully Bound</p>
                          <p className="text-xs text-emerald-700 mt-1">2 Policies generated and certified.</p>
                        </div>
                     </div>
                  </div>
                )}
                
              </div>
              
              {/* Footer */}
              {!isComplete && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                  <button 
                    onClick={onClose}
                    disabled={isProcessing}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleStartBind}
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-6 py-2 text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        Execute Bind
                      </>
                    )}
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
