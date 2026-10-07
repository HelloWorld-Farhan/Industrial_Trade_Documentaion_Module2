import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle2, AlertCircle, Activity, ShieldCheck } from 'lucide-react';

interface StageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageId: number | null;
}

export function StageDetailsModal({ isOpen, onClose, stageId }: StageDetailsModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);
  
  const getStageContent = () => {
    switch (stageId) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-emerald-900 font-bold text-lg">Document Check Passed</h3>
                <p className="text-emerald-700 text-xs mt-1">All shipping manifests and EDI documents have been verified without errors.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-emerald-600">45m 12s</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mt-1">Total Time Taken</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Verification Logs</h4>
                 <ul className="space-y-3">
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                     <div>
                       <div className="text-xs font-bold text-slate-800">Commercial Invoice</div>
                       <div className="text-[10px] text-slate-500 font-mono">Verified at 07:45 CET</div>
                     </div>
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                     <div>
                       <div className="text-xs font-bold text-slate-800">Bill of Lading</div>
                       <div className="text-[10px] text-slate-500 font-mono">Matched against carrier DB</div>
                     </div>
                   </li>
                 </ul>
               </div>
               
               <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">AI Confidence Score</h4>
                 <div className="flex items-end gap-3">
                   <div className="text-4xl font-bold text-slate-900">99.8<span className="text-xl text-slate-400">%</span></div>
                   <div className="pb-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Optimal</div>
                 </div>
                 <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                   <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '99.8%' }}></div>
                 </div>
               </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity className="w-32 h-32 text-indigo-500" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                    <h3 className="text-indigo-900 font-bold text-lg">Physical Inspection Active</h3>
                  </div>
                  <p className="text-indigo-700 text-xs">Container is currently being inspected at Terminal 4 Maasvlakte bay.</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1">Smart AI Prediction</div>
                  <div className="text-4xl font-mono font-bold text-indigo-600 tracking-tight">01:42:18</div>
                  <div className="text-[10px] text-indigo-500 mt-1">Remaining Estimated Time</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-center items-center text-center">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                   <Clock className="w-5 h-5 text-slate-400" />
                 </div>
                 <div className="text-xs text-slate-500 font-medium">Average Time</div>
                 <div className="text-lg font-bold text-slate-900 mt-0.5">2h 15m</div>
               </div>
               
               <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-emerald-50/50"></div>
                 <div className="relative z-10 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                   <ShieldCheck className="w-5 h-5 text-emerald-600" />
                 </div>
                 <div className="relative z-10 text-xs text-slate-500 font-medium">Delay Risk</div>
                 <div className="relative z-10 text-lg font-bold text-emerald-600 mt-0.5">LOW (12%)</div>
               </div>

               <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-center items-center text-center">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                   <Activity className="w-5 h-5 text-slate-400" />
                 </div>
                 <div className="text-xs text-slate-500 font-medium">Current Progress</div>
                 <div className="text-lg font-bold text-indigo-600 mt-0.5">78% Complete</div>
               </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-slate-800 font-bold text-lg">Final Release Pending</h3>
                <p className="text-slate-500 text-xs mt-1">Awaiting completion of Stage 2 before terminal gate pass is issued.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-slate-400">~10:45 CET</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Target ETA</div>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm flex gap-4 items-start">
               <div className="p-3 bg-amber-50 rounded-lg shrink-0">
                 <AlertCircle className="w-6 h-6 text-amber-500" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-slate-800 mb-1">Prerequisites Not Met</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">
                   The terminal will not authorize the truck for gate-out until the physical inspection in Stage 2 concludes and the final clearance barcode is generated by the Customs Authority.
                 </p>
                 <div className="mt-3 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                   <span className="text-[11px] font-medium text-slate-600">Truck #84 is currently on standby in the holding area.</span>
                 </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStageTitle = () => {
    if (stageId === 1) return "Stage 1: Document Check";
    if (stageId === 2) return "Stage 2: Physical Inspection";
    if (stageId === 3) return "Stage 3: Final Release";
    return "Stage Details";
  }

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed top-4 bottom-4 md:top-1/2 md:bottom-auto left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden max-h-[90vh] pointer-events-auto"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100 bg-white">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">{getStageTitle()}</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-slate-50/50">
              {getStageContent()}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
