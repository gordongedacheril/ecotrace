import { QRCodeSVG } from 'qrcode.react';

export default function PublicPassPage({ encodedData }: { encodedData: string }) {
  const profileUrl = window.location.origin + "/pass/" + encodedData;
  const isMobile = window.innerWidth <= 768;

  // Attempt to decode data from the URL, fallback to default structure if simple passId was provided
  let passDetails = {
    id: encodedData,
    device: "Unknown E-Waste Device",
    recycler: "Authorized CPCB Recycler",
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    weight: "N/A"
  };

  try {
    const decodedStr = decodeURIComponent(atob(encodedData));
    const parsed = JSON.parse(decodedStr);
    if (parsed.id) passDetails = parsed;
  } catch (e) {
    // If it fails to parse, it means it's an old non-base64 link like /pass/EPR-123.
    // It will just use the default fallback state above.
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden w-full max-w-md shadow-sm">
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">GOVERNMENT OF INDIA MOEFCC</span>
            <span className="text-[16px] font-semibold text-on-surface mt-1">Disposal Handover Certificate</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[20px]">gavel</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-5 flex gap-5 items-center mb-6 border border-outline-variant/30">
          <div className="w-[84px] h-[84px] bg-white rounded-xl p-2 flex-shrink-0">
            <QRCodeSVG value={profileUrl} size={68} level="H" includeMargin={false} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">SERIAL PASS HASH</span>
            <span className="text-[18px] font-mono font-bold text-on-surface tracking-tight truncate">#{passDetails.id}</span>
            <div className="flex items-center gap-1 mt-2 bg-primary/10 px-2 py-0.5 rounded w-fit">
              <span className="material-symbols-outlined text-primary text-[14px]">lock</span>
              <span className="text-[10px] font-semibold text-primary">SHA-256 Ledger Locked</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 mb-6 text-[14px]">
          <div className="text-on-surface-variant">Device Class:</div>
          <div className="text-on-surface font-medium text-right truncate">{passDetails.device}</div>
          <div className="text-on-surface-variant">Authorized Recycler:</div>
          <div className="text-on-surface font-medium text-right truncate">{passDetails.recycler}</div>
          <div className="text-on-surface-variant">Issuance Date:</div>
          <div className="text-on-surface font-medium text-right">{passDetails.date}</div>
          <div className="text-on-surface-variant">Est. Weight Diverted:</div>
          <div className="text-on-surface font-medium text-right">{passDetails.weight} kg</div>
          <div className="text-on-surface-variant">Standard Protocol:</div>
          <div className="text-primary font-medium text-right underline decoration-primary/30 underline-offset-2">MoEFCC Schedule II</div>
          <div className="text-on-surface-variant">Citizen Status:</div>
          <div className="text-on-surface font-medium text-right">Verified EPR Contributor</div>
        </div>
        
        <div className="w-full bg-primary/10 text-primary p-3 rounded-xl text-center text-[12px] font-semibold flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          Authentic Public EcoTrace Record
        </div>
      </div>
      
      {!isMobile && (
        <div className="mt-8 text-on-surface-variant text-sm">
          Want to scan your own e-waste? <a href="/" className="text-primary hover:underline">Open EcoTrace AI</a>
        </div>
      )}
    </div>
  );
}
