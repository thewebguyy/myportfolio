import React from 'react'

interface TechnicalAuditProps {
  stack: string[];
  architecture?: string;
  performance?: { metric: string; value: string }[];
}

export function TechnicalAudit({ stack, architecture, performance }: TechnicalAuditProps) {
  return (
    <div className="border-t-[0.5px] border-border-wire bg-surface p-6 font-mono text-[12px] text-text-primary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stack */}
        <div>
          <div className="text-text-accent uppercase tracking-widest mb-4 opacity-80">[Tech Stack]</div>
          <ul className="flex flex-col gap-2 opacity-80">
            {stack.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-border-wire inline-block"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Performance Logs */}
        {performance && (
          <div>
            <div className="text-text-accent uppercase tracking-widest mb-4 opacity-80">[Telemetry]</div>
            <ul className="flex flex-col gap-2 opacity-80">
              {performance.map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b-[0.5px] border-border-wire pb-1">
                  <span>{item.metric}</span>
                  <span className="text-text-accent">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Architecture Spec */}
        {architecture && (
          <div>
            <div className="text-text-accent uppercase tracking-widest mb-4 opacity-80">[Architecture]</div>
            <div className="opacity-80 leading-relaxed">
              {architecture}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
