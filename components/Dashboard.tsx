
import React from 'react';
// Added Alert and User types to imports
import { DashboardData, Alert, User } from '../types';
import { AlertCircle, Battery, MapPin, ShieldCheck, Activity, UserCheck } from 'lucide-react';
import SafetyRadar from './SafetyRadar';
import RecentActivity from './RecentActivity';

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Cast Object.values to Alert[] and User[] to ensure property access
  const activeAlerts = (Object.values(data.alerts) as Alert[]).filter(a => a.status === 'ACTIVE');
  const membersCount = (Object.values(data.users) as User[]).filter(u => u.role === 'member').length;
  const dangerZones = (Object.values(data.users) as User[]).filter(u => u.dangerZoneActive).length;

  const stats = [
    { label: 'Active SOS', value: activeAlerts.length, icon: <AlertCircle className="w-5 h-5" />, color: 'bg-rose-50 text-rose-600', trend: activeAlerts.length > 0 ? 'Critical Attention' : 'Safe' },
    { label: 'Family Members', value: membersCount, icon: <UserCheck className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600', trend: 'Online' },
    { label: 'Danger Zones', value: dangerZones, icon: <MapPin className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600', trend: dangerZones > 0 ? 'Exclusion Violation' : 'None' },
    { label: 'Security Score', value: '98%', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600', trend: '+2% from last week' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Alert Banner if SOS is active */}
      {activeAlerts.length > 0 && (
        <div className="bg-rose-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">EMERGENCY SOS ACTIVE</h3>
              <p className="opacity-90 font-medium">
                {activeAlerts[0].userName} is in PANIC mode at {activeAlerts[0].locationName}
              </p>
            </div>
          </div>
          <button className="bg-white text-rose-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-rose-50 transition-colors whitespace-nowrap">
            View Live Location
          </button>
        </div>
      )}

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <Activity className="w-4 h-4 text-slate-300" />
            </div>
            <h4 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${stat.trend === 'Critical Attention' ? 'text-rose-500' : stat.trend === 'Safe' ? 'text-emerald-500' : 'text-slate-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Safety Radar Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Family Safety Radar</h3>
              <p className="text-sm text-slate-500">Real-time threat assessment across all members</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-600 focus:outline-none focus:ring-2 ring-indigo-500/20">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[400px] w-full">
            <SafetyRadar data={data} />
          </div>
        </div>

        {/* Recent Alerts Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Events</h3>
            <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-1">
            <RecentActivity data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;