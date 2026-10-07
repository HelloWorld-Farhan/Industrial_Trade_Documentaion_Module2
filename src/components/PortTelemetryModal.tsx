import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Server, MapPin, Wifi, ShieldCheck, Thermometer, Crosshair } from 'lucide-react';

interface PortTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PortTelemetryModal({ isOpen, onClose }: PortTelemetryModalProps) {
  const [isPinging, setIsPinging] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsPinging(true);
      const timer = setTimeout(() => {
        setIsPinging(false);
      }, 2500);
      return () => {
        document.body.style.overflow = 'unset';
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
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
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center shadow-sm relative overflow-hidden">
                    <Activity className="w-5 h-5 text-emerald-400 relative z-10" />
                    {isPinging && (
                      <div className="absolute inset-0 bg-emerald-500/20 animate-ping rounded-xl"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Live Port Telemetry</h2>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                      <Server className="w-3 h-3" /> Port of Rotterdam (Terminal 4) API
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50 custom-scrollbar">
                
                {isPinging ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
                      <div className="absolute inset-2 border-2 border-emerald-400/50 rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.2s' }}></div>
                      <Wifi className="w-6 h-6 text-emerald-500 relative z-10 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-700">Establishing Secure Uplink...</p>
                      <p className="text-xs font-mono mt-1">Handshaking with Douane Terminal Mainframe</p>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    
                    {/* Status Banner */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        <div>
                          <h4 className="text-emerald-900 font-bold text-sm">Telemetry Uplink Stable</h4>
                          <p className="text-emerald-700 text-xs mt-0.5 font-mono">Ping: 24ms | Packet Loss: 0.00%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Sync Frequency</div>
                        <div className="font-mono text-sm font-bold text-emerald-900">5,000 ms</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Asset Location Card */}
                      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-slate-400" /> Exact Location
                        </h4>
                        
                        <div className="relative h-32 bg-slate-900 rounded-lg overflow-hidden mb-4 border border-slate-800">
                           {/* Decorative radar/map background */}
                           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-400/40 via-transparent to-transparent"></div>
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20"></div>
                           
                           {/* Radar Sweep */}
                           <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.2)_90deg,transparent_90deg)] animate-[spin_4s_linear_infinite] rounded-full"></div>

                           {/* Target Point */}
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] relative z-10"></div>
                              <div className="absolute inset-[-4px] bg-emerald-400/30 rounded-full animate-ping"></div>
                           </div>
                           
                           {/* Coordinates */}
                           <div className="absolute bottom-2 left-2 text-[9px] font-mono text-sky-400">
                             51.9493° N, 4.1440° E
                           </div>
                           <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                             <Crosshair className="w-3 h-3" /> Locked
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Zone</p>
                            <p className="font-bold text-slate-700">Inspection Bay 12</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Container ID</p>
                            <p className="font-bold font-mono text-slate-700">MSCU-893214-7</p>
                          </div>
                        </div>
                      </div>

                      {/* IoT Sensor Card */}
                      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2 mb-4">
                          <Thermometer className="w-4 h-4 text-slate-400" /> Internal Container IoT
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div>
                              <p className="text-xs font-bold text-slate-700">Temperature</p>
                              <p className="text-[10px] text-slate-400">Reefer Setpoint: -18°C</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold text-sky-600">-18.2 °C</p>
                              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Optimal</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div>
                              <p className="text-xs font-bold text-slate-700">Humidity / Moisture</p>
                              <p className="text-[10px] text-slate-400">Target: &lt; 40%</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold text-slate-700">38.4 %</p>
                              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Stable</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div>
                              <p className="text-xs font-bold text-slate-700">Shock / Vibration</p>
                              <p className="text-[10px] text-slate-400">Last 24 Hours Max G-Force</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold text-slate-700">1.2 G</p>
                              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">No Impact</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </motion.div>
                )}

              </div>
              
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
