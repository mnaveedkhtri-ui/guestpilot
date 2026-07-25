import { ImageResponse } from 'next/og';
 
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
        {/* SVG hata kar simple text aur styling use ki hai */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: 80, fontWeight: 800, color: 'white' }}>
            GuestPilot <span style={{ color: '#3B82F6' }}>AI</span>
          </div>
        </div>
        
        <div style={{ fontSize: 36, color: '#94A3B8' }}>
          Automate your guest post outreach and link building.
        </div>
        
        <div style={{ marginTop: '40px', padding: '15px 40px', background: '#3B82F6', borderRadius: '12px', fontSize: 28, fontWeight: 'bold', color: 'white' }}>
          Start Scaling Your Backlinks Today
        </div>
      </div>
    ),
    { ...size }
  );
}
