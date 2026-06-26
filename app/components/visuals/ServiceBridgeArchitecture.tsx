'use client'

import React from 'react'

/**
 * ServiceBridge Architecture Diagram Component
 * Renders a high-fidelity system design diagram for the ServiceBridge project
 */
export default function ServiceBridgeArchitecture() {
    return (
        <div className="w-full mt-12 mb-16 p-8 bg-surface border border-surface-2 overflow-hidden">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">ServiceBridge Infrastructure</h3>
                    <p className="text-text-secondary text-sm">Distributed Real-time Matching & Recommendation Engine</p>
                </div>
                <div className="hidden sm:flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary" />
                        <span className="text-xs text-text-secondary">Write Master</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500" />
                        <span className="text-xs text-text-secondary">Read Replica</span>
                    </div>
                </div>
            </div>

            <div className="relative w-full aspect-[16/10] max-w-5xl mx-auto border border-surface-2 bg-background p-4 overflow-x-auto">
                {/* SVG Diagram */}
                <svg viewBox="0 0 800 500" className="w-full min-w-[800px] h-auto">
                    {/* Definitions */}
                    <defs>
                        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#2dd4bf', stopOpacity: 1 }} />
                        </linearGradient>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#4b5563" />
                        </marker>
                    </defs>

                    {/* Users Layer */}
                    <g transform="translate(40, 50)">
                        <rect x="0" y="0" width="120" height="60" className="fill-gray-900 stroke-gray-700" strokeWidth="1" />
                        <text x="60" y="38" textAnchor="middle" className="fill-white text-[14px] font-medium font-sans">Customers</text>
                        <circle cx="60" cy="-5" r="4" className="fill-primary animate-pulse" />
                    </g>

                    <g transform="translate(240, 50)">
                        <rect x="0" y="0" width="130" height="60" className="fill-gray-900 stroke-gray-700" strokeWidth="1" />
                        <text x="65" y="38" textAnchor="middle" className="fill-white text-[14px] font-medium font-sans">Service Providers</text>
                        <circle cx="65" cy="-5" r="4" className="fill-primary animate-pulse" />
                    </g>

                    {/* Load Balancer */}
                    <g transform="translate(100, 160)">
                        <rect x="0" y="0" width="200" height="40" className="fill-blue-500/20 stroke-blue-500" strokeWidth="1" />
                        <text x="100" y="25" textAnchor="middle" className="fill-blue-400 text-[12px] font-bold uppercase tracking-wider font-sans">NGINX / ALB</text>
                    </g>

                    {/* API Gateway Cluster */}
                    <g transform="translate(50, 240)">
                        <text x="0" y="-10" className="fill-gray-500 text-[10px] uppercase font-bold tracking-widest font-sans">Microservices Tier</text>
                        <rect x="0" y="0" width="100" height="80" className="fill-gray-800 stroke-gray-600" />
                        <text x="50" y="45" textAnchor="middle" className="fill-white text-[11px] font-sans">User Service</text>

                        <rect x="120" y="0" width="100" height="80" className="fill-gray-800 stroke-gray-600" />
                        <text x="170" y="35" textAnchor="middle" className="fill-white text-[11px] font-sans">Matching</text>
                        <text x="170" y="55" textAnchor="middle" className="fill-primary text-[10px] font-bold font-sans">WS/Socket.io</text>

                        <rect x="240" y="0" width="100" height="80" className="fill-gray-800 stroke-gray-600 border-primary" style={{ strokeWidth: 2, stroke: 'rgba(45, 212, 191, 0.5)' }} />
                        <text x="290" y="35" textAnchor="middle" className="fill-white text-[11px] font-sans">Payment Engine</text>
                        <text x="290" y="55" textAnchor="middle" className="fill-gray-400 text-[9px] font-sans">Stripe Connect</text>
                    </g>

                    {/* AI Layer */}
                    <g transform="translate(420, 240)">
                        <rect x="0" y="0" width="140" height="80" className="fill-primary/10 stroke-primary" strokeWidth="1.5" strokeDasharray="4 2" />
                        <text x="70" y="30" textAnchor="middle" className="fill-primary text-[12px] font-bold font-sans">Matching AI</text>
                        <text x="70" y="50" textAnchor="middle" className="fill-gray-300 text-[9px] font-sans">Transformers / BERT</text>
                        <text x="70" y="65" textAnchor="middle" className="fill-gray-400 text-[8px] font-sans">Embedding Vector Search</text>
                    </g>

                    {/* Data Tier */}
                    <g transform="translate(100, 380)">
                        <text x="0" y="-10" className="fill-gray-500 text-[10px] uppercase font-bold tracking-widest font-sans">Data & Caching Tier</text>

                        {/* Redis */}
                        <path d="M0 10 L80 10 L85 0 L165 0 L165 40 L0 40 Z" className="fill-red-500/10 stroke-red-500/50" />
                        <text x="82" y="25" textAnchor="middle" className="fill-red-400 text-[11px] font-bold font-sans">Redis Cluster</text>

                        {/* Postgres */}
                        <g transform="translate(200, 0)">
                            <rect x="0" y="0" width="100" height="60" className="fill-gray-900 stroke-primary" strokeWidth="1.5" />
                            <text x="50" y="30" textAnchor="middle" className="fill-white text-[11px] font-sans">Postgres (W)</text>

                            <rect x="120" y="0" width="100" height="60" className="fill-gray-900 stroke-blue-500/50" strokeWidth="1" />
                            <text x="170" y="30" textAnchor="middle" className="fill-white text-[11px] font-sans">Postgres (R)</text>

                            <rect x="240" y="0" width="100" height="60" className="fill-gray-900 stroke-blue-500/50" strokeWidth="1" />
                            <text x="290" y="30" textAnchor="middle" className="fill-white text-[11px] font-sans">Postgres (R)</text>

                            <path d="M100 30 L115 30" stroke="#4b5563" strokeWidth="1" markerEnd="url(#arrow)" />
                            <path d="M220 30 L235 30" stroke="#4b5563" strokeWidth="1" markerEnd="url(#arrow)" />
                        </g>
                    </g>

                    {/* Connection Lines */}
                    <g stroke="#4b5563" strokeWidth="1" fill="none" markerEnd="url(#arrow)">
                        <path d="M100 110 L150 155" />
                        <path d="M300 110 L250 155" />

                        <path d="M200 200 L200 230" />
                        <path d="M200 200 L100 230" />
                        <path d="M200 200 L300 230" />

                        <path d="M340 280 L410 280" />

                        <path d="M100 320 L130 375" />
                        <path d="M200 320 L270 375" />
                        <path d="M300 320 L400 375" />
                    </g>
                </svg>

                {/* Legend / Overlay */}
                <div className="absolute bottom-4 right-4 text-right">
                    <p className="text-[10px] text-text-muted mb-1">Scale Strategy: Horizontal Autoscaling (K8s)</p>
                    <p className="text-[10px] text-text-muted">Failure Mode: Multi-AZ Failover + Dead Letter Queues</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 border-t border-white/5 pt-8">
                <div>
                    <h4 className="text-text-primary font-bold text-sm mb-2 font-mono tracking-tight">Real-time Matching</h4>
                    <p className="text-xs text-text-secondary font-mono leading-relaxed">
                        Event-driven architecture using Socket.io and Redis Pub/Sub for sub-100ms notification delivery.
                    </p>
                </div>
                <div>
                    <h4 className="text-text-primary font-bold text-sm mb-2 font-mono tracking-tight">Distributed Persistence</h4>
                    <p className="text-xs text-text-secondary font-mono leading-relaxed">
                        Primary-replica Postgres setup to handle high read volume during search while maintaining ACID transactional integrity.
                    </p>
                </div>
                <div>
                    <h4 className="text-text-primary font-bold text-sm mb-2 font-mono tracking-tight">AI Matching Optimization</h4>
                    <p className="text-xs text-text-secondary font-mono leading-relaxed">
                        Vector embeddings and semantic search using a fine-tuned BERT model to match natural language service requests.
                    </p>
                </div>
            </div>
        </div>
    )
}
