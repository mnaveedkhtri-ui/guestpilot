import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'GuestPilot AI - Guest Post Outreach Tool';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F1115',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <svg width="80" height="80" viewBox="0 0 256 256" style={{ transform: 'rotate(-10deg)' }}>
            <path d="M160 40 L50 110 L100 130 L120 180 L190 70 Z" fill="#3B82F6"/>
            <path d="M100 130 L160 40" stroke="#0F1115" stroke-width="15" stroke-linecap="round"/>
          </svg>
          <div style={{ fontSize: 80, fontWeight: 800, color: 'white' }}>
            GuestPilot <span style={{ color: '#3B82F6' }}>AI</span>
          </div>
        </div>
        <div style={{ fontSize: 36, color: '#94A3B8' }}>
          Automate your guest post outreach and link building.
        </div>
        <div style={{ marginTop: '40px', padding: '15px 40px', background: '#3B82F6', borderRadius: '12px', fontSize: 28, fontWeight: 'bold' }}>
          Start Scaling Your Backlinks Today
        </div>
      </div>
    ),
    { ...size }
  );
}
