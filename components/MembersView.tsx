
import React, { useState } from 'react';
// Added Contact type to imports
import { DashboardData, User, HistoryItem, Contact } from '../types';
// Added Activity and Users to lucide-react imports
import { Battery, BatteryLow, BatteryMedium, BatteryFull, MapPin, Phone, ShieldAlert, ChevronRight, PlayCircle, Eye, Activity, Users } from 'lucide-react';

interface MembersViewProps {
  data: DashboardData;
}

const MembersView: React.FC<MembersViewProps> = ({ data }) => {
  // Cast Object.values to User[]
  const members = (Object.values(data.users) as User[]).filter(u => u.role === 'member' || u.role === 'admin');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getBatteryIcon = (level: number) => {
    if (level === -1) return <Battery className="w-4 h-4 text-slate-300" />;
    if (level < 20) return <BatteryLow className="w-4 h-4 text-rose-500" />;
    if (level < 70) return <BatteryMedium className="w-4 h-4 text-amber-500" />;
    return <BatteryFull className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Members List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Family Circle ({members.length})</h3>
            <button className="text-xs font-bold text-indigo-600">+ Add Member</button>
          </div>
          {members.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                selectedUser?.id === user.id
                  ? 'bg-white border-indigo-500 shadow-lg ring-4 ring-indigo-500/5'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={`https://picsum.photos/48/48?u=${user.id}`} className="w-12 h-12 rounded-2xl object-cover" alt={user.name} />
                  {user.dangerZoneActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 truncate">{user.name || 'Anonymous User'}</h4>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-slate-500">
                    <div className="flex items-center gap-1">
                      {getBatteryIcon(user.batteryLevel || -1)}
                      <span className="text-[10px] font-medium">{user.batteryLevel !== -1 ? `${user.batteryLevel}%` : 'N/A'}</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-medium">Tracking ON</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Right: User Detail Panel */}
        <div className="lg:col-span-8">
          {selectedUser ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-8 border-b border-slate-100 flex items-start justify-between">
                <div className="flex gap-6">
                  <img src={`https://picsum.photos/80/80?u=${selectedUser.id}`} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-slate-50 shadow-md" alt={selectedUser.name} />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedUser.name}</h2>
                    <p className="text-slate-500 font-medium mb-3">{selectedUser.email}</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
                        <Phone className="w-3.5 h-3.5" /> Call Now
                      </button>
                      <button className="flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-200 transition-colors">
                        <ShieldAlert className="w-3.5 h-3.5" /> Mark Danger
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Unique ID</p>
                  <p className="text-lg font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{selectedUser.uniqueId || 'N/A'}</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100 overflow-hidden">
                {/* User History/Evidence */}
                <div className="p-6 overflow-y-auto max-h-[500px]">
                  <h5 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                    <span>Safety History</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">Recent Activity</span>
                  </h5>
                  <div className="space-y-4">
                    {selectedUser.history ? (
                      (Object.values(selectedUser.history) as HistoryItem[]).sort((a, b) => b.timestamp - a.timestamp).map((h) => (
                        <div key={h.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-700">{h.emotion}</span>
                            <span className="text-[10px] text-slate-400">{new Date(h.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">{h.status}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                               <MapPin className="w-3 h-3 text-indigo-500" />
                               <span className="text-[10px] font-bold text-slate-600">Location Tagged</span>
                            </div>
                            {h.audioUrl && (
                              <a href={h.audioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-indigo-600 text-white px-2.5 py-1 rounded-md hover:bg-indigo-700 transition-colors">
                                 <PlayCircle className="w-3 h-3" />
                                 <span className="text-[10px] font-bold">Play Evidence</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center">
                        <Activity className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">No safety incidents recorded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contacts & Locations */}
                <div className="p-6 bg-slate-50/50">
                  <h5 className="font-bold text-slate-800 mb-4">Emergency Contacts</h5>
                  <div className="space-y-3">
                    {selectedUser.contacts ? (
                      (Object.values(selectedUser.contacts) as Contact[]).map((c, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-800">{c.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{c.relationship}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-700">{c.phone}</p>
                            <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Verified</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-sm">No emergency contacts set</p>
                    )}
                  </div>

                  <div className="mt-8">
                    <h5 className="font-bold text-slate-800 mb-3">Last Known Geo-Fence</h5>
                    <div className="bg-slate-200 h-40 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/400/200?grayscale&blur=5')] bg-cover"></div>
                      <div className="relative z-1 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                        <p className="text-[9px] font-bold text-slate-700">COORD: {selectedUser.lastLatitude || 18.5}, {selectedUser.lastLongitude || 73.8}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-4">
              <Users className="w-16 h-16 opacity-20" />
              <p className="font-medium">Select a family member to view detailed safety status</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersView;