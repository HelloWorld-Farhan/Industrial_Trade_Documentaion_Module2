import { useState } from 'react';
import { Activity } from 'lucide-react';
import { StageDetailsModal } from '../components/StageDetailsModal';
import { PortTelemetryModal } from '../components/PortTelemetryModal';
import { TopHeader } from '../components/TopHeader';

export default function ClearancePage() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);

  return (
    <div className={`flex-1 flex flex-col bg-white relative custom-scrollbar ${activeStage !== null || isTelemetryModalOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}>
      <TopHeader 
        searchPlaceholder="Search manifest, BOL, container or HS code..."
        actionButton={
          <button 
            onClick={() => setIsTelemetryModalOpen(true)}
            className="flex items-center space-x-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition h-[38px]"
          >
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Ping Port Telemetry</span>
          </button>
        }
      />

      {/* Dashboard Body Content */}
      <div className="p-6 space-y-6">
        {/* Header Module Info Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">3. Clearance Status Tracker</h1>
            <p className="text-xs text-slate-500 mt-0.5">Real-time port terminal customs inspection pipeline, AI timer & auto-escalation triggers</p>
          </div>
          <div className="flex items-center space-x-6 text-right">
            <div>
              <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">01:42:18</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">AI Target ETA</div>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">Stage 2 <span className="text-xs font-normal text-slate-400">/ 3</span></div>
              <div className="text-[11px] text-amber-500 uppercase tracking-wider font-semibold">In Progress</div>
            </div>
          </div>
        </div>

        {/* SECTION A - Live Progress Pipeline */}
        <section className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">LIVE PROGRESS PIPELINE</h2>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium font-mono">Port of Rotterdam • Terminal 4</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div 
              onClick={() => setActiveStage(1)}
              className="border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70 cursor-pointer hover:shadow-md hover:ring-2 hover:ring-emerald-500/20 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">Stage 1: Completed</span>
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Document Check</h3>
                <p className="text-[11px] text-slate-500 mt-1">All shipping documents verified without errors.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 text-[10px] text-slate-600 flex justify-between font-mono">
                <span>Node: Douane Rotterdam</span>
                <span className="font-semibold text-emerald-700">08:30 CET</span>
              </div>
            </div>

            {/* Step 2 (ACTIVE) */}
            <div 
              onClick={() => setActiveStage(2)}
              className="border-2 border-indigo-500/40 bg-indigo-50/20 hover:bg-indigo-50/40 cursor-pointer hover:shadow-md hover:ring-2 hover:ring-indigo-500/20 rounded-xl p-4 relative flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                    <span>Stage 2: Active</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600">78% Complete</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">Physical Inspection</h3>
                <p className="text-[11px] text-slate-600 mt-1">Container is currently being inspected at the terminal.</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Inspector ID: #4492-NL</span>
                  <span className="text-indigo-600 font-semibold">Active Bay 12</span>
                </div>
              </div>
            </div>

            {/* Step 3 (Upcoming) */}
            <div 
              onClick={() => setActiveStage(3)}
              className="border border-slate-200 bg-slate-50/50 hover:bg-slate-100 cursor-pointer hover:shadow-md hover:ring-2 hover:ring-slate-400/20 rounded-xl p-4 flex flex-col justify-between opacity-80 hover:opacity-100 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">Stage 3: Pending</span>
                  <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-bold group-hover:bg-slate-200 transition-colors">3</span>
                </div>
                <h3 className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Final Release & Gate Pass</h3>
                <p className="text-[11px] text-slate-400 mt-1">Awaiting final clearance barcode for truck departure.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between font-mono">
                <span>Target Node: Gate-Out Auto-Lane</span>
                <span>ETA: ~10:45 CET</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Split (Section B & Section C) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section B - Smart Timer */}
          <section className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">SMART TIMER & PREDICTIVE AI</h2>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">NeuralForecast v4.1</span>
              </div>
              
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 mb-4 text-center">
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Estimated Release Time</p>
                <div className="text-4xl font-extrabold font-mono tracking-tight text-slate-900 my-1">
                  01<span className="text-slate-400">:</span>42<span className="text-slate-400">:</span>18
                </div>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center justify-center space-x-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                  <span>Confidence Level: 96.4% Accuracy</span>
                </p>
              </div>

              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-xs text-slate-600 mb-4 leading-relaxed">
                <span className="font-bold text-slate-900">Historical AI Insight:</span> Historical clearance for HS 8481 at Maasvlakte averages 2h 15m. Delay risk index is <span className="font-semibold text-emerald-700">LOW (12%)</span>. Port terminal traffic is operating at nominal capacity.
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/40 text-center">
                  <div className="text-[10px] text-slate-400 font-medium">Avg Clearance</div>
                  <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">1h 54m</div>
                </div>
                <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/40 text-center">
                  <div className="text-[10px] text-slate-400 font-medium">Peak Delay Risk</div>
                  <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">4:00 PM CET</div>
                </div>
                <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/40 text-center">
                  <div className="text-[10px] text-slate-400 font-medium">Dwell Savings</div>
                  <div className="text-sm font-bold text-emerald-600 font-mono mt-0.5">+38%</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Telemetry Feed: Active (14s latency)</span>
              <span className="text-slate-500 font-medium">Container #MSKU-998241</span>
            </div>
          </section>

          {/* Section C - Auto-Escalation */}
          <section className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">AUTO-ESCALATION SAFEGUARD</h2>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">SLA Guardian</span>
              </div>
              
              <div className="bg-[#FFF5F5] border border-rose-200 rounded-xl p-3.5 mb-4">
                <div className="flex items-start space-x-2.5">
                  <svg className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                  <div>
                    <h4 className="text-xs font-bold text-rose-900">Auto-Escalation Safeguard Rule Active</h4>
                    <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                      If inspection dwell time breaches <strong className="font-mono">02:30:00</strong>, automated SMS & PagerDuty alerts dispatch immediately to Warehouse Supervisor and Drayage Dispatch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Assigned Port Supervisor</span>
                  <span className="font-semibold text-slate-800">Dave Miller (Rotterdam Hub 4)</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Dispatch Queue State</span>
                  <span className="font-semibold text-emerald-600 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Standby (Truck #84 Ready)</span>
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Demurrage Fine Risk</span>
                  <span className="font-semibold text-slate-700 font-mono">€0.00 / Zero Penalty</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
              <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5">
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                <span>Notify Transport Carrier</span>
              </button>
              <button className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition shadow-xs flex items-center justify-center space-x-1.5">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                <span>Simulate Escalation Alert</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      
      <StageDetailsModal 
        isOpen={activeStage !== null} 
        onClose={() => setActiveStage(null)} 
        stageId={activeStage} 
      />

      <PortTelemetryModal 
        isOpen={isTelemetryModalOpen} 
        onClose={() => setIsTelemetryModalOpen(false)} 
      />
    </div>
  );
}
