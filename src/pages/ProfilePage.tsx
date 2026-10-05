import { useState, useRef } from 'react';

export default function ProfilePage() {
  const [showCertModal, setShowCertModal] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handovers = [
    {
      id: 1,
      device: 'Dell Laptop Motherboard',
      recycler: 'Greenex Recyclers, Ind Area',
      weight: '3.2 kg',
      points: '+24 EPR',
      date: 'Oct 12, 2025',
      icon: 'memory'
    },
    {
      id: 2,
      device: 'Li-ion Battery Pack 48V',
      recycler: 'Attero Hub',
      weight: '1.4 kg',
      points: '+45 EPR',
      date: 'Sep 28, 2025',
      icon: 'battery_charging_full'
    },
    {
      id: 3,
      device: 'CRT Monitor/Link',
      recycler: 'EcoBin Focal Point',
      weight: '14.5 kg',
      points: '+12 EPR',
      date: 'Aug 15, 2025',
      icon: 'desktop_windows'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pb-24 font-sans selection:bg-emerald-500/30">
      <div className="max-w-md mx-auto p-4 space-y-6">
        
        {/* User Profile Header */}
        <div className="flex items-center space-x-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-md">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30 flex-shrink-0">
            <span className="material-symbols-outlined text-4xl text-emerald-400">person</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">Aarav Sharma</h1>
              <span className="material-symbols-outlined text-emerald-400 text-lg" title="Verified">verified</span>
            </div>
            <p className="text-sm text-slate-400">Member since Jul 2024</p>
            <div className="mt-1 inline-flex items-center space-x-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">eco</span>
              <span className="text-xs font-medium text-emerald-300">144 Contributions</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-2">
              <span className="material-symbols-outlined text-emerald-400 text-sm">recycling</span>
              <span className="text-xs text-slate-400 font-medium">E-Waste Handled</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">42.8 kg</div>
              <div className="text-[10px] text-slate-500 mt-0.5">KYE compliance past 6m</div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-2">
              <span className="material-symbols-outlined text-emerald-400 text-sm">stars</span>
              <span className="text-xs text-slate-400 font-medium">EPR Points</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">118</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Drb equivalent offset</div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-2">
              <span className="material-symbols-outlined text-emerald-400 text-sm">diamond</span>
              <span className="text-xs text-slate-400 font-medium">Recovery Value</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">1.4 kg</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Recoverable urban mine</div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-2">
              <span className="material-symbols-outlined text-emerald-400 text-sm">co2</span>
              <span className="text-xs text-slate-400 font-medium">Carbon Offset</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">12.5 kg</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Equivalent emissions saved</div>
            </div>
          </div>
        </div>

        {/* Guardian Level Card */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800/60 p-4 rounded-2xl border border-emerald-700/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-8xl">shield</span>
          </div>
          <div className="relative z-10 flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
              <span className="material-symbols-outlined text-3xl text-emerald-400">shield</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Level 4</h2>
              <p className="text-sm text-emerald-300 font-medium">Circular Guardian</p>
            </div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Progress to Level 5</span>
              <span>118 / 200 pts</span>
            </div>
            <div className="h-2 w-full bg-slate-900/50 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[59%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Active EPR Digital Pass Card */}
        <div className="bg-slate-800/60 rounded-2xl border border-slate-700 overflow-hidden backdrop-blur-md">
          <div className="bg-slate-800/80 p-4 border-b border-slate-700/50 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">Active EPR Digital Pass</h3>
              <p className="text-xs text-slate-400">Disposal/Handover Certificate</p>
            </div>
            <span className="material-symbols-outlined text-emerald-400">qr_code_scanner</span>
          </div>
          
          <div className="p-4">
            <div className="flex space-x-4">
              <div className="w-24 h-24 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-1 grid grid-cols-5 grid-rows-5 gap-0.5 opacity-80">
                  {Array.from({length: 25}).map((_, i) => (
                    <div key={i} className={`bg-slate-900 ${i%2===0 || i%3===0 ? 'opacity-100' : 'opacity-0'}`}></div>
                  ))}
                  <div className="absolute inset-0 border-4 border-slate-900 m-1"></div>
                  <div className="absolute w-2 h-2 bg-slate-900 top-2 left-2"></div>
                  <div className="absolute w-2 h-2 bg-slate-900 top-2 right-2"></div>
                  <div className="absolute w-2 h-2 bg-slate-900 bottom-2 left-2"></div>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Certificate Number</div>
                  <div className="font-mono text-sm text-white bg-slate-900/50 py-0.5 px-2 rounded mt-0.5 w-fit border border-slate-700/50">#EPR-2025-LDH-0941</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Recycler</div>
                  <div className="text-sm text-slate-200">Attero Recycling Pvt Ltd</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Valid Until</div>
                  <div className="text-sm text-slate-200">October 2025</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-700/50">
              <button className="flex-1 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium flex items-center justify-center space-x-1 transition-colors border border-emerald-500/20">
                <span className="material-symbols-outlined text-sm">share</span>
                <span>Share Pass</span>
              </button>
              <button className="flex-1 py-2 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium flex items-center justify-center space-x-1 transition-colors">
                <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                <span>Save to Wallet</span>
              </button>
            </div>
          </div>
        </div>

        {/* EcoVault Badges Section */}
        <div>
          <h3 className="font-semibold text-white mb-3 px-1 flex items-center space-x-2">
            <span className="material-symbols-outlined text-emerald-400">workspace_premium</span>
            <span>EcoVault Badges</span>
          </h3>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-3 snap-x hide-scrollbar">
            
            <div className="snap-start flex-shrink-0 w-32 bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 mb-2">
                <span className="material-symbols-outlined text-amber-400 text-2xl">workspace_premium</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 leading-tight">Urban Gold Miner</h4>
              <p className="text-[10px] text-slate-500 mt-1">Earned Aug 2024</p>
            </div>
            
            <div className="snap-start flex-shrink-0 w-32 bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-2">
                <span className="material-symbols-outlined text-emerald-400 text-2xl">battery_charging_full</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 leading-tight">Li-ion Battery Pack 48V</h4>
              <p className="text-[10px] text-slate-500 mt-1">Earned Sep 2025</p>
            </div>
            
            <div className="snap-start flex-shrink-0 w-32 bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mb-2">
                <span className="material-symbols-outlined text-blue-400 text-2xl">stars</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 leading-tight">5-Star Recycler</h4>
              <p className="text-[10px] text-slate-500 mt-1">Earned Oct 2025</p>
            </div>

          </div>
        </div>

        {/* Verified Handover History */}
        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <span className="material-symbols-outlined text-emerald-400">history</span>
              <span>Verified Handovers</span>
            </h3>
            <button className="text-xs text-emerald-400 font-medium">View All</button>
          </div>
          
          <div className="space-y-3">
            {handovers.map((item) => (
              <div key={item.id} className="bg-slate-800/30 p-3 rounded-2xl border border-slate-700/40 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center flex-shrink-0 text-slate-300">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-200 truncate">{item.device}</h4>
                  <p className="text-xs text-slate-400 truncate">{item.recycler}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-emerald-400">{item.points}</div>
                  <div className="text-[10px] text-slate-500">{item.weight} • {item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Certificate Button */}
        <div className="pt-2">
          <button 
            onClick={() => setShowCertModal(true)}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span>Generate Impact Certificate</span>
          </button>
        </div>

      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
              <h3 className="font-semibold text-white">Impact Certificate</h3>
              <button onClick={() => setShowCertModal(false)} className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-700/50">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto hide-scrollbar">
              {/* Actual Certificate Div (for html2canvas ideally) */}
              <div ref={certRef} className="bg-gradient-to-b from-emerald-900/80 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/40 mb-3">
                    <span className="material-symbols-outlined text-3xl text-emerald-400">verified</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-1">E-Waste Hero</h2>
                  <p className="text-emerald-300 text-sm">Certificate of Circular Impact</p>
                </div>
                
                <div className="relative z-10 text-center space-y-4">
                  <p className="text-slate-300 text-sm">This is to certify that</p>
                  <p className="text-xl font-bold text-white border-b border-slate-700 pb-2">Aarav Sharma</p>
                  <p className="text-slate-300 text-sm">has responsibly recycled</p>
                  <p className="text-md font-semibold text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-lg inline-block border border-emerald-500/20">
                    42.8 kg of E-Waste
                  </p>
                </div>
                
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-700/50">
                  <div className="text-center mb-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Key Impact</p>
                    <p className="text-sm font-medium text-slate-200">1.2 kg Lead Safely Diverted from Landfill</p>
                  </div>
                  <div className="flex justify-between items-end mt-6">
                    <div>
                      <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center p-1 border border-slate-700">
                        {/* Fake small QR */}
                        <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-[1px]">
                          {Array.from({length: 9}).map((_, i) => (
                            <div key={i} className={`bg-slate-400 ${i%2===0 ? 'opacity-100' : 'opacity-0'}`}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-[8px] text-slate-500 mt-1">#EPR-2025-LDH-0941</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Issued by</p>
                      <p className="text-xs font-semibold text-emerald-400">EcoTrace AI</p>
                      <p className="text-[10px] text-slate-500">Oct 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-700 bg-slate-800/80 space-y-3">
              <button className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors">
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Download as PNG</span>
              </button>
              <button className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors border border-slate-600">
                <span className="material-symbols-outlined text-lg">share</span>
                <span>Share on Social Media</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
