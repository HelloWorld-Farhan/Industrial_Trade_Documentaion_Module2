import { useState } from 'react';
import { NavLink, useLocation, useOutlet, useNavigate } from 'react-router-dom';
import { Layers, FileCheck2, Calculator, Activity, ShieldCheck, AlertTriangle, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const outlet = useOutlet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when navigating
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { to: '/dashboard/doc-gen', icon: FileCheck2, label: 'Doc Gen & OCR' },
    { to: '/dashboard/tax-calc', icon: Calculator, label: 'Duty & Tax AI' },
    { to: '/dashboard/clearance', icon: Activity, label: 'Clearance Tracker', activeIconColor: 'text-white', inactiveIconColor: 'text-sky-400' },
    { to: '/dashboard/insurance', icon: ShieldCheck, label: 'Insurance Bind' },
    { to: '/dashboard/compliance', icon: AlertTriangle, label: 'Compliance Risk', activeIconColor: 'text-white', inactiveIconColor: 'text-rose-400', hasPulse: true },
  ];

  return (
    <div className="h-[100dvh] bg-white flex flex-col overflow-hidden font-sans antialiased selection:bg-slate-800 selection:text-white">
      {/* Application Shell */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full flex flex-col md:flex-row overflow-hidden relative"
      >
        
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
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

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
            <div className="hidden md:flex items-center gap-3 mb-8">
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

            {/* Mobile Sidebar Header */}
            <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Navigation</p>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workspace Nav Links */}
            <nav className="space-y-1 relative">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">Workspaces</p>
              
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.to);
                return (
                  <NavLink 
                    key={item.to} 
                    onClick={closeMobileMenu} 
                    to={item.to} 
                    className="relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-[#0F172A] rounded-xl shadow-sm z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-slate-100/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                    )}
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <item.icon className={`w-4 h-4 transition-colors ${isActive ? (item.activeIconColor || 'text-white') : (item.inactiveIconColor || 'text-slate-400')}`} />
                      <span className={`transition-colors font-semibold ${isActive ? 'text-white' : 'text-slate-600'}`}>{item.label}</span>
                    </div>
                    {item.hasPulse && (
                      <span className={`relative z-10 w-2 h-2 rounded-full shadow-sm transition-colors ${isActive ? 'bg-white animate-pulse' : 'bg-rose-500'}`}></span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* User Profile Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto gap-2">
            <button 
              onClick={() => {
                navigate('/dashboard/settings');
                closeMobileMenu();
              }}
              className="relative flex flex-1 items-center gap-2.5 min-w-0 text-left p-2 rounded-xl transition-colors group/profile hover:bg-slate-50"
            >
              {location.pathname === '/dashboard/settings' && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-[#0F172A] rounded-xl shadow-sm z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ring-2 transition-all ${location.pathname === '/dashboard/settings' ? 'bg-white/20 text-white ring-white/10' : 'bg-rose-100 text-rose-700 ring-rose-50 group-hover/profile:ring-rose-100'}`}>
                EJ
              </div>
              <div className="relative z-10 min-w-0">
                <p className={`text-xs font-bold truncate transition-colors ${location.pathname === '/dashboard/settings' ? 'text-white' : 'text-slate-800 group-hover/profile:text-rose-700'}`}>Emily Jordan</p>
                <p className={`text-[10px] font-medium truncate transition-colors ${location.pathname === '/dashboard/settings' ? 'text-slate-300' : 'text-slate-400'}`}>Chief Customs</p>
              </div>
            </button>
            <div className="flex items-center shrink-0">
              <div className="relative group">
                <button 
                  onClick={() => {
                    navigate('/dashboard/settings');
                    closeMobileMenu();
                  }} 
                  className={`relative z-10 rounded-lg p-2 transition-colors ${location.pathname === '/dashboard/settings' ? 'text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                  <Settings className="w-4 h-4" />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm z-50">
                  Settings
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-slate-900"></div>
                </div>
              </div>
              <div className="relative group">
                <button onClick={logout} className="relative z-10 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg p-2 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm z-50">
                  Log Out
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 h-full flex flex-col overflow-y-auto"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  );
}
