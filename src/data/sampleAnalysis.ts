import type { AnalysisResult } from '../types';

export const sampleAnalysis: AnalysisResult = {
  device_name: 'Discarded Smartphone PCB (Multilayer)',
  device_subtitle: 'FR-4 High-Density Interconnect (HDI) Substrate',
  toxicity_level: 'High',
  toxicity_score: 8.5,
  cpcb_category: 'IT & Telecommunication Equipment',
  cpcb_code: 'ITEW1',
  sample_id: 'ET-PCB-2026-9042',
  scanned_at: '2026-10-05T13:15:00Z',
  image_url:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuADiEIEm8oiFLGSDRQ_ZfJyu5BCjE4poMum2c_Le4LkhkA6AmO1ekYJSmabTPOuK59lRTYh9cbnixF3OPrarzykR0uUYiFUyayPan_oVjYyIsc5yuRJ89u-VtjWVSWYTc7zBIdRr2EdRJ0orbCc5ppHMWoVwlRoyN_NiZFmi1_ZCGsmMF0JptJoljPTzfK1U7EQpRXc4szrug29IqSzdUdi_c6nfJUakSyQe5vLvtFTdlGNojkgrG70',
  heavy_metal_percentage: 72,
  bfr_percentage: 21,
  solvent_percentage: 7,
  heavy_metals: [
    {
      name: 'Lead',
      chemical_symbol: 'Pb',
      atomic_number: 82,
      amount_per_unit: '~1.8g/board',
      source_component: 'Solder alloy joint traces',
      health_impact: 'Groundwater leaching & renal damage',
      risk_level: 'High Risk',
      icon: 'warning'
    },
    {
      name: 'Mercury',
      chemical_symbol: 'Hg',
      atomic_number: 80,
      amount_per_unit: '0.12g micro-switches',
      source_component: 'Relays & backlight sensors',
      health_impact: 'Bioaccumulative neurotoxin',
      risk_level: 'Severe',
      icon: 'skull'
    },
    {
      name: 'Cadmium',
      chemical_symbol: 'Cd',
      atomic_number: 48,
      amount_per_unit: 'SMD chip resistors',
      source_component: 'Semiconductor passives',
      health_impact: 'Carcinogenic bone toxicity',
      risk_level: 'High Risk',
      icon: 'memory'
    },
    {
      name: 'Brominated Flame Retardants (BFRs)',
      chemical_symbol: 'Br',
      atomic_number: 35,
      amount_per_unit: '14% w/w FR-4',
      source_component: 'Glass fiber epoxy matrix',
      health_impact: 'Dioxin vapor during open burning',
      risk_level: 'Hazard',
      icon: 'local_fire_department'
    }
  ],
  urban_mining_yield: {
    gold_grams: '~350',
    copper_kg: '~130',
    silver_kg: '~3.5',
    cobalt_kg: '~42'
  },
  disposal_advisory:
    'Contains restricted hazardous substances exceeding RoHS permissible thresholds. Prohibit informal thermal desoldering, acid leaching, or crude open burning which releases carcinogenic polybrominated dibenzodioxins and toxic lead vapors. Consign exclusively to authorized CPCB/SPCB hydrometallurgical recycling facilities for safe precious metals extraction.'
};

export default sampleAnalysis;
