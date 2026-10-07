import { useState, useEffect } from 'react';
import { Search, Calendar, Radio, RefreshCcw } from 'lucide-react';

interface TopHeaderProps {
  searchPlaceholder?: string;
  actionButton?: React.ReactNode;
}

export function TopHeader({ 
  searchPlaceholder = "Search manifests, BOL, container or HS code...", 
  actionButton 
}: TopHeaderProps) {
  const [syncSeconds, setSyncSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncSeconds(prev => (prev >= 5 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="p-4 md:p-6 pb-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4 sticky top-0 bg-white/90 backdrop-blur-sm z-30">
      
      {/* Top Row: Search & Action Button */}
      <div className="flex items-center justify-between gap-3 w-full lg:w-auto lg:flex-1">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full bg-[#F8FAFC] border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition" 
          />
        </div>
        
        {/* Action Button (Mobile Only) */}
        <div className="lg:hidden shrink-0">
          {actionButton}
        </div>
      </div>
      
      {/* Bottom Row / Right Side Context (Scrollable on Mobile) */}
      <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar w-full lg:w-auto -mx-4 px-4 lg:mx-0 lg:px-0 pb-1 lg:pb-0 shrink-0">
        
        {/* Live Active Tracking Context */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg shadow-sm shrink-0">
          <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-slate-700 tracking-wide">CON-US-99120</span>
          <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Live</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1.5 rounded-lg shadow-sm shrink-0">
          <RefreshCcw className={`w-3.5 h-3.5 ${syncSeconds === 0 ? 'animate-spin text-emerald-500' : ''}`} />
          <span className="text-[10px] font-mono font-medium">
            {syncSeconds === 0 ? 'Synced' : `${syncSeconds}s`}
          </span>
        </div>

        {/* Calendar Badge */}
        <div className="flex items-center space-x-2 bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-medium cursor-pointer hover:bg-slate-100 transition h-[38px] shrink-0">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="whitespace-nowrap">Monday, 24th Feb</span>
        </div>

        {/* Action Button (Desktop Only) */}
        <div className="hidden lg:block shrink-0 ml-2">
          {actionButton}
        </div>

      </div>
    </header>
  );
}
