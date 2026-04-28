import React from 'react'

interface ArtifactFrameProps {
  id: string;
  status?: string;
  location?: string;
  title?: string;
  children: React.ReactNode;
}

export function ArtifactFrame({ id, status = 'STABLE', location = 'LAGOS_NG', title, children }: ArtifactFrameProps) {
  return (
    <div className="border-[0.5px] border-border-wire bg-background w-full mb-8">
      {/* Header */}
      <div className="border-b-[0.5px] border-border-wire bg-surface px-4 py-2 flex flex-col md:flex-row md:items-center justify-between font-mono text-[11px] text-text-primary uppercase tracking-widest">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <span className="text-text-accent font-semibold">[ID: {id}]</span>
          {title && <span className="opacity-90">{title}</span>}
        </div>
        <div className="flex items-center gap-4 opacity-60">
          <span>[LOC: {location}]</span>
          <span>[STATUS: {status}]</span>
        </div>
      </div>
      {/* Content */}
      <div className="p-0">
        {children}
      </div>
    </div>
  )
}
