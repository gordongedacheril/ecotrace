
import { useApp } from '../context/AppContext';
import type { AppTab } from '../types';

const tabs: { id: AppTab; label: string; icon: string }[] = [
  { id: 'scan', label: 'Scan', icon: 'document_scanner' },
  { id: 'map', label: 'Map', icon: 'near_me' },
  { id: 'breakdown', label: 'Breakdown', icon: 'science' },
  { id: 'profile', label: 'Profile', icon: 'verified_user' },
];

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
         style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              <span className="text-[10px] font-bold leading-[14px]">{tab.label}</span>
              <div
                className={`w-1 h-1 rounded-full transition-all ${
                  isActive ? 'bg-primary shadow-[0_0_8px_rgba(16,185,129,0.7)]' : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
