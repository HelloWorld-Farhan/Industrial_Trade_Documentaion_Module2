import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Search, Filter } from 'lucide-react';

interface TariffTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TariffTableModal({ isOpen, onClose }: TariffTableModalProps) {
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
            className="fixed top-4 bottom-4 md:top-1/2 md:bottom-auto left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden max-h-[90vh] pointer-events-auto"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Global Tariff Database</h2>
                  <p className="text-[10px] font-mono text-slate-500">Live Sync: TARIC EU / USITC (Updated 04:00 AM UTC)</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white hover:bg-slate-200 border border-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 md:p-6 bg-white border-b border-slate-100 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search HS codes, commodity descriptions..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  defaultValue="8481.80.9050"
                />
              </div>
              <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="p-0 overflow-y-auto flex-1 bg-slate-50">
              <div className="p-4 md:p-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="p-4">HS Code</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Gen. Rate (MFN)</th>
                        <th className="p-4">Pref. Rate</th>
                        <th className="p-4">VAT Rule</th>
                        <th className="p-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-emerald-50/30 transition-colors bg-emerald-50/20 relative">
                        <td className="p-4">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                          <span className="font-mono font-bold text-emerald-700">8481.80.9050</span>
                        </td>
                        <td className="p-4 text-slate-700 font-medium">Cryogenic Titanium Valves (industrial)</td>
                        <td className="p-4 font-mono text-slate-500">3.50%</td>
                        <td className="p-4 font-mono font-bold text-slate-900">2.20%</td>
                        <td className="p-4 text-slate-500">Standard (21%)</td>
                        <td className="p-4 text-right">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-1 rounded-md">Matched</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-700">8481.80.9010</td>
                        <td className="p-4 text-slate-600">Brass Valves (residential)</td>
                        <td className="p-4 font-mono text-slate-500">4.00%</td>
                        <td className="p-4 font-mono text-slate-500">4.00%</td>
                        <td className="p-4 text-slate-500">Standard (21%)</td>
                        <td className="p-4 text-right">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Related</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-700">8481.80.9090</td>
                        <td className="p-4 text-slate-600">Other appliances for pipes, boiler shells</td>
                        <td className="p-4 font-mono text-slate-500">2.20%</td>
                        <td className="p-4 font-mono text-slate-500">0.00%</td>
                        <td className="p-4 text-slate-500">Standard (21%)</td>
                        <td className="p-4 text-right">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Related</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-700">8481.90.0000</td>
                        <td className="p-4 text-slate-600">Parts for taps, cocks, valves</td>
                        <td className="p-4 font-mono text-slate-500">2.20%</td>
                        <td className="p-4 font-mono text-slate-500">1.10%</td>
                        <td className="p-4 text-slate-500">Standard (21%)</td>
                        <td className="p-4 text-right">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Related</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
