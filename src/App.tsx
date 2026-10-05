
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import AnalysisLoader from './components/AnalysisLoader';
import ScannerPage from './pages/ScannerPage';
import BreakdownPage from './pages/BreakdownPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';

import PublicPassPage from './pages/PublicPassPage';

function AppContent() {
  const { activeTab, isAnalyzing } = useApp();

  const path = window.location.pathname;
  if (path.startsWith('/pass/')) {
    const passId = path.split('/')[2];
    return (
      <div className="dark min-h-screen bg-surface text-on-surface font-['Plus_Jakarta_Sans'] antialiased pt-8">
        <PublicPassPage passId={passId} />
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'scan':
        return <ScannerPage />;
      case 'map':
        return <MapPage />;
      case 'breakdown':
        return <BreakdownPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ScannerPage />;
    }
  };

  return (
    <div className="dark min-h-screen bg-surface text-on-surface font-['Plus_Jakarta_Sans'] antialiased">
      <Header />
      <AnalysisLoader isVisible={isAnalyzing} />
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        {renderPage()}
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
