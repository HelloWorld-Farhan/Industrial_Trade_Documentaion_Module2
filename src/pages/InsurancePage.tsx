import { useState } from 'react';
import { RefreshCw, FileCheck2, Download, Send, Zap } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { CargoDatabaseModal } from '../components/CargoDatabaseModal';
import { BindPendingModal } from '../components/BindPendingModal';

export default function InsurancePage() {
  const [isCargoModalOpen, setIsCargoModalOpen] = useState(false);
  const [isBindModalOpen, setIsBindModalOpen] = useState(false);

  return (
    <div className={`flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar relative ${isCargoModalOpen || isBindModalOpen ? 'overflow-hidden' : ''}`}>
      <TopHeader 
        searchPlaceholder="Search policy, certificate, underwriter..."
        actionButton={
          <button 
            onClick={() => setIsBindModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shadow-sm transition h-[38px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Bind All Pending</span>
          </button>
        }
      />

      {/* Dashboard Body Content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Section Title & Metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">4. Insurance Auto-Bind Agent</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1 font-normal">Parametric marine cargo underwriting, 110% CIF auto-bind, and instant policy certification</p>
          </div>
          <div className="flex items-center gap-8 self-start md:self-auto border-l-0 md:border-l border-slate-200 md:pl-8">
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">$202,950.00</p>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Bound Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">$243.54</p>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Policy Premium</p>
            </div>
          </div>
        </div>

        {/* SECTION A: CARGO RISK PROFILE & ERP DATA */}
        <div 
          onClick={() => setIsCargoModalOpen(true)}
          className="bg-[#F8FAFC]/70 border border-slate-200/70 rounded-2xl p-5 cursor-pointer group hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900 group-hover:bg-indigo-500 transition-colors"></span>
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-800 group-hover:text-indigo-900 transition-colors">CARGO RISK PROFILE & ERP DATA</h2>
            </div>
            <span className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-colors">
              Read-Only Database
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs group-hover:border-indigo-100 group-hover:shadow-sm transition-all duration-300">
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">Cargo Category</p>
              <p className="text-xs font-bold text-slate-800 mt-1">High-Precision Machinery</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Tier 1 Low-Risk (Valves & Cryo)</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs group-hover:border-indigo-100 group-hover:shadow-sm transition-all duration-300">
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">Carrier / Vessel</p>
              <p className="text-xs font-bold text-slate-800 mt-1">Maersk Atlantic V.2408</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Lloyd's Register A1 Classified</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs group-hover:border-indigo-100 group-hover:shadow-sm transition-all duration-300">
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">Transit Route</p>
              <p className="text-xs font-bold text-slate-800 mt-1">Chicago ORD → RTM Delta</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Direct Sea Transit (Rotterdam)</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs group-hover:border-indigo-100 group-hover:shadow-sm transition-all duration-300">
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">Historical Loss Claims</p>
              <p className="text-xs font-bold text-slate-800 mt-1">0 Claims in 36 Months</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5 group-hover:text-emerald-500">Preferred Corporate Tier</p>
            </div>
          </div>
        </div>

        {/* Split Two-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* SECTION B: CALCULATING COVERAGE */}
          <div className="bg-[#F8FAFC]/70 border border-slate-200/70 rounded-2xl p-5 flex flex-col h-full hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-300 group/calc">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900 group-hover/calc:bg-sky-500 transition-colors"></span>
                <h2 className="text-xs font-bold tracking-wider uppercase text-slate-800 group-hover/calc:text-sky-900 transition-colors">110% CIF CALCULATION</h2>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider group-hover/calc:bg-sky-50 group-hover/calc:text-sky-600 group-hover/calc:border-sky-200 transition-colors">
                ERP Validated
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-normal">
              Synthesized from verified commercial invoice and automated freight logistics records.
            </p>
            
            <div className="bg-white rounded-xl border border-slate-200/60 p-4 space-y-3 flex-1 flex flex-col justify-between group-hover/calc:border-sky-100 group-hover/calc:shadow-sm transition-all">
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600 group-hover/calc:text-slate-700 transition-colors">
                  <span>Base Commercial Invoice Value</span>
                  <span className="font-semibold text-slate-900">$184,500.00</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 group-hover/calc:text-slate-700 transition-colors">
                  <span>Freight, Handling & Port Fees</span>
                  <span className="font-semibold text-slate-900">$6,500.00</span>
                </div>
                <div className="h-px bg-slate-100 my-1 group-hover/calc:bg-sky-50 transition-colors"></div>
                <div className="flex justify-between items-center text-slate-800 font-medium">
                  <span>Calculated CIF Base</span>
                  <span className="font-bold text-slate-900">$191,000.00</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1 group-hover/calc:bg-sky-50/50 group-hover/calc:border-sky-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">110% Mandatory Cargo Clause</span>
                    <span className="font-bold text-slate-900">$210,100.00</span>
                  </div>
                  <p className="text-[11px] text-slate-400 group-hover/calc:text-sky-600 transition-colors">1.10 × ($184,500.00 + $6,500.00) insurable total</p>
                </div>
                <div className="flex justify-between items-center text-slate-600 pt-1 group-hover/calc:text-slate-700 transition-colors">
                  <span>Underwriting Risk Rate</span>
                  <span className="font-semibold text-slate-900">0.116% <span className="text-[10px] font-normal text-slate-500">(Fleet Tier)</span></span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between group-hover/calc:border-sky-100 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover/calc:text-sky-600 transition-colors">Net Premium Due</p>
                  <p className="text-xs text-slate-500 group-hover/calc:text-sky-700/70 transition-colors">Billed to Open Corporate Policy</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-slate-900 group-hover/calc:text-sky-900 transition-colors">$243.72</span>
                  <span className="text-xs text-slate-400 font-medium group-hover/calc:text-sky-600 transition-colors"> USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: INSTANT API PURCHASE */}
          <div className="bg-[#F8FAFC]/70 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-300 group/api">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover/api:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all"></span>
                  <h2 className="text-xs font-bold tracking-wider uppercase text-slate-800 group-hover/api:text-emerald-900 transition-colors">INSTANT API BIND</h2>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100/70 text-emerald-700 px-2.5 py-0.5 rounded-full tracking-wider uppercase group-hover/api:bg-emerald-100 group-hover/api:shadow-sm transition-all">
                  Ready to Auto-Bind
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4 font-normal">
                Instant smart parametric policy generation through syndicated underwriting API.
              </p>
              
              <div className="bg-white rounded-xl border border-slate-200/70 p-4 shadow-2xs mb-4 group-hover/api:border-emerald-200 group-hover/api:shadow-sm transition-all group/pdf">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700 group-hover/pdf:bg-emerald-50 group-hover/pdf:text-emerald-600 transition-colors">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900 truncate group-hover/pdf:text-emerald-900 transition-colors">Policy #POL-AERO-88491.pdf</p>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded group-hover/pdf:bg-emerald-100 transition-colors">READY</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Lloyd's Marine Syndicate 442 • PDF/A-3 Compliant</p>
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 text-[11px] group-hover/pdf:border-emerald-100/50 transition-colors">
                      <button className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 -ml-2 rounded transition-all active:scale-95 group/btn">
                        <Download className="w-3 h-3 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span>Download Certificate</span>
                      </button>
                      <span className="text-slate-300">•</span>
                      <button className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-all active:scale-95 group/btn2">
                        <Send className="w-3 h-3 group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform" />
                        <span>Transmit to Port</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs mb-5">
                <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100 group-hover/api:border-emerald-50 transition-colors">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    <span className="group-hover/api:text-slate-700 transition-colors">Underwriting Consortium:</span>
                  </span>
                  <span className="font-semibold text-slate-800">Lloyd's Marine Cargo #442</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100 group-hover/api:border-emerald-50 transition-colors">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    <span className="group-hover/api:text-slate-700 transition-colors">Clause Structure:</span>
                  </span>
                  <span className="font-semibold text-slate-800">ICC (A) All Risks Clause</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    <span className="group-hover/api:text-slate-700 transition-colors">Port Authority Status:</span>
                  </span>
                  <span className="font-semibold text-emerald-600">Pre-Approved for Entry</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-slate-900 hover:bg-slate-800 hover:shadow-lg text-white font-medium py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-300 active:scale-[0.99] group-hover/api:bg-emerald-600 group-hover/api:text-white">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 group-hover/api:text-white group-hover/api:fill-white transition-colors" />
              <span className="font-semibold tracking-wide">Auto-Bind Policy & Issue Certificate</span>
            </button>
          </div>
        </div>
      </div>
      
      <CargoDatabaseModal 
        isOpen={isCargoModalOpen} 
        onClose={() => setIsCargoModalOpen(false)} 
      />

      <BindPendingModal 
        isOpen={isBindModalOpen} 
        onClose={() => setIsBindModalOpen(false)} 
      />
    </div>
  );
}
