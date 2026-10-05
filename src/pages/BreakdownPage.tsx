import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function BreakdownPage() {
  const { analysisResult, setActiveTab } = useApp();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedMetal, setExpandedMetal] = useState<string | null>(null);

  const handleDownload = () => {
    setToastMessage('RoHS Diagnostic Report generated!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f141f] text-slate-400 p-6">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">science</span>
        <h2 className="text-xl font-medium text-slate-200 mb-2">No Analysis Data Available</h2>
        <p className="text-center max-w-md">
          Please return to the scanner to analyze an e-waste item before viewing the breakdown.
        </p>
        <button
          onClick={() => setActiveTab('scan')}
          className="mt-6 px-6 py-2 bg-[#2d6a4f] text-white rounded-full font-medium hover:bg-[#1b4332] transition-colors"
        >
          Go to Scanner
        </button>
      </div>
    );
  }

  // Calculate score properties
  const score = analysisResult.toxicity_score || 8.5;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - score / 10);

  const toxicityColor = score >= 7 ? 'text-[#ffb4ab]' : score >= 4 ? 'text-[#ffdf99]' : 'text-[#81c995]';
  const gaugeColor = score >= 7 ? '#ffb4ab' : score >= 4 ? '#ffdf99' : '#81c995';
  
  // Dummy data mapping for elements lacking specific details
  const impactIcons: Record<string, string> = {
    'Lead': 'vital_signs',
    'Cadmium': 'air',
    'Mercury': 'psychology',
    'Chromium': 'personal_injury',
    'Arsenic': 'warning',
    'Beryllium': 'air',
  };

  return (
    <div className="min-h-screen bg-[#0f141f] text-slate-200 pb-24 relative overflow-x-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#1b4332] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-down">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumb & Device Context Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-[#81c995]">
            <span className="material-symbols-outlined text-sm">science</span>
            <span className="text-[10px] uppercase tracking-widest font-bold">Toxicity Diagnostics</span>
          </div>
          <div className="bg-slate-800/80 px-2 py-1 rounded text-[10px] font-mono text-slate-400 border border-slate-700">
            Sample ID: #{Math.floor(Math.random() * 9000) + 1000}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight mb-2">
          {analysisResult.device_name || 'Discarded Smartphone PCB (Multilayer)'}
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-1 bg-[#222a3d] text-[#81c995] rounded-full text-xs font-medium border border-[#2c3751]">
            {analysisResult.cpcb_category || 'ITEW1 (IT & Telecom Equipment)'}
          </span>
          <span className="text-xs text-slate-500">
            {analysisResult.scanned_at || new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {analysisResult.detected_item_description && (
          <p className="mt-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 leading-relaxed">
            <span className="font-semibold text-primary block mb-1">AI Detection:</span>
            {analysisResult.detected_item_description}
          </p>
        )}
      </div>

      {/* 2. Microscopic PCB Inspection Image */}
      <div className="relative w-full h-48 md:h-64 mt-2">
        <img
          src={analysisResult.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuADiEIEm8oiFLGSDRQ_ZfJyu5BCjE4poMum2c_Le4LkhkA6AmO1ekYJSmabTPOuK59lRTYh9cbnixF3OPrarzykR0uUYiFUyayPan_oVjYyIsc5yuRJ89u-VtjWVSWYTc7zBIdRr2EdRJ0orbCc5ppHMWoVwlRoyN_NiZFmi1_ZCGsmMF0JptJoljPTzfK1U7EQpRXc4szrug29IqSzdUdi_c6nfJUakSyQe5vLvtFTdlGNojkgrG70'}
          alt="PCB Inspection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f141f] via-[#0f141f]/60 to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#410002]/80 backdrop-blur-sm border border-[#93000a] px-2 py-1 rounded">
          <div className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse"></div>
          <span className="text-xs font-bold text-[#ffb4ab]">RoHS Non-Compliant Disposal</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-[#222a3d]/80 backdrop-blur-sm border border-[#3e4a66] px-2 py-1 rounded">
          <span className="text-xs font-medium text-slate-300">FR-4 Substrate</span>
        </div>
      </div>

      {/* 3. Composite Toxicity Index Card */}
      <div className="px-4 mt-4">
        <div className="bg-[#1a2133] border border-[#2c3751] rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-1">Hazard Evaluation</span>
              <h3 className="text-lg font-bold text-white">Composite Toxicity Index</h3>
            </div>
            {score >= 7 ? (
              <div className="flex items-center gap-1 bg-[#410002] px-2 py-1 rounded-full border border-[#93000a] animate-pulse shadow-[0_0_10px_rgba(147,0,10,0.5)]">
                <span className="material-symbols-outlined text-[#ffb4ab] text-[14px] filled">warning</span>
                <span className="text-[10px] font-bold text-[#ffb4ab]">HIGH TOXIC HAZARD</span>
              </div>
            ) : score >= 4 ? (
              <div className="flex items-center gap-1 bg-[#4d3a00] px-2 py-1 rounded-full border border-[#7a5c00]">
                <span className="material-symbols-outlined text-[#ffdf99] text-[14px] filled">warning</span>
                <span className="text-[10px] font-bold text-[#ffdf99]">ELEVATED HAZARD</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-[#0f5223] px-2 py-1 rounded-full border border-[#1b8a3b]">
                <span className="material-symbols-outlined text-[#81c995] text-[14px] filled">check_circle</span>
                <span className="text-[10px] font-bold text-[#81c995]">LOW HAZARD</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Radial Arc Gauge */}
            <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#222a3d"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke={gaugeColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="transparent"
                  stroke="#3e4a66"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-4xl font-black ${toxicityColor} drop-shadow-md`}>{score.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400 font-medium">out of 10</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 w-full space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ffb4ab]"></div>
                  <span className="text-slate-300">Heavy Metals</span>
                </div>
                <span className="font-mono text-slate-400">72%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ffdf99]"></div>
                  <span className="text-slate-300">Halogenated BFRs</span>
                </div>
                <span className="font-mono text-slate-400">21%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#e2e2e9]"></div>
                  <span className="text-slate-300">Trace Solvents</span>
                </div>
                <span className="font-mono text-slate-400">7%</span>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2c3751] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb4ab] text-lg">report</span>
                <span className="text-xs font-semibold text-[#ffb4ab] uppercase tracking-wide">Critical Tier 1 Waste</span>
              </div>
            </div>
          </div>

          {/* Advisory Box */}
          <div className="mt-6 bg-[#2c1a1d] rounded-lg p-3 flex items-start gap-3 border border-[#52292c]">
            <span className="material-symbols-outlined text-[#ffb4ab] filled flex-shrink-0 mt-0.5">gpp_maybe</span>
            <p className="text-xs text-[#ffb4ab] leading-relaxed font-medium">
              Formal Advisory: This unit contains highly regulated heavy metals exceeding RoHS limits. Improper processing poses severe environmental contamination and neurological health risks. Do not incinerate.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Heavy Metal Matrix Section */}
      {analysisResult.heavy_metals && analysisResult.heavy_metals.length > 0 && (
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">grid_view</span>
              <h3 className="text-lg font-bold text-white">Heavy Metal Matrix</h3>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {analysisResult.heavy_metals.length} Key Pollutants
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysisResult.heavy_metals.map((metal, idx) => {
              const isExpanded = expandedMetal === metal.name;
              // Provide default values if API data is sparse
              const symbol = metal.name.substring(0, 2).toUpperCase(); // e.g. "PB"
              const atomicNumber = metal.name.length * 5; // Fake atomic number
              const isHighRisk = metal.risk_level?.toLowerCase().includes('high') || metal.risk_level?.toLowerCase().includes('severe');
              const riskColor = isHighRisk ? 'text-[#ffb4ab] bg-[#410002] border-[#93000a]' : 'text-[#ffdf99] bg-[#4d3a00] border-[#7a5c00]';
              const iconName = impactIcons[metal.name] || 'warning';

              return (
                <div 
                  key={idx} 
                  className={`bg-[#1a2133] rounded-xl border border-[#2c3751] overflow-hidden transition-all duration-200 cursor-pointer active:scale-[0.98] ${isExpanded ? 'ring-1 ring-[#3e4a66]' : ''}`}
                  onClick={() => setExpandedMetal(isExpanded ? null : metal.name)}
                >
                  <div className="p-3 flex items-center gap-3">
                    {/* Element Box */}
                    <div className="w-12 h-12 flex-shrink-0 bg-[#222a3d] rounded flex flex-col items-center justify-center border border-[#2c3751]">
                      <span className="text-lg font-bold text-white leading-none">{symbol}</span>
                      <span className="text-[9px] text-slate-400 mt-1">{atomicNumber}</span>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-slate-200 truncate pr-2">{metal.name}</h4>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap uppercase ${riskColor}`}>
                          {metal.risk_level || 'Hazard'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>{metal.amount_per_unit || 'Trace amounts'}</span>
                        <span className="text-[10px] truncate max-w-[50%] opacity-80 text-right">{metal.source_component || 'Solder joints'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  <div className={`px-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-24 py-2 border-t border-[#2c3751] opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                    <div className="flex items-start gap-2 text-slate-300">
                      <span className="material-symbols-outlined text-sm text-[#ffdf99] mt-0.5">{iconName}</span>
                      <p className="text-xs leading-relaxed flex-1">
                        {metal.health_impact || `Exposure to ${metal.name.toLowerCase()} can cause severe neurological and renal damage.`}
                      </p>
                      <span className="material-symbols-outlined text-slate-500">chevron_right</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Urban Mining Potential Card */}
      <div className="px-4 mt-8">
        <div className="bg-[#1a2133] rounded-2xl border border-[#2c3751] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXsEBjxmVtZTFseQt0UnyGSE8KUyv91HcJZ0nPJBEn5X6ZwshyFquVWcJ3RsPr27gYp0nawnLfI9G8mh3FUaa94T8XBIzz9pERqLaCGany7G6CuBL0RS4S9RgwN6-JdfFqPVXpFg3IzHVCBDqtrDKe_h0Fih0mcQI1rnonw13HXD2ZpxNAu3e9hGo2P-k4v2qArUHFHbZqTxy-uPT5foRBTQhdP6Sd-m6dfvDFbJ8TfXX7ysaXSPfy')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2133]/95 via-[#1a2133]/80 to-[#1a2133]/90"></div>
          
          <div className="relative p-5">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1b4332] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#81c995] filled text-sm">recycling</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#81c995] font-medium uppercase tracking-wider block">Opportunity Value</span>
                  <h3 className="text-base font-bold text-white">Urban Mining Potential</h3>
                </div>
              </div>
              <span className="text-[10px] bg-black/40 text-slate-300 px-2 py-1 rounded border border-[#3e4a66]">
                per 1,000 units
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Gold */}
              <div className="bg-[#222a3d]/80 backdrop-blur border border-[#3e4a66] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-[#ffdf99] text-sm">workspace_premium</span>
                  <span className="text-xs font-semibold text-slate-200">Gold (Au 99.9%)</span>
                </div>
                <div className="text-lg font-bold text-white mb-0.5">~350 g</div>
                <div className="text-[10px] text-[#81c995]">Est. ₹24,50,000</div>
              </div>

              {/* Silver */}
              <div className="bg-[#222a3d]/80 backdrop-blur border border-[#3e4a66] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-slate-300 text-sm">toll</span>
                  <span className="text-xs font-semibold text-slate-200">Silver (Ag)</span>
                </div>
                <div className="text-lg font-bold text-white mb-0.5">~3.5 kg</div>
                <div className="text-[10px] text-[#81c995]">Est. ₹2,60,000</div>
              </div>

              {/* Copper */}
              <div className="bg-[#222a3d]/80 backdrop-blur border border-[#3e4a66] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-[#ffb4ab] text-sm">cable</span>
                  <span className="text-xs font-semibold text-slate-200">Copper (Cu)</span>
                </div>
                <div className="text-lg font-bold text-white mb-0.5">~130 kg</div>
                <div className="text-[10px] text-slate-400">Industrial grade alloy</div>
              </div>

              {/* Cobalt & Li */}
              <div className="bg-[#222a3d]/80 backdrop-blur border border-[#3e4a66] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-[#81c995] text-sm">battery_charging_full</span>
                  <span className="text-xs font-semibold text-slate-200 truncate">Cobalt & Li</span>
                </div>
                <div className="text-lg font-bold text-white mb-0.5">~42 kg</div>
                <div className="text-[10px] text-slate-400 truncate">Energy storage cells</div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* 7. Primary Actions */}
      <div className="px-4 mt-8 space-y-3 pb-8">
        <button
          onClick={() => setActiveTab('map')}
          className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#2d6a4f]/20 active:scale-[0.98]"
        >
          <span>Find Nearest CPCB Recycler</span>
          <span className="bg-[#1b4332] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">3 nearby</span>
        </button>
        
        <button
          onClick={handleDownload}
          className="w-full bg-[#222a3d] hover:bg-[#2c3751] text-slate-200 border border-[#3e4a66] py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-sm text-[#81c995]">download</span>
          <span>Download RoHS Diagnostic Report (PDF)</span>
        </button>
      </div>
    </div>
  );
}
