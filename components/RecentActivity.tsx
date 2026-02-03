
import React from 'react';
// Added Alert, User, and HistoryItem types to imports
import { DashboardData, Alert, User, HistoryItem } from '../types';
import { Bell, MapPin, AudioLines, CheckCircle2 } from 'lucide-react';

interface RecentActivityProps {
  data: DashboardData;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ data }) => {
  // Combine alerts and user histories into a unified chronological list
  const events: any[] = [];

  // Cast Object.values to Alert[]
  (Object.values(data.alerts) as Alert[]).forEach(alert => {
    events.push({
      id: alert.id,
      type: 'SOS',
      title: 'SOS Triggered',
      desc: `${alert.userName} - ${alert.emotion}`,
      time: alert.timestamp,
      status: alert.status,
      color: 'bg-rose-100 text-rose-600',
      icon: <Bell className="w-4 h-4" />
    });
  });

  // Cast Object.values to User[]
  (Object.values(data.users) as User[]).forEach(user => {
    if (user.history) {
      // Cast Object.values to HistoryItem[]
      (Object.values(user.history) as HistoryItem[]).forEach(h => {
        events.push({
          id: h.id,
          type: 'HISTORY',
          title: h.emotion,
          desc: `${user.name || 'User'} - ${h.status}`,
          time: h.timestamp,
          status: 'COMPLETED',
          color: h.audioUrl ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600',
          icon: h.audioUrl ? <AudioLines className="w-4 h-4" /> : <MapPin className="w-4 h-4" />
        });
      });
    }
  });

  const sortedEvents = events.sort((a, b) => b.time - a.time).slice(0, 10);

  return (
    <div className="divide-y divide-slate-100">
      {sortedEvents.map((event, i) => (
        <div key={`${event.id}-${i}`} className="py-4 flex gap-4 hover:bg-slate-50 transition-colors px-2 rounded-xl group">
          <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${event.color}`}>
            {event.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-bold text-slate-800 truncate">{event.title}</p>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed truncate">{event.desc}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 self-center">
             <CheckCircle2 className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;