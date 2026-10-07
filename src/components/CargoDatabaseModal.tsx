import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Search, ShieldCheck, Box, DollarSign } from 'lucide-react';

interface CargoDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CargoDatabaseModal({ isOpen, onClose }: CargoDatabaseModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isOpen]);

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
              className="bg-white w-full max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                    <Database className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">AI Database Extraction</h2>
                    <p className="text-xs text-slate-500 font-medium">Read-Only Secure ERP Connection</p>
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
              <div className="p-6 bg-slate-50 flex-1 overflow-y-auto">
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 mb-6 shadow-sm">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    <span className="font-bold text-slate-800">The AI Agent does not require anyone to type new information.</span> It connects seamlessly to the Central Database and analyzes the order originally created by the Admin.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Target 1: Cargo Type */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                        <Box className="w-4 h-4" />
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 relative z-10">Target 1</h4>
                    <p className="text-sm font-bold text-slate-800 relative z-10">Cargo Type Classification</p>
                    <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-100 text-xs font-mono text-slate-600 relative z-10">
                      Matched: "High-Precision Machinery"
                    </div>
                  </motion.div>

                  {/* Target 2: Shipment Value */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 relative z-10">Target 2</h4>
                    <p className="text-sm font-bold text-slate-800 relative z-10">Commercial Shipment Value</p>
                    <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-100 text-xs font-mono text-slate-600 relative z-10">
                      Extracted: $184,500.00
                    </div>
                  </motion.div>
                </div>
                
                {/* Search Animation graphic */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                     <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Admin ERP</span>
                     <div className="h-px w-16 bg-slate-200 relative overflow-hidden">
                       <motion.div 
                         animate={{ x: [-10, 64] }} 
                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                         className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                       />
                     </div>
                     <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> AI Engine</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
