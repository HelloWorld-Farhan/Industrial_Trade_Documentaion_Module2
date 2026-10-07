import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, FileText, X, Database, CheckCircle2, UploadCloud, FileCheck2, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopHeader } from '../components/TopHeader';

export default function DocGenPage() {
  const navigate = useNavigate();
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState({
    invoice: true,
    packingList: true,
    billOfLading: false,
    certificateOrigin: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (isDataModalOpen || isGenerateModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isDataModalOpen, isGenerateModalOpen]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerateModalOpen(false);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsUploaded(true);
  };

  return (
    <div className={`flex-1 flex flex-col bg-slate-50/50 relative h-full ${isDataModalOpen || isGenerateModalOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}>
      
      <TopHeader 
        searchPlaceholder="Search manifests, documents, references..."
        actionButton={
          <button 
            onClick={() => setIsGenerateModalOpen(true)}
            className="flex items-center space-x-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition h-[38px]">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Generate New Documents</span>
          </button>
        }
      />

      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* TOP HERO CARD */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#0F172A] tracking-tight">1. Document Generation & OCR Bot</h2>
            <p className="text-xs text-slate-500 mt-0.5">Inherited upstream ERP records, dossier generation & vision verification</p>
          </div>
          {/* Metric Numbers Block */}
          <div className="flex items-center gap-6 md:gap-8 md:border-l border-slate-100 md:pl-8">
            <div className="text-left">
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight font-sans">94</div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wide mt-0.5">Documents Done</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight font-sans">23</div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wide mt-0.5">In verification</div>
            </div>
          </div>
        </div>

        {/* SECTION A: INHERITED ERP DATA RECORD */}
        <div className="space-y-3 relative group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0F172A]"></span>
              Inherited ERP Data Record
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsDataModalOpen(true)}
                className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-[#0F172A] text-white hover:bg-slate-800 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Database className="w-3 h-3" />
                View Raw ERP Telemetry
              </button>
              <span className="text-[10px] px-2.5 py-1.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                Read-Only Database
              </span>
            </div>
          </div>
          
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"
          >
            <div onClick={() => setIsDataModalOpen(true)} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Customer Name</div>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">Apex Turbine Dynamics Corp.</div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">EIN: 84-2938491 (Tier 1)</div>
            </div>
            
            <div onClick={() => setIsDataModalOpen(true)} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Consigned Item</div>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">Cryogenic Titanium Valves</div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">48 Units • Mil-Spec C-91</div>
            </div>
            
            <div onClick={() => setIsDataModalOpen(true)} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Declared Value</div>
              <div className="text-sm font-bold text-slate-900 mt-1 font-mono">$184,500.00 USD</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Incoterms: DDP Rotterdam</div>
            </div>
            
            <div onClick={() => setIsDataModalOpen(true)} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Certified Weight</div>
              <div className="text-sm font-bold text-slate-900 mt-1 font-mono">1,420.50 kg</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Tare: 82.00 kg (6 Skids)</div>
            </div>
            
            <div onClick={() => setIsDataModalOpen(true)} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Declared HS Code</div>
              <div className="text-sm font-bold text-blue-600 mt-1 font-mono">8481.80.9050</div>
              <div className="text-[10px] text-slate-500 mt-0.5">EU TARIC Sub-heading</div>
            </div>
          </div>
        </div>

        {/* SECTION B & C */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SECTION B: ONE-CLICK GENERATION */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0F172A]"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Auto-Generation</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ERP Validated
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Synthesize legal Commercial Invoices, Packing Slips, and EUR.1 Certificates directly from upstream data.
              </p>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 truncate font-mono pr-2">Commercial_Invoice_INV-2024.pdf</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">PDF/A-3 Compliant • $184,500.00</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">READY</span>
                </div>
                
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 truncate font-mono pr-2">Consolidated_Packing_List_PL.pdf</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">6 ISO Pallets • 1,420.50 kg</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">READY</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsGenerateModalOpen(true)}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <span>Generate Customs Documents</span>
            </button>
          </div>

          {/* SECTION C: OCR SCAN & RECONCILIATION */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">OCR Physical Verification</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">Vision-Transformer v9</span>
              </div>
              
              {/* INTERACTIVE DRAG & DROP ZONE */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-6 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all duration-200 mb-5 relative overflow-hidden group
                  ${isDragging ? 'border-sky-500 bg-sky-50 scale-[1.01]' : isUploaded ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-400 bg-slate-50'}
                `}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                  <div className={`w-12 h-12 mx-auto rounded-full border flex items-center justify-center shadow-sm transition-all duration-300
                    ${isDragging ? 'bg-sky-500 border-sky-600 text-white animate-bounce' : isUploaded ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-600'}
                  `}>
                    {isUploaded ? <FileCheck2 className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className={`text-sm font-bold transition-colors ${isDragging ? 'text-sky-700' : isUploaded ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {isDragging ? 'Drop file to scan immediately...' : isUploaded ? 'Analysis Complete. Document Validated.' : 'Drag & Drop Physical Waybill or Supplier Invoice'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {isUploaded ? 'Processed in 0.4s via Neural Vision Engine' : 'Click to browse or drop a PDF/Image to re-verify reconciliation'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                      <th className="px-3 py-3">Field Entity</th>
                      <th className="px-3 py-3">ERP Database</th>
                      <th className="px-3 py-3">OCR Scan</th>
                      <th className="px-3 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-3 py-2.5 font-sans font-semibold text-slate-800">Customer Name</td>
                      <td className="px-3 py-2.5 text-slate-500 truncate max-w-[120px]">Apex Turbine Dynamics</td>
                      <td className="px-3 py-2.5 text-slate-800 truncate max-w-[120px]">Apex Turbine Dynamics</td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-sans font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Matches
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-3 py-2.5 font-sans font-semibold text-slate-800">Consigned Item</td>
                      <td className="px-3 py-2.5 text-slate-500">Valves (Qty: 48)</td>
                      <td className="px-3 py-2.5 text-slate-800">Valves (Qty: 48)</td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-sans font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Matches
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-rose-50/70 border-l-2 border-l-rose-500">
                      <td className="px-3 py-2.5 font-sans font-bold text-rose-800">Gross Weight</td>
                      <td className="px-3 py-2.5 text-slate-500">1,420.50 kg</td>
                      <td className="px-3 py-2.5 text-rose-700 font-bold">1,488.00 kg (+67.5)</td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-sans font-bold">Discrepancy</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-3 py-2.5 font-sans font-semibold text-slate-800">HS Code</td>
                      <td className="px-3 py-2.5 text-slate-500">8481.80.9050</td>
                      <td className="px-3 py-2.5 text-slate-800">8481.80.9050</td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-sans font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Matches
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 animate-pulse"></span>
                <span className="text-[11px] text-rose-800 font-medium leading-relaxed">
                  <strong>Flagged Risk:</strong> Paper invoice implies <span className="font-bold underline">+67.5 kg variance</span> over ERP weight. Physical inspection recommended.
                </span>
              </div>
              <button 
                onClick={() => navigate('/dashboard/compliance')}
                className="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <span>Inspect in Compliance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL / POPUP: POWER-BI STYLE ERP DATA VIEWER */}
      <AnimatePresence>
        {isDataModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDataModalOpen(false)}
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
                  onClick={() => setIsDataModalOpen(false)}
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
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span className="text-slate-500 font-medium">Net Weight (Valves)</span>
                            <span className="font-mono font-bold text-slate-900">1,420.50 kg</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" style={{ width: '94%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span className="text-slate-500 font-medium">Tare Weight (Skids)</span>
                            <span className="font-mono font-bold text-slate-900">82.00 kg</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: '6%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100 relative z-10">
                      <div className="text-[10px] text-slate-500">Total Gross Weight: <span className="font-mono font-bold text-slate-900 tracking-wide text-[11px] ml-1">1,502.50 kg</span></div>
                    </div>
                  </div>

                  {/* Chart 2: Cost Breakdown */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                     <div className="relative z-10 h-full flex flex-col">
                       <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                          Value Breakdown
                       </h4>
                       <div className="flex-1 flex flex-col justify-end mt-2">
                         <div className="flex items-end gap-5 h-24 mb-4 border-b border-slate-100 pb-2">
                           <div className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-xl h-full relative group/bar transition-all opacity-90 hover:opacity-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] shadow-sm">
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none">$150,000</div>
                           </div>
                           <div className="flex-1 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-t-xl h-3/4 relative group/bar transition-all opacity-80 hover:opacity-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] shadow-sm">
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none">$24,500</div>
                           </div>
                           <div className="flex-1 bg-gradient-to-t from-emerald-300 to-emerald-200 rounded-t-xl h-1/4 relative group/bar transition-all opacity-70 hover:opacity-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] shadow-sm">
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none">$10,000</div>
                           </div>
                         </div>
                         <div className="flex text-[9px] font-bold text-slate-400 text-center uppercase tracking-wider">
                            <span className="flex-1 hover:text-slate-600 transition-colors">Base Goods</span>
                            <span className="flex-1 hover:text-slate-600 transition-colors">Taxes (Est.)</span>
                            <span className="flex-1 hover:text-slate-600 transition-colors">Freight</span>
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
                  onClick={() => setIsDataModalOpen(false)}
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

      {/* DOCUMENT GENERATION MODAL */}
      <AnimatePresence>
        {isGenerateModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isGenerating && setIsGenerateModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9998] flex items-center justify-center p-4 md:p-6 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden flex flex-col pointer-events-auto"
            >
              <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-sky-500" /> Generate Documents
                </h3>
                <button 
                  onClick={() => setIsGenerateModalOpen(false)}
                  disabled={isGenerating}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 bg-white">
                <p className="text-xs text-slate-500 mb-4">Select the required customs documents to auto-generate based on upstream ERP data.</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" checked={selectedDocs.invoice} onChange={(e) => setSelectedDocs({...selectedDocs, invoice: e.target.checked})} disabled={isGenerating} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Commercial Invoice</div>
                      <div className="text-[10px] text-slate-400">Standard INV format for cross-border trade</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" checked={selectedDocs.packingList} onChange={(e) => setSelectedDocs({...selectedDocs, packingList: e.target.checked})} disabled={isGenerating} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Consolidated Packing List</div>
                      <div className="text-[10px] text-slate-400">Detailed container & skid breakdown</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" checked={selectedDocs.billOfLading} onChange={(e) => setSelectedDocs({...selectedDocs, billOfLading: e.target.checked})} disabled={isGenerating} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Bill of Lading (Draft)</div>
                      <div className="text-[10px] text-slate-400">Carrier transportation agreement</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" checked={selectedDocs.certificateOrigin} onChange={(e) => setSelectedDocs({...selectedDocs, certificateOrigin: e.target.checked})} disabled={isGenerating} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">EUR.1 Certificate of Origin</div>
                      <div className="text-[10px] text-slate-400">Preferential duty certification</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsGenerateModalOpen(false)}
                  disabled={isGenerating}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !Object.values(selectedDocs).some(Boolean)}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm rounded-lg flex items-center justify-center min-w-[150px] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Generating...</>
                  ) : (
                    'Generate Selected'
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
