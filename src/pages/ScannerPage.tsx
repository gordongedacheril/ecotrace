import { useState, useRef, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import Webcam from 'react-webcam';
import { useApp } from '../context/AppContext';

const ScannerPage = () => {
  const { setActiveTab, setIsAnalyzing, setAnalysisResult, setAnalysisImage } = useApp();
  const [searchText, setSearchText] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUserMediaError = (err: string | DOMException) => {
    console.error('Camera permission error:', err);
    setCameraError('Camera access denied or unavailable. Please allow permissions in your browser settings or use file upload.');
    setIsCameraActive(false);
  };

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPreviewImage(imageSrc);
        processAnalysis({ image: imageSrc });
      }
    } else if (cameraError || !isCameraActive) {
      fileInputRef.current?.click();
    }
  }, [webcamRef, cameraError, isCameraActive]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setIsCameraActive(false);
        processAnalysis({ image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSearch = () => {
    if (searchText.trim()) {
      processAnalysis({ text: searchText.trim() });
    }
  };

  const processAnalysis = async (input: { image?: string; text?: string }) => {
    setIsAnalyzing(true);
    if (input.image) setAnalysisImage(input.image);
    
    try {
      const endpoint = '/api/analyze';
      
      const payload: any = {};
      if (input.image) payload.image = input.image;
      if (input.text) payload.text = input.text;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisResult(data);
      setActiveTab('breakdown');
    } catch (error) {
      console.error('Error during analysis:', error);
      alert('Analysis failed. Please ensure the backend is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Context Bar */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping shrink-0" />
          <span className="text-[12px] font-semibold text-primary truncate">Hello, Circular Guardian 🌿</span>
        </div>

      </div>

      {/* Scanner Card */}
      <div className="px-4 mt-2">
        <div className="relative w-full rounded-xl bg-surface-container-low shadow-xl overflow-hidden p-4 flex flex-col items-center">
          {/* Top Status */}
          <div className="w-full flex items-center justify-between mb-4 z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest/80 backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-[14px]">neurology</span>
              <span className="text-[10px] font-bold text-on-surface">Gemini AI Vision Ready</span>
            </div>
            {/* Flashlight button removed per user request */}
          </div>

          {/* Camera Viewfinder */}
          <div className="relative w-full aspect-[4/3] rounded-lg bg-black overflow-hidden flex items-center justify-center shadow-inner group">
            
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : cameraError ? (
              <div className="text-error flex flex-col items-center justify-center p-6 text-center bg-surface-container/50 h-full w-full">
                <span className="material-symbols-outlined text-4xl mb-2 text-error">videocam_off</span>
                <span className="text-sm font-medium mb-3">{cameraError}</span>
                <button 
                  onClick={() => { setCameraError(null); setIsCameraActive(true); }}
                  className="px-4 py-2 bg-surface-container-high rounded-full text-xs font-semibold text-on-surface border border-outline-variant/30 active:scale-95 transition-transform"
                >
                  Retry Camera
                </button>
              </div>
            ) : isCameraActive ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                onUserMediaError={handleUserMediaError}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-on-surface-variant flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl mb-2">no_photography</span>
                <span className="text-sm">Camera inactive</span>
                <button 
                  onClick={() => setIsCameraActive(true)}
                  className="mt-3 px-4 py-2 bg-surface-container-high rounded-full text-xs font-semibold text-on-surface border border-outline-variant/30 active:scale-95 transition-transform"
                >
                  Turn On Camera
                </button>
              </div>
            )}

            {/* Overlays (only show when camera is active and no preview/error) */}
            {!previewImage && isCameraActive && !cameraError && (
              <>
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-sm pointer-events-none drop-shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-sm pointer-events-none drop-shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-sm pointer-events-none drop-shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-sm pointer-events-none drop-shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
                
                <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_rgba(78,222,163,0.9)] animate-scan-sweep pointer-events-none" />
                
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-on-surface-variant text-[10px] font-bold pointer-events-none">
                  <span className="bg-surface-container-lowest/80 px-2 py-0.5 rounded">Live Analysis</span>
                  <span className="bg-surface-container-lowest/80 px-2 py-0.5 rounded text-primary font-mono">Gemini-Flash</span>
                </div>
              </>
            )}
          </div>

          {/* Triggers */}
          <div className="w-full mt-4 flex items-center gap-2 z-10">
            <button
              onClick={handleCapture}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary-fixed font-semibold text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.30)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              <span>Scan Item</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface flex items-center justify-center shadow-sm active:scale-[0.96] transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]">upload_file</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Manual Search */}
      <div className="px-4 mt-4">
        <div className="w-full bg-surface-container rounded-xl p-2 flex items-center gap-2 shadow-md">
          <span className="material-symbols-outlined text-outline text-[20px] ml-1">search</span>
          <input
            type="text"
            className="bg-transparent text-on-surface placeholder:text-outline text-[14px] w-full focus:outline-none"
            placeholder="Type device (e.g., CRT TV, Li-ion)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTextSearch()}
          />
          <button onClick={handleTextSearch} className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
