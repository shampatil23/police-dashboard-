
import React from 'react';
// Added Alert type to imports
import { DashboardData, Alert } from '../types';
// Added ShieldAlert to lucide-react imports
import { AlertTriangle, MapPin, Phone, ShieldCheck, Clock, Navigation, ExternalLink, ShieldAlert } from 'lucide-react';

interface AlertsViewProps {
  data: DashboardData;
}

const AlertsView: React.FC<AlertsViewProps> = ({ data }) => {
  // Cast Object.values to Alert[]
  const alerts = Object.values(data.alerts) as Alert[];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Emergency Operations</h2>
          <p className="text-slate-500">Real-time threat monitoring and response command center</p>
        </div>
        <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl flex items-center gap-2 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" /> Systems Operational
        </div>
      </div>

      {alerts.length > 0 ? (
        <div className="space-y-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-3xl overflow-hidden border-2 border-rose-500 shadow-2xl shadow-rose-200/50">
              <div className="bg-rose-500 p-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold leading-none">CRITICAL SOS - {alert.userName}</h4>
                    <p className="text-xs text-white/80 font-medium mt-1 uppercase tracking-widest">Active Thread Detection</p>
                  </div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 text-center">
                   <p className="text-[10px] font-bold uppercase">Confidence</p>
                   <p className="text-xl font-bold">{alert.confidence}%</p>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Emotion State</p>
                      <p className="text-lg font-bold text-rose-600">{alert.emotion}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Threat Level</p>
                      <p className="text-lg font-bold text-rose-600">{alert.threatLevel}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{alert.locationName}</p>
                        <p className="text-xs text-slate-500">Geo: {alert.latitude}, {alert.longitude}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <p className="text-sm font-bold text-slate-800">{alert.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <p className="text-sm font-bold text-slate-800">Triggered: {new Date(alert.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-lg transition-all active:scale-95">
                      <Navigation className="w-4 h-4" /> Get Directions
                    </button>
                    <button className="flex-1 bg-rose-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 shadow-lg transition-all active:scale-95">
                      <ShieldAlert className="w-4 h-4" /> Dispatch Police
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-rose-500/10 rounded-3xl border border-rose-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/600/400?random=${alert.id}`} className="w-full h-full object-cover grayscale brightness-50 contrast-125" alt="Map View" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Last Captured Image</p>
                      <h5 className="text-lg font-bold">Surveillance Feed Preview</h5>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center border-4 border-white/50 animate-ping"></div>
                       <div className="absolute w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center border-2 border-white text-white">
                          <MapPin className="w-6 h-6" />
                       </div>
                    </div>
                  </div>
                  <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg text-slate-800 hover:bg-white transition-colors">
                     <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">No Active SOS Alerts</h3>
          <p className="text-slate-500 mt-2 max-w-sm">
            Everything is calm. Your family members are safe within their designated safe zones.
          </p>
        </div>
      )}

      {/* Police Station Nearby (Grounding data simulation) */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
         <div className="relative z-10">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
               <ShieldCheck className="w-6 h-6 text-indigo-400" />
               Local Emergency Services
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Police Station</p>
                  <p className="text-lg font-bold">Sentinel Central Command</p>
                  <p className="text-sm text-white/60 mb-4 italic">Assigned to: Head Officer</p>
                  <button className="w-full bg-white text-slate-900 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
                     Quick Connection
                  </button>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                  <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-1">Medical Response</p>
                  <p className="text-lg font-bold">ICC Trade Tower Health Desk</p>
                  <p className="text-sm text-white/60 mb-4 italic">Distance: 0.4 km away</p>
                  <button className="w-full bg-white text-slate-900 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
                     Alert Medical Team
                  </button>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>
    </div>
  );
};

export default AlertsView;