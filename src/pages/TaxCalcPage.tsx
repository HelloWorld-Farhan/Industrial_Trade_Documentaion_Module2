import { useState } from 'react';
import { Calculator, Download, Check, AlertTriangle, MessageSquare, BookOpen } from 'lucide-react';
import { DataExplorerModal } from '../components/DataExplorerModal';
import { TariffTableModal } from '../components/TariffTableModal';
import { TaxRecalculateModal } from '../components/TaxRecalculateModal';
import { TopHeader } from '../components/TopHeader';

export default function TaxCalcPage() {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isTariffModalOpen, setIsTariffModalOpen] = useState(false);
  const [isRecalculateModalOpen, setIsRecalculateModalOpen] = useState(false);

  return (
    <div className={`flex-1 flex flex-col bg-slate-50/50 relative ${isDataModalOpen || isTariffModalOpen || isRecalculateModalOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}>
      
      <TopHeader 
        searchPlaceholder="Search tariff codes, HS rules, consignee..."
        actionButton={
          <button 
            onClick={() => setIsRecalculateModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all h-[38px] active:scale-95"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-300" />
            <span>Recalculate AI Taxes</span>
          </button>
        }
      />

      {/* Dashboard Body Content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Header Module Info & Metric Badges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">2. Customs Duty & Tax Calculator AI</h1>
            <p className="text-xs text-slate-500 mt-1">Automated TARIC classification, preferential rate lookup & tax liability forecasting</p>
          </div>
          <div className="flex items-center gap-8 md:border-l border-slate-100 md:pl-8">
            <div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">€40,492.87</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Total Duty & VAT</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600 tracking-tight">2.20%</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Preferential Rate</div>
            </div>
          </div>
        </div>

        {/* SECTION A */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">INHERITED ERP ASSESSABLE VALUES</h2>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">Read-Only Database</span>
          </div>
          
          <div 
            onClick={() => setIsDataModalOpen(true)}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 cursor-pointer"
          >
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:ring-2 hover:ring-blue-500/50 transition-all">
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Assessable CIF Value</div>
              <div className="text-base font-bold text-slate-900 mt-1">$184,500.00 USD</div>
              <div className="text-[11px] text-slate-500 mt-0.5">€169,820.00 EUR converted</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:ring-2 hover:ring-blue-500/50 transition-all">
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Origin / Destination</div>
              <div className="text-base font-bold text-slate-900 mt-1">US-ORD → NL-RTM</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Chicago to Rotterdam Port</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:ring-2 hover:ring-blue-500/50 transition-all">
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Declared HS Code</div>
              <div className="text-base font-bold text-blue-600 mt-1">8481.80.9050</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Validated EU TARIC Sub-heading</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:ring-2 hover:ring-blue-500/50 transition-all">
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Incoterms</div>
              <div className="text-base font-bold text-slate-900 mt-1">DDP Rotterdam</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Prepaid by consignor</div>
            </div>
          </div>
        </div>

        {/* SECTION B & C Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Section B (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">RULES LOOKUP & INSTANT MATH BREAKDOWN</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsTariffModalOpen(true)}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    Tariff Table
                  </button>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">TARIC Match 100%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">Autonomous application of EU Common Customs Tariff & Dutch national tax codes.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                      <th className="pb-2.5 font-bold">Component</th>
                      <th className="pb-2.5 font-bold">Taxable Base</th>
                      <th className="pb-2.5 font-bold">Rate</th>
                      <th className="pb-2.5 font-bold">Legal Rule</th>
                      <th className="pb-2.5 font-bold text-right">Sum</th>
                      <th className="pb-2.5 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 font-semibold text-slate-800">Third-Country Duty</td>
                      <td className="py-3 text-slate-500">€169,820.00</td>
                      <td className="py-3 text-slate-700 font-medium">2.20%</td>
                      <td className="py-3 text-[11px] text-slate-400">TARIC Chap. 84 / WTO bound</td>
                      <td className="py-3 text-right font-bold text-slate-900">€3,736.04</td>
                      <td className="py-3 text-right">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">READY</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 font-semibold text-slate-800">Standard Dutch VAT</td>
                      <td className="py-3 text-slate-500">€173,556.04</td>
                      <td className="py-3 text-slate-700 font-medium">21.00%</td>
                      <td className="py-3 text-[11px] text-slate-500 leading-relaxed pr-2">Dutch Wet op de Omzetbelasting</td>
                      <td className="py-3 text-right font-bold text-slate-900">€36,446.77</td>
                      <td className="py-3 text-right">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">READY</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 font-semibold text-slate-800">Port Surcharge & Eco Levy</td>
                      <td className="py-3 text-slate-500">Fixed Assessment</td>
                      <td className="py-3 text-slate-700 font-medium">0.18%</td>
                      <td className="py-3 text-[11px] text-slate-500 leading-relaxed pr-2">Port of Rotterdam Tariff 2025</td>
                      <td className="py-3 text-right font-bold text-slate-900">€310.06</td>
                      <td className="py-3 text-right">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">READY</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Total Liquid Settlement</span>
                <span className="text-xl font-bold text-slate-900">€40,492.87 EUR</span>
              </div>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 shadow-sm transition-all flex-shrink-0">
                <Download className="w-4 h-4 text-slate-300" />
                <span className="whitespace-nowrap">Export Tax Dossier</span>
              </button>
            </div>
          </div>

          {/* Section C (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">THE SAFETY NET</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Divergence Engine v4</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Calculation</span>
                  <span className="text-lg font-bold text-slate-900 mt-1 block">€40,492.87</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Validated TARIC
                  </span>
                </div>
                <div className="bg-rose-50/60 border border-rose-200/60 p-3.5 rounded-xl">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">Manual Broker Quote</span>
                  <span className="text-lg font-bold text-rose-700 mt-1 block">€47,810.00</span>
                  <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Unverified Surcharge
                  </span>
                </div>
              </div>

              <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3.5 mb-5">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-800">Overcharge Variance Detected</h4>
                    <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                      Manual broker quote erroneously includes non-applicable anti-dumping surcharge 
                      <span className="font-bold underline"> (+€7,317.13 / +18.1% divergence)</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-xl font-medium text-xs shadow-sm transition-all flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Enforce AI Tariff Override</span>
              </button>
              <button className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-2.5 px-4 rounded-xl font-medium text-xs transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Request Broker Explanation</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
      
      <DataExplorerModal 
        isOpen={isDataModalOpen} 
        onClose={() => setIsDataModalOpen(false)} 
      />
      <TariffTableModal
        isOpen={isTariffModalOpen}
        onClose={() => setIsTariffModalOpen(false)}
      />
      <TaxRecalculateModal
        isOpen={isRecalculateModalOpen}
        onClose={() => setIsRecalculateModalOpen(false)}
      />
    </div>
  );
}
