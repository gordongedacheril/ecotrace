
import { QRCodeSVG } from 'qrcode.react';

export default function ProfilePage() {
  const handovers = [
    {
      id: 1,
      device_name: 'Dell Laptop Motherboard',
      recycler: 'Greenex Recyclers • Ind Area A',
      weight_kg: '3.2',
      epr_points: 45,
      date: '24 Feb 2024',
      icon: 'memory'
    },
    {
      id: 2,
      device_name: 'Li-ion Battery Pack 48V',
      recycler: 'Attero Hub • Ludhiana Focal Pt',
      weight_kg: '1.4',
      epr_points: 30,
      date: '13 Mar 2024',
      icon: 'battery_charging_full'
    },
    {
      id: 3,
      device_name: 'CRT Monitor Unit',
      recycler: 'EcoBin Hub • Model Town Point',
      weight_kg: '14.5',
      epr_points: 43,
      date: '08 Jan 2024',
      icon: 'tv'
    }
  ];

  const profileUrl = "https://ecotrace.ai/profile/aarav-sharma";

  return (
    <div className="flex flex-col w-full px-4 pb-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mt-6 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-surface-container-high border-2 border-primary flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant">person</span>
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[12px]">verified</span>
          </div>
        </div>
        <div className="flex flex-col">

          <h1 className="text-[22px] font-semibold text-on-surface leading-tight mt-1">Aarav Sharma</h1>
          <span className="text-[12px] text-on-surface-variant mt-0.5">Member since Jan 2024 • Ludhiana Hub</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface-container p-3 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Diverted E-Waste</span>
            <span className="material-symbols-outlined text-primary text-[14px]">recycling</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-bold text-primary leading-none">42.8</span>
            <span className="text-[12px] text-on-surface-variant font-medium">kg</span>
          </div>
          <span className="text-[10px] text-on-surface-variant mt-2 leading-tight">100% compliant pathways</span>
        </div>

        <div className="bg-surface-container p-3 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">CO₂ Mitigated</span>
            <span className="material-symbols-outlined text-secondary text-[14px]">cloud</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-bold text-secondary leading-none">118</span>
            <span className="text-[12px] text-on-surface-variant font-medium">kgCO₂e</span>
          </div>
          <span className="text-[10px] text-on-surface-variant mt-2 leading-tight">Grid equivalent offset</span>
        </div>

        <div className="bg-surface-container p-3 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Au Reclaimed</span>
            <span className="material-symbols-outlined text-tertiary text-[14px]">workspace_premium</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-bold text-tertiary leading-none">1.4</span>
            <span className="text-[12px] text-on-surface-variant font-medium">grams</span>
          </div>
          <span className="text-[10px] text-on-surface-variant mt-2 leading-tight">Secondary urban mine</span>
        </div>

        <div className="bg-surface-container p-3 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2 z-10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Civic Rank</span>
            <span className="material-symbols-outlined text-primary text-[14px]">shield</span>
          </div>
          <div className="flex flex-col z-10">
            <span className="text-[24px] font-bold text-on-surface leading-tight">Level 4</span>
            <span className="text-[12px] text-primary font-medium mt-1">Circular Guardian</span>
          </div>
        </div>
      </div>

      {/* Active EPR Digital Pass */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <h2 className="text-[16px] font-semibold text-on-surface">Active EPR Digital Pass</h2>
          </div>

        </div>

        <div className="bg-gradient-to-br from-surface-container-high to-surface-container p-4 rounded-2xl shadow-lg border border-outline-variant/30 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">GOVERNMENT OF INDIA MOEFCC</span>
              <span className="text-[14px] font-semibold text-on-surface mt-0.5">Disposal Handover Certificate</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-primary text-[18px]">gavel</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-4 flex gap-4 items-center mb-4 border border-outline-variant/20 shadow-inner">
            <div className="w-[72px] h-[72px] bg-white rounded-lg p-1.5 flex-shrink-0">
              <QRCodeSVG value={profileUrl} size={60} level="H" includeMargin={false} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">SERIAL PASS HASH</span>
              <span className="text-[16px] font-mono font-bold text-on-surface tracking-tight truncate">#EPR-2025-LDH-0941</span>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2 mb-4 text-[12px]">
            <div className="text-on-surface-variant">Authorized Recycler:</div>
            <div className="text-on-surface font-medium text-right">Attero Recycling Pvt Ltd</div>
            <div className="text-on-surface-variant">Issuance Timestamp:</div>
            <div className="text-on-surface font-medium text-right">12 Mar 2025, 03:15 PM</div>
            <div className="text-on-surface-variant">Standard Protocol:</div>
            <div className="text-primary font-medium text-right underline decoration-primary/30 underline-offset-2">MoEFCC Schedule II</div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-surface-container hover:bg-surface-bright text-on-surface border border-outline-variant/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[14px] font-semibold transition-colors">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Share Pass
            </button>
            <button className="flex-1 bg-primary hover:bg-primary-container text-on-primary py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[14px] font-semibold shadow-[0_2px_10px_rgba(16,185,129,0.2)] transition-colors">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              Save to Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Verified Handover History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">history</span>
            <h2 className="text-[16px] font-semibold text-on-surface">Verified Handover History</h2>
          </div>
          <span className="text-[12px] text-primary font-medium">18 Disposals Audited</span>
        </div>

        <div className="flex flex-col gap-3">
          {handovers.map((item) => (
            <div key={item.id} className="bg-surface-container rounded-xl p-3 flex flex-col shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-on-surface">{item.device_name}</span>
                    <span className="text-[12px] text-on-surface-variant truncate max-w-[200px]">{item.recycler}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[14px] font-bold text-primary">+{item.weight_kg} kg</span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">{item.date}</span>
                </div>
              </div>
              <div className="h-px w-full bg-outline-variant/20 my-2.5" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                </div>
                <button className="text-[12px] font-medium text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button 
          className="w-full h-12 bg-surface-container-high hover:bg-surface-bright text-on-surface border border-outline-variant/30 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Request New Handover
        </button>
      </div>
    </div>
  );
}
