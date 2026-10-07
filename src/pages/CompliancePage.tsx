import { useState } from 'react';
import { ShieldAlert, Check, ArrowRight } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { RiskAuditModal } from '../components/RiskAuditModal';

export default function CompliancePage() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedJustification, setSelectedJustification] = useState("Certified Skidding Verified by Scale Master (Tare +67.5kg)");

  return (
    <div className={`flex-1 flex flex-col bg-slate-50/50 relative ${isAuditModalOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}>
      <TopHeader 
        searchPlaceholder="Search audit trail, HS code, consignments..."
        actionButton={
          <button 
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 shadow-sm transition h-[38px] hover:shadow-md active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Run AI Risk Audit</span>
          </button>
        }
      />

      <div className="p-6 space-y-5">
        {/* Content Title & KPI Bar */}
        <section className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">5. Compliance Risk Flagging & Anomaly Audit</h1>
            <p className="text-xs text-slate-500 mt-0.5">Machine learning outlier detection across historical manifest weights, HS codes, and sanctions screening</p>
          </div>
          <div className="flex items-center gap-6 self-start md:self-auto">
            <div className="text-right">
              <div className="text-2xl font-bold tracking-tight text-rose-600 font-mono">1</div>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Discrepancy Flagged</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-right">
              <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono">99.2%</div>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Compliance Score</p>
            </div>
          </div>
        </section>

        {/* SECTION A - Historical Multi-Consignment Scanning Table */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">HISTORICAL MULTI-CONSIGNMENT SCANNING</h2>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">Cross-Manifest Peer Batch v4.2</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Consignment Ref</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Declared Weight</th>
                  <th className="py-2.5 px-3">Actual / Tare Weight</th>
                  <th className="py-2.5 px-3">Declared Value</th>
                  <th className="py-2.5 px-3 text-center">Risk Score</th>
                  <th className="py-2.5 px-3 text-right">Status / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {/* Row 1: Passed */}
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">CON-US-99116</td>
                  <td className="py-2.5 px-3 text-slate-500 font-sans">20 Feb 2025</td>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Cryogenic Valves</td>
                  <td className="py-2.5 px-3 text-slate-600">1,418.00 kg</td>
                  <td className="py-2.5 px-3 text-slate-600">1,418.20 kg</td>
                  <td className="py-2.5 px-3 text-slate-700">$180,000</td>
                  <td className="py-2.5 px-3 text-center"><span className="text-emerald-700 font-semibold">0.02</span></td>
                  <td className="py-2.5 px-3 text-right font-sans">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Passed
                    </span>
                  </td>
                </tr>
                {/* Row 2: Passed */}
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">CON-US-99118</td>
                  <td className="py-2.5 px-3 text-slate-500 font-sans">22 Feb 2025</td>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Cryogenic Valves</td>
                  <td className="py-2.5 px-3 text-slate-600">1,422.00 kg</td>
                  <td className="py-2.5 px-3 text-slate-600">1,421.80 kg</td>
                  <td className="py-2.5 px-3 text-slate-700">$182,500</td>
                  <td className="py-2.5 px-3 text-center"><span className="text-emerald-700 font-semibold">0.03</span></td>
                  <td className="py-2.5 px-3 text-right font-sans">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Passed
                    </span>
                  </td>
                </tr>
                {/* Row 3: Flagged Anomaly */}
                <tr className="bg-rose-50/80 hover:bg-rose-50 border-l-4 border-l-rose-500 transition">
                  <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                    CON-US-99120 <span className="text-[9px] bg-slate-900 text-white px-1 py-0.5 rounded font-sans font-medium">Current</span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-sans font-medium">24 Feb 2025</td>
                  <td className="py-3 px-3 text-rose-950 font-sans font-semibold">Cryogenic Titanium Valves</td>
                  <td className="py-3 px-3 text-slate-700">1,420.50 kg</td>
                  <td className="py-3 px-3 font-bold text-rose-700">
                    1,488.00 kg 
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded ml-1">(+67.5 kg variance)</span>
                  </td>
                  <td className="py-3 px-3 text-slate-900 font-bold">$184,500</td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-rose-700 bg-rose-200/70 px-2 py-0.5 rounded-md text-[11px]">0.89 CRITICAL</span>
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm animate-pulse">
                      ANOMALY DETECTED
                    </span>
                  </td>
                </tr>
                {/* Row 4: Passed */}
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">CON-US-99112</td>
                  <td className="py-2.5 px-3 text-slate-500 font-sans">18 Feb 2025</td>
                  <td className="py-2.5 px-3 text-slate-700 font-sans">Hydraulic Couplers</td>
                  <td className="py-2.5 px-3 text-slate-600">820.00 kg</td>
                  <td className="py-2.5 px-3 text-slate-600">820.10 kg</td>
                  <td className="py-2.5 px-3 text-slate-700">$94,000</td>
                  <td className="py-2.5 px-3 text-center"><span className="text-emerald-700 font-semibold">0.01</span></td>
                  <td className="py-2.5 px-3 text-right font-sans">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Passed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Two Column Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Section B - Root Cause Breakdown */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">THE ROOT CAUSE BREAKDOWN</h2>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">3.0σ Sigma Alert</span>
              </div>
              
              <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-3.5 mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-rose-100 rounded-lg text-rose-700 flex-shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 leading-tight">Weight Deviation +4.75% (+67.50 kg) Exceeds Safety Margin</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Statistical tolerance threshold breached for declared <span className="font-mono font-semibold text-slate-800">HS 8481.80.9050</span>. Machine learning vector analysis indicates high correlation with packaging discrepancy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suspected Diagnostic Causes</p>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="text-slate-700 font-medium text-[11px]">Secondary heavy wooden skidding unaccounted in ERP tare</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">84% Probability</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span className="text-slate-700 font-medium text-[11px]">Undeclared ancillary structural components or tooling</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">14% Probability</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Model: Outlier-Forest-v4 (Confidence: 98.4%)</span>
              <span className="font-mono text-slate-500">Manifest: Apex Turbine Dynamics</span>
            </div>
          </section>

          {/* Section C - Resolution & Escalation */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">ONE-CLICK RESOLUTION & ESCALATION</h2>
                </div>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 font-semibold">Authorized Action Required</span>
              </div>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Select an automated remediation pipeline below to finalize customs clearance dossier or engage Port Authority hold procedures.
              </p>

              <div className="border border-emerald-300 rounded-2xl p-4 mb-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-[13px] font-bold text-emerald-900 tracking-tight">Clear Flag (Documented Tare Variance)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono tracking-wide">Form 214-A</span>
                </div>
                
                <div className="mb-4">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Audit Justification</label>
                  
                  {/* Custom Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-white border border-slate-800 rounded-xl text-xs py-2.5 px-3 text-slate-800 font-medium flex items-center justify-between shadow-sm cursor-pointer hover:border-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                    >
                      <span className="truncate">{selectedJustification}</span>
                      <svg className={`w-4 h-4 text-slate-800 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-emerald-500 rounded-lg shadow-xl z-50 overflow-hidden">
                        {[
                          "Certified Skidding Verified by Scale Master (Tare +67.5kg)",
                          "Packaging Material Desiccant & Crate Reinforced",
                          "Manufacturer Specification Revision Attached"
                        ].map((option, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setSelectedJustification(option);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-3 py-2.5 text-xs cursor-pointer transition-colors ${selectedJustification === option ? 'bg-blue-600 text-white font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <button className="w-full py-3 bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-md hover:border-emerald-400 active:scale-[0.99] border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-sm">
                  Apply Justification & Re-validate Dossier
                </button>
              </div>

              <div className="border border-rose-200 bg-[#FFF5F6] rounded-2xl p-4 hover:shadow-md hover:border-rose-300 transition-all group/escalate cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-200/60 text-rose-700 flex items-center justify-center shrink-0 group-hover/escalate:bg-rose-200 transition-colors">
                      <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-[13px] font-bold text-rose-950 tracking-tight">Escalate to Border Quarantine & Inspection</span>
                  </div>
                  <span className="text-[11px] font-bold text-rose-600 font-mono tracking-wide">CBP Priority</span>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed mb-4 font-medium">
                  Dispatches automated red flag notification to Port of Entry Authority and holds digital bill of lading.
                </p>
                <button className="w-full py-3 bg-[#E11D48] hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Dispatch Formal Hold to Port Authority
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-3 text-right">
              <span className="text-[10px] text-slate-400 font-medium">Audit trail logged under officer token #EJ-7729-AUTH</span>
            </div>
          </section>
        </div>
      </div>
      <RiskAuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </div>
  );
}
