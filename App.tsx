
import React, { useState } from 'react';
import { LayoutDashboard, Users, Bell, Map as MapIcon, ShieldAlert, Settings, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MembersView from './components/MembersView';
import AlertsView from './components/AlertsView';
import { RAW_DATA } from './data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'alerts'>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'alerts', label: 'Active Alerts', icon: <Bell className="w-5 h-5" />, badge: Object.keys(RAW_DATA.alerts).length },
    { id: 'members', label: 'Family Members', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-none">Sentinel</h1>
            <span className="text-xs text-slate-500 font-medium">SafeParent Pro</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span className="font-medium flex-1 text-left">{tab.label}</span>
              {tab.badge && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-8 pb-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold px-4">
            System
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-left">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <img src="https://picsum.photos/40/40" alt="Admin" className="w-10 h-10 rounded-full border border-white shadow-sm" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">Family Admin</p>
              <p className="text-xs text-slate-500 truncate">rohit@gmail.com</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 cursor-pointer hover:text-rose-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {Object.values(RAW_DATA.users).filter(u => u.role === 'member').map((u, i) => (
                <img key={u.id} src={`https://picsum.photos/32/32?random=${i}`} alt={u.name} className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" />
              ))}
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-shadow shadow-md">
              Emergency Broadcast
            </button>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && <Dashboard data={RAW_DATA} />}
          {activeTab === 'members' && <MembersView data={RAW_DATA} />}
          {activeTab === 'alerts' && <AlertsView data={RAW_DATA} />}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around py-2 px-4 z-50 shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-bold h-3 w-3 flex items-center justify-center rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
