import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AnalysisResult, AppTab, HandoverItem } from '../types';

interface AppContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (val: boolean) => void;
  userPincode: string;
  setUserPincode: (pincode: string) => void;
  userCity: string;
  setUserCity: (city: string) => void;
  analysisImage: string | null;
  setAnalysisImage: (img: string | null) => void;
  handovers: HandoverItem[];
  addHandover: (item: HandoverItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<AppTab>('scan');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userPincode, setUserPincode] = useState('141001');
  const [userCity, setUserCity] = useState('Ludhiana');
  const [analysisImage, setAnalysisImage] = useState<string | null>(null);
  const [handovers, setHandovers] = useState<HandoverItem[]>([]);

  const addHandover = (item: HandoverItem) => {
    setHandovers((prev) => [item, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        analysisResult,
        setAnalysisResult,
        isAnalyzing,
        setIsAnalyzing,
        userPincode,
        setUserPincode,
        userCity,
        setUserCity,
        analysisImage,
        setAnalysisImage,
        handovers,
        addHandover,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
