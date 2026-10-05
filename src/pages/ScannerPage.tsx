import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeWithFallback } from '../services/geminiService';

const ScannerPage = () => {
  const { setActiveTab, setIsAnalyzing, setAnalysisResult } = useApp();
  const [searchText, setSearchText] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [laserPos, setLaserPos] = useState(0);

  // Animate laser scan line using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let direction = 1;
    let position = 0;
    let speed = 2;

    const animate = () => {
      if (scannerRef.current) {
        const height = scannerRef.current.offsetHeight;
        position += direction * speed;
        if (position >= height - 4) {
          direction = -1;
        } else if (position <= 0) {
          direction = 1;
        }
        setLaserPos(position);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!previewImage && !searchText.trim()) return;

    setIsAnalyzing(true);
    try {
      const params = previewImage ? { image: previewImage } : { text: searchText };
      const result = await analyzeWithFallback(params);
      setAnalysisResult(result);
      setActiveTab('breakdown');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const categories = [
    { name: 'Motherboard', icon: 'memory' },
    { name: 'Lithium Pack', icon: 'battery_charging_full' },
    { name: 'CRT Monitor', icon: 'tv' },
    { name: 'Laptop', icon: 'laptop_mac' }
  ];

  const recentItems = [
    {
      name: 'Samsung Galaxy S10 PCB',
      badge: 'High Risk (Pb, Cd)',
      badgeColor: 'bg-error-container text-on-error-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaHRItdSSuhdVg_L_GQ2M6LGD1bO00qutG8s2x-31kxaOj312_7MF5U3epqWkk-ywPtvfFWsPEsxUTQxYQjdBx-yjvzJRGbpMDJdF6agqmQPs6loPZK6muv5QaLLO0p9eNnEK_VpiTlXsDph-n0wjD8E42SNxvvJI2CYIG27u0Trmr_Eba2pyN2fb_hBij_OE5yn7DNN5Ky8VJyE4i1g3J1olm5ri2eq7GPEcnkUoNAj9JxC4EsSe1',
      date: 'Today 11:42 AM',
      points: '+180 EPR pts'
    },
    {
      name: 'Dell Inspiron 65W Charger',
      badge: 'Medium Risk',
      badgeColor: 'bg-tertiary-container text-white',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmHhQpTeLMAEXOwB4obzRRsEybG2gLWPH3sEnciRdoesOE1hX3VZ8nj4E2t6vEzNM5X-jYhCEn5ifHHXGCflo9e59UvygdXrZEoJbf04AjiTcLCUJgDoxJ7nf2CSioThOwhnEPA7YNmVH_BgN3i5Nf0FA4ze2HOTQrGm1NEHHG-TVte7S4uxT5myGHACxHJo09qqMRHV1ranx4wLtjMvN6_nIjrcyxxs_2_GbqInf53VrQzcw-go2',
      date: 'Yesterday',
      points: '+65 EPR pts'
    },
    {
      name: 'Sony Bravia Power Board',
      badge: 'High Risk (Capacitors)',
      badgeColor: 'bg-error-container text-on-error-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbq2oSCp0Kct3ETLXy-qnFNak2061v8mYSSgaN-7WmNbvOO6wZEhTr4BJ518utjr54-oHcF6nhNzTUOwQWAAKGAP88h5xyamY0FBfqs424xPKoOyGTIjRbnAceW_QFJS64uGtmB6WZBLuh8_4mTf1X7r9UA9OpPIHobRveRNXkoWwd3MaGVGH7BMbBBolyUt3kgr2Lly4usOrfIBlmWbPeiu4jLHeGQdF96i25-ICCLUShSGJH9Lr7',
      date: 'Oct 24 2024',
      points: '+310 EPR pts'
    },
    {
      name: 'AA Alkaline Pack (x12)',
      badge: 'Low Risk',
      badgeColor: 'bg-secondary-container text-white',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5nznHP_w_l9kHLCgaKHbhb7Kti3uojVXSnj2D173kCw8Uy6mn8PflEBXbFYnEwW-QaeVdvYG9t0www14dpEwtOZIHBtCjA2nv848FBczA2NI3cEYm_6YRFPZ55TX9EHMekpKWmmXfdj911tliVHc5bOSbz7A3IFkYdXXaFFqNXNIpYoHBg74U5zo0zh3ad3uitm9teRjuQ16JOUiwFvcTBIXw9_r5vZ7L_ZRuKq3zemj1ec5UamZ-',
      date: 'Oct 21 2024',
      points: '+40 EPR pts'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface pb-24 font-['Plus_Jakarta_Sans']">
      {/* Status Context Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-container-highest border-b border-surface-container/50 shadow-sm backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <span className="text-sm font-medium">Hello, Circular Guardian 🌿</span>
        </div>
        <div className="flex items-center space-x-1 bg-surface-container-low px-2 py-1 rounded-full text-xs font-semibold text-primary border border-primary/20">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          <span>CPCB Rules 2022</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Hero Scanner Card */}
        <div className="bg-surface-container-high rounded-2xl p-4 shadow-lg border border-surface-container relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1.5 rounded-full border border-surface-container/50">
              <span className="material-symbols-outlined text-[16px] text-primary">neurology</span>
              <span>Edge Tensor v4.2 Ready</span>
            </div>
            <button 
              onClick={() => setTorchOn(!torchOn)}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${torchOn ? 'bg-primary text-surface-container-lowest' : 'bg-surface-container-low text-on-surface-variant'}`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {torchOn ? 'flashlight_on' : 'flashlight_off'}
              </span>
            </button>
          </div>

          <div 
            ref={scannerRef}
            className="w-full aspect-[4/3] bg-surface-container-lowest rounded-xl relative overflow-hidden flex flex-col items-center justify-center border border-surface-container/50"
          >
            {/* Background Image / Preview */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
              style={{ 
                backgroundImage: `url('${previewImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Jj6Ppke5yYfpMUo5BadRL91Sh7eIOrRgjDUyKbY50j3AwD_oB5ZmzQrSU-6DXsut6_pPS1GH5E6TlGCEXPzoI0OKIGbIAWlxKbXf5Fxd3gJlQQF-W-WeCP-ZTmVJf2BuXiAZ9D_jTkMoOVw2FnjxFJk29umGa1_o_PF4eMxb6PSBDYuhdwxeni9q4_9BRBqOJAVDUQSn_iJWXd6AG4Rds1WH9qLNk_ajMdEspF6RmWvK4glzs48q"}')`,
                opacity: previewImage ? 1 : 0.3
              }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM0ZWRlYTMiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50" />

            {/* Neon Brackets */}
            <div className="absolute inset-6 pointer-events-none">
              {/* Top Left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg shadow-[0_0_10px_rgba(78,222,163,0.8)]" />
              {/* Top Right */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg shadow-[0_0_10px_rgba(78,222,163,0.8)]" />
              {/* Bottom Left */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg shadow-[0_0_10px_rgba(78,222,163,0.8)]" />
              {/* Bottom Right */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg shadow-[0_0_10px_rgba(78,222,163,0.8)]" />
            </div>

            {/* Laser Line */}
            <div 
              className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_12px_2px_rgba(78,222,163,0.9)] z-10"
              style={{ top: `${laserPos}px` }}
            />

            {/* Center Aim Info */}
            {!previewImage && (
              <div className="relative z-10 flex flex-col items-center text-center px-6 mt-4">
                <span className="material-symbols-outlined text-[48px] text-primary/80 mb-2">center_focus_strong</span>
                <h3 className="text-lg font-bold text-on-surface mb-1 drop-shadow-md">Scan E-Waste Item</h3>
                <p className="text-xs text-on-surface-variant font-medium drop-shadow-md">Align PCB, Li-ion pack, or appliance within brackets</p>
              </div>
            )}

            {/* Bottom Telemetry */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between z-10">
              <div className="bg-surface/80 backdrop-blur-sm text-[10px] font-bold text-primary px-2 py-1 rounded border border-primary/30 uppercase">
                ISO 14001: OK
              </div>
              <div className="bg-surface/80 backdrop-blur-sm text-[10px] font-bold text-on-surface px-2 py-1 rounded border border-surface-container uppercase">
                60 FPS • 4K AI
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-3">
            <button 
              onClick={handleAnalyze}
              className="flex-1 bg-primary text-surface-container-lowest font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">photo_camera</span>
              <span>Analyze Item</span>
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-surface-container text-on-surface p-3.5 rounded-xl border border-surface-container-highest flex items-center justify-center hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined">upload_file</span>
            </button>
            <input 
              type="file" 
              accept=".jpg,.png,.webp,image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Quick Manual Search */}
        <div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Type device (e.g., CRT TV, Li-ion, Inverter)"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-surface-container-high border border-surface-container text-on-surface rounded-2xl py-3.5 pl-12 pr-12 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/60"
            />
            <button className="absolute right-4 text-primary p-1">
              <span className="material-symbols-outlined">mic</span>
            </button>
          </div>
          <div className="flex overflow-x-auto mt-3 pb-2 space-x-2 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setSearchText(cat.name)}
                className="flex items-center space-x-1.5 bg-surface-container-low border border-surface-container-highest px-3 py-1.5 rounded-full whitespace-nowrap text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action Banner */}
        <div className="bg-gradient-to-r from-surface-container-high to-surface-container rounded-xl p-4 border border-surface-container-highest flex items-center shadow-md">
          <div className="bg-surface-container-highest p-3 rounded-full mr-4 text-secondary">
            <span className="material-symbols-outlined">factory</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-on-surface">Authorized Network</h4>
            <p className="text-xs text-primary font-medium mt-0.5">14 Recyclers within 15 km</p>
            <p className="text-xs text-on-surface-variant mt-0.5 truncate">Ludhiana Focal Point & Industrial Area A</p>
          </div>
          <button 
            onClick={() => setActiveTab('map')}
            className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-2 rounded-lg ml-2 hover:bg-secondary/20 transition-colors whitespace-nowrap"
          >
            Map {'>'}
          </button>
        </div>

        {/* Recent Diagnostics Carousel */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-on-surface">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              <h3 className="text-sm font-bold">Recent Diagnostics</h3>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">
              View All →
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
            {recentItems.map((item, idx) => (
              <div key={idx} className="min-w-[200px] w-[200px] bg-surface-container-high border border-surface-container rounded-xl overflow-hidden snap-start shadow-sm">
                <div className="h-28 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded ${item.badgeColor}`}>
                    {item.badge}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-on-surface truncate mb-1">{item.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-on-surface-variant">{item.date}</span>
                    <span className="text-[10px] font-bold text-primary">{item.points}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eco-Impact Milestone */}
        <div className="bg-surface-container-high rounded-xl p-4 border border-surface-container flex items-start space-x-3">
          <div className="bg-primary/20 p-2 rounded-lg text-primary mt-1">
            <span className="material-symbols-outlined">workspace_premium</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-bold text-on-surface">October Target Achieved</h4>
              <span className="text-xs font-bold text-primary">92%</span>
            </div>
            <p className="text-xs text-on-surface-variant">Prevented 14.8 kg heavy metal leaching</p>
            <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full w-[92%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
