import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, X, Printer } from 'lucide-react';

interface DataExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataExplorerModal({ isOpen, onClose }: DataExplorerModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed top-4 bottom-4 md:top-1/2 md:bottom-auto left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden max-h-[90vh] pointer-events-auto"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Raw ERP Telemetry Explorer</h2>
                  <p className="text-[10px] font-mono text-slate-500">Record ID: SYS-99481-APEX (Synced: just now)</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white hover:bg-slate-200 border border-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-0 overflow-y-auto flex-1 bg-slate-50">
              {/* Premium High-End Light Dashboards */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Chart 1: Weight Analysis */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                      Weight Distribution
                    </h4>
                    
                    {/* Interactive Split Layout */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-end gap-3 h-28 w-full group/weight-container">
                        
                        {/* Net Weight Block */}
                        <div className="bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition-all duration-500 flex flex-col justify-between p-3 relative overflow-hidden cursor-pointer w-[80%] hover:!w-[90%] opacity-90 hover:!opacity-100 group-hover/weight-container:opacity-50 hover:shadow-md">
                          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                          <span className="text-blue-800 text-xs font-bold relative z-10 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Net (Valves)
                          </span>
                          <div className="relative z-10">
                            <span className="text-blue-900 font-mono text-xl font-bold block">1,420.50</span>
                            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-wide">Kilograms (94%)</span>
                          </div>
                        </div>

                        {/* Tare Weight Block */}
                        <div className="bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl transition-all duration-500 flex flex-col justify-between p-3 relative overflow-hidden cursor-pointer w-[20%] hover:!w-[40%] opacity-90 hover:!opacity-100 group-hover/weight-container:opacity-50 hover:shadow-md">
                           <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
                           <span className="text-amber-800 text-[10px] font-bold relative z-10 flex items-center gap-1.5 truncate">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Tare (Skids)
                           </span>
                           <div className="relative z-10">
                             <span className="text-amber-900 font-mono text-lg font-bold block">82.00</span>
                             <span className="text-amber-600 font-bold text-[9px] uppercase tracking-wide truncate">Kg (6%)</span>
                           </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 relative z-10 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Verified Gross</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wide text-sm bg-slate-100 px-3 py-1 rounded-md">1,502.50 kg</span>
                  </div>
                </div>

                {/* Chart 2: Cost Breakdown (Interactive Donut) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                   <div className="relative z-10 h-full flex flex-col">
                     <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                        Value Breakdown (Proportional)
                     </h4>
                     
                     <div className="flex-1 flex items-center gap-6 mt-2 group/donut-container">
                       {/* SVG Donut Chart */}
                       <div className="relative w-32 h-32 flex-shrink-0">
                         <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                           {/* Base Goods: ~81.3% */}
                           <circle cx="50" cy="50" r="40" strokeWidth="16" fill="transparent"
                             className="stroke-emerald-500 cursor-pointer transition-all duration-300 hover:stroke-emerald-400 hover:stroke-[20px] opacity-100 group-hover/donut-container:opacity-40 hover:!opacity-100"
                             strokeDasharray={`${81.3 * 2.51327} 251.327`}
                           />
                           {/* Taxes: ~13.2% */}
                           <circle cx="50" cy="50" r="40" strokeWidth="16" fill="transparent"
                             className="stroke-emerald-400 cursor-pointer transition-all duration-300 hover:stroke-emerald-300 hover:stroke-[20px] opacity-100 group-hover/donut-container:opacity-40 hover:!opacity-100"
                             strokeDasharray={`${13.2 * 2.51327} 251.327`}
                             strokeDashoffset={`-${81.3 * 2.51327}`}
                           />
                           {/* Freight: ~5.5% */}
                           <circle cx="50" cy="50" r="40" strokeWidth="16" fill="transparent"
                             className="stroke-emerald-300 cursor-pointer transition-all duration-300 hover:stroke-emerald-200 hover:stroke-[20px] opacity-100 group-hover/donut-container:opacity-40 hover:!opacity-100"
                             strokeDasharray={`${5.5 * 2.51327} 251.327`}
                             strokeDashoffset={`-${94.5 * 2.51327}`}
                           />
                         </svg>
                         <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none bg-white rounded-full m-4 shadow-inner">
                           <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
                           <span className="text-xs font-mono font-bold text-slate-900">$184.5k</span>
                         </div>
                       </div>

                       {/* Interactive Legend */}
                       <div className="flex-1 flex flex-col gap-3">
                         <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/legend border border-transparent hover:border-slate-100">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] group-hover/legend:scale-150 transition-transform"></div>
                             <span className="text-[10px] font-bold text-slate-600 uppercase">Base Goods</span>
                           </div>
                           <span className="text-[11px] font-mono font-bold text-slate-900">$150,000</span>
                         </div>
                         <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/legend border border-transparent hover:border-slate-100">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)] group-hover/legend:scale-150 transition-transform"></div>
                             <span className="text-[10px] font-bold text-slate-600 uppercase">Taxes (Est.)</span>
                           </div>
                           <span className="text-[11px] font-mono font-bold text-slate-900">$24,500</span>
                         </div>
                         <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/legend border border-transparent hover:border-slate-100">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.4)] group-hover/legend:scale-150 transition-transform"></div>
                             <span className="text-[10px] font-bold text-slate-600 uppercase">Freight</span>
                           </div>
                           <span className="text-[11px] font-mono font-bold text-slate-900">$10,000</span>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>

              <div className="px-4 md:px-6 pb-6 relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-800"></span> Shipping Entity Details
                </h3>
                
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    
                    <div className="p-0">
                      <table className="w-full text-left">
                        <tbody className="divide-y divide-slate-100 font-sans">
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500 w-1/3">Buyer ID</td>
                            <td className="py-3.5 px-5 font-mono font-bold text-slate-900 tracking-wide">APX-9941</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500">Company</td>
                            <td className="py-3.5 px-5 text-slate-700">Apex Turbine Dynamics Corp.</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500">Incoterms</td>
                            <td className="py-3.5 px-5">
                              <span className="font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">DDP Rotterdam</span>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500">Value</td>
                            <td className="py-3.5 px-5 text-emerald-600 font-mono font-bold tracking-wide">$184,500.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-0">
                      <table className="w-full text-left">
                        <tbody className="divide-y divide-slate-100 font-sans">
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500 w-1/3">Commodity HS</td>
                            <td className="py-3.5 px-5 font-mono font-bold text-slate-900 tracking-wide">8481.80.9050</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500">Item Name</td>
                            <td className="py-3.5 px-5 text-slate-700">Cryogenic Titanium Valves</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500">Quantity</td>
                            <td className="py-3.5 px-5 font-bold text-slate-900">48 Units</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-500">Packaging</td>
                            <td className="py-3.5 px-5 text-slate-500">6 Skids / Mil-Spec C-91</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                Close Explorer
              </button>
              <button className="px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-slate-800 shadow-sm rounded-lg flex items-center gap-2 transition-all">
                <Printer className="w-3.5 h-3.5" /> Print Raw Data
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
