import type { VercelRequest, VercelResponse } from '@vercel/node';

const recyclers = [
  { id: '1', name: 'Attero Recycling Hub', cpcb_authorization: 'CPCB/HW/E-Waste/01', address: 'GT Road Corridor', city: 'Ludhiana', state: 'Punjab', pincode: '141001', lat: 30.9010, lng: 75.8573, distance_km: 3.2, phone: '+91-9876543210', rating: 4.9, tons_recycled: 840, certifications: ['ISO 14001', 'Hydrometallurgy'], accepted_types: ['Li-ion', 'PCBs', 'CRT'], facility_hours: '9:00 AM - 6:30 PM', doorstep_pickup: true, cpcb_grade: 'Grade A+', processing_capacity: 'High Processing Capacity', wait_time: 'No wait times reported' },
  { id: '2', name: 'GreenTek Reclaimers', cpcb_authorization: 'CPCB/HW/E-Waste/02', address: 'Focal Point Phase 8', city: 'Ludhiana', state: 'Punjab', pincode: '141010', lat: 30.9150, lng: 75.8720, distance_km: 5.1, phone: '+91-9876543211', rating: 4.7, tons_recycled: 620, certifications: ['ISO 9001'], accepted_types: ['Laptops', 'Phones'], facility_hours: '10:00 AM - 5:00 PM', doorstep_pickup: true, cpcb_grade: 'Grade A', processing_capacity: 'Medium Processing Capacity', wait_time: 'Short wait time' }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json(recyclers);
}
