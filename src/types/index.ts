export interface HeavyMetal {
  name: string;
  chemical_symbol: string;
  atomic_number: number;
  amount_per_unit: string;
  source_component: string;
  health_impact: string;
  risk_level: 'High Risk' | 'Severe' | 'Hazard' | 'Moderate' | 'Low';
  icon: string; // material icon name
}

export interface UrbanMiningYield {
  gold_grams: string;
  copper_kg: string;
  silver_kg: string;
  cobalt_kg: string;
}

export interface AnalysisResult {
  device_name: string;
  device_subtitle: string;
  detected_item_description?: string;
  toxicity_level: 'High' | 'Medium' | 'Low';
  toxicity_score: number; // 0-10
  cpcb_category: string;
  cpcb_code: string;
  heavy_metals: HeavyMetal[];
  urban_mining_yield: UrbanMiningYield;
  disposal_advisory: string;
  sample_id: string;
  scanned_at: string;
  image_url?: string;
  heavy_metal_percentage: number;
  bfr_percentage: number;
  solvent_percentage: number;
  is_consumer_item?: boolean;
  brand_model?: string;
  estimated_resale_value_range?: string;
}

export interface Recycler {
  id: string;
  name: string;
  cpcb_authorization: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  distance_km: number;
  phone: string;
  rating: number;
  tons_recycled: number;
  certifications: string[];
  accepted_types: string[];
  facility_hours: string;
  doorstep_pickup: boolean;
  cpcb_grade: string;
  processing_capacity: string;
  wait_time: string;
}

export interface EPRCertificate {
  certificate_id: string;
  user_name: string;
  device_name: string;
  recycler_name: string;
  date: string;
  time: string;
  lead_diverted_kg: string;
  copper_recovered_kg: string;
  carbon_offset_kg: string;
  epr_points: number;
  guardian_level: number;
  guardian_title: string;
}

export interface UserProfile {
  name: string;
  member_since: string;
  total_ewaste_kg: number;
  epr_compliance_percent: number;
  drb_equivalent: string;
  recovery_urban_mine_kg: number;
  guardian_level: number;
  guardian_title: string;
  epr_points: number;
  badges: Badge[];
  handover_history: HandoverItem[];
}

export interface Badge {
  name: string;
  icon: string;
  color: string;
  earned: boolean;
}

export interface HandoverItem {
  id: string;
  device_name: string;
  recycler: string;
  weight_kg: string;
  date: string;
  epr_points: number;
  icon: string;
}

export type AppTab = 'scan' | 'map' | 'breakdown' | 'profile';
