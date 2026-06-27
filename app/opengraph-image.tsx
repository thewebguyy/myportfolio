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
          background: '#080D1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#F2EDE8',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: '28px',
              color: '#C4622D',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
              fontFamily: 'monospace',
            }}
          >
            Full-Stack Engineer · Lagos, Nigeria
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
              color: '#8E9BAA',
              lineHeight: 1.4,
            }}
          >
            5+ years shipping fintech and marketplace infrastructure across West Africa.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              background: '#C4622D',
              marginRight: '16px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              color: '#8E9BAA',
              fontFamily: 'monospace',
            }}
          >
            olabodeolusegun.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
