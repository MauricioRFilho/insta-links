import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617', // Slate-950
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff9f', // Cyber Green
          border: '2px solid #00ff9f',
          borderRadius: '4px', // Cyber corner
          fontSize: 20,
          fontWeight: 900,
        }}
      >
        ⚡
      </div>
    ),
    {
      ...size,
    }
  );
}
