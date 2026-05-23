import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Olabode Olusegun - Full-stack Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a1124',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
          color: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: '28px',
              color: '#4fc3f7',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
              fontFamily: 'monospace',
            }}
          >
            Software Engineering Portfolio
          </div>
          
          <div
            style={{
              fontSize: '96px',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            Olabode Olusegun
          </div>
          
          <div
            style={{
              fontSize: '36px',
              color: '#94a3b8',
              lineHeight: 1.4,
            }}
          >
            Full-stack engineer building production systems for African fintech and marketplace platforms.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              background: '#4fc3f7',
              marginRight: '16px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              color: '#cbd5e1',
              fontFamily: 'monospace',
            }}
          >
            Lagos, NG · Working Globally
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
