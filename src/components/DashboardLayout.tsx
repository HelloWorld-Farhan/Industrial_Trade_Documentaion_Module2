import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Layers, FileCheck2, Calculator, Activity, ShieldCheck, AlertTriangle, LogOut, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { UserProfileModal } from './UserProfileModal';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when navigating
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-black p-0 md:p-3 lg:p-6 flex items-center justify-center font-sans antialiased selection:bg-slate-800 selection:text-white">
      {/* Application Shell */}
      <div className="w-full h-[100dvh] md:h-auto md:max-w-[1440px] bg-white md:rounded-[28px] md:shadow-2xl md:border border-white/60 flex flex-col md:flex-row overflow-hidden md:min-h-[900px] transition-all relative">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100 bg-white z-20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shadow-sm shrink-0">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-sm tracking-tight text-slate-900">AeroLogix</span>
              <span className="text-[8px] bg-slate-100 text-slate-600 px-1 py-0.5 rounded font-mono font-medium">AI</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Left Navigation Sidebar */}
        <aside className={`
          fixed md:relative top-0 left-0 h-full md:h-auto
          w-[280px] md:w-64 lg:w-[280px] flex-shrink-0 flex flex-col justify-between 
          bg-[#FBFBFC] border-r border-slate-100 p-6 z-40
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        `}>
          <div>
            {/* Logo & Brand Header (Desktop) */}
            <div className="hidden md:flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Layers className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-bold text-[15px] tracking-tight text-slate-900">AeroLogix</span>
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium">AI</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium tracking-tight mt-1">Enterprise Customs</p>
                </div>
              </div>
              <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Sidebar Header */}
            <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Navigation</p>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workspace Nav Links */}
            <nav className="space-y-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Workspaces</p>
              
              <NavLink onClick={closeMobileMenu} to="/dashboard/doc-gen" className={({ isActive }) => `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/80'}`}>
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <FileCheck2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>Doc Gen & OCR</span>
                  </div>
                )}
              </NavLink>

              <NavLink onClick={closeMobileMenu} to="/dashboard/tax-calc" className={({ isActive }) => `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/80'}`}>
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <Calculator className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>Duty & Tax AI</span>
                  </div>
                )}
              </NavLink>

              <NavLink onClick={closeMobileMenu} to="/dashboard/clearance" className={({ isActive }) => `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/80'}`}>
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <Activity className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span>Clearance Tracker</span>
                  </div>
                )}
              </NavLink>

              <NavLink onClick={closeMobileMenu} to="/dashboard/insurance" className={({ isActive }) => `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/80'}`}>
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <ShieldCheck className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>Insurance Bind</span>
                  </div>
                )}
              </NavLink>

              <NavLink onClick={closeMobileMenu} to="/dashboard/compliance" className={({ isActive }) => `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100/80'}`}>
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                      <span>Compliance Risk</span>
                    </div>
                    <span className={`w-2 h-2 rounded-full bg-rose-500 shadow-sm ${isActive ? 'animate-pulse' : ''}`}></span>
                  </>
                )}
              </NavLink>
            </nav>
          </div>

          {/* User Profile Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
            <button 
              onClick={() => {
                setIsProfileModalOpen(true);
                closeMobileMenu();
              }}
              className="flex items-center gap-2.5 min-w-0 text-left hover:bg-slate-50 p-2 rounded-xl transition-colors group/profile"
            >
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-rose-50 group-hover/profile:ring-rose-100 transition-all">
                EJ
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate group-hover/profile:text-rose-700 transition-colors">Emily Jordan</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">Chief Customs</p>
              </div>
            </button>
            <div className="relative group">
              <button onClick={logout} className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg p-2 transition-colors shrink-0">
                <LogOut className="w-4 h-4" />
              </button>
              {/* Logout tooltip tag */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm z-50">
                Log Out
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-[3px] border-transparent border-b-slate-900"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative">
          <Outlet />
        </main>

        <UserProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      </div>
    </div>
  );
}
