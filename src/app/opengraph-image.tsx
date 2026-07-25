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
        {/* Har div jisme 1 se zyada children hain, usme display flex hai */}
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ fontSize: 80, fontWeight: 800, color: 'white' }}>GuestPilot&nbsp;</div>
          <div style={{ fontSize: 80, fontWeight: 800, color: '#3B82F6' }}>AI</div>
        </div>
        
        <div style={{ display: 'flex', fontSize: 36, color: '#94A3B8' }}>
          Automate your guest post outreach and link building.
        </div>
        
        <div style={{ display: 'flex', marginTop: '40px', padding: '15px 40px', background: '#3B82F6', borderRadius: '12px', fontSize: 28, fontWeight: 'bold', color: 'white' }}>
          Start Scaling Your Backlinks Today
        </div>
      </div>
    ),
    { ...size }
  );
}
