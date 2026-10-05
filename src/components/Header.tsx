
import { useApp } from '../context/AppContext';

export default function Header() {
  const { userCity, userPincode } = useApp();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[18px] leading-[24px] font-semibold tracking-tight text-on-surface">
                EcoTrace
              </span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-on-surface-variant text-[12px]">
                location_on
              </span>
              <span className="text-[10px] font-bold leading-[14px] text-on-surface-variant uppercase tracking-wider">
                {userCity}, {userPincode}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
            <span className="text-[10px] font-bold text-on-surface-variant">CPCB 2022</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
