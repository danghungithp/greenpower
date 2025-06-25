'use client';

import React from 'react';
import { Home, PanelTop, Battery, TowerControl } from 'lucide-react';

// A generic icon wrapper for the diagram
const IconWrapper = ({ icon: Icon, label, x, y }: { icon: React.ElementType, label: string, x: number, y: number }) => (
    <g transform={`translate(${x}, ${y})`}>
        <rect x="-40" y="-40" width="80" height="80" rx="40" className="fill-primary/10" />
        <foreignObject x="-20" y="-20" width="40" height="40">
            <div className="flex h-full w-full items-center justify-center text-primary">
                <Icon className="h-8 w-8" />
            </div>
        </foreignObject>
        <text textAnchor="middle" y="55" className="text-sm font-medium fill-foreground">{label}</text>
    </g>
);

// Generic component for a simple box (like an inverter)
const BoxWrapper = ({ label, x, y, width = 140, height = 50 }: { label: string, x: number, y: number, width?: number, height?: number }) => (
    <g transform={`translate(${x}, ${y})`}>
        <rect x={-width/2} y={-height/2} width={width} height={height} rx="8" className="fill-card stroke-border stroke-2" />
        <text textAnchor="middle" dominantBaseline="middle" className="text-sm font-semibold fill-foreground">{label}</text>
    </g>
)

// Arrow component
const Arrow = ({ d, bidirectional = false, dashed = false }: { d: string, bidirectional?: boolean, dashed?: boolean }) => (
    <g>
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,3.5 L0,7 Z" className="fill-foreground" />
            </marker>
             <marker id="arrowhead-rev" markerWidth="10" markerHeight="7" refX="2" refY="3.5" orient="auto-start-reverse" markerUnits="strokeWidth">
                <path d="M0,3.5 L10,0 L10,7 Z" className="fill-foreground" />
            </marker>
        </defs>
        <path d={d} className="stroke-foreground" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" markerStart={bidirectional ? "url(#arrowhead-rev)" : undefined} strokeDasharray={dashed ? "8 4" : undefined} />
    </g>
)

// Grid-Tie Diagram
const GridTieDiagram = () => (
    <svg viewBox="0 0 600 300" className="w-full h-auto max-w-2xl mx-auto">
        <IconWrapper icon={PanelTop} label="Tấm pin" x={80} y={150} />
        <BoxWrapper label="Inverter Hòa Lưới" x={280} y={150} />
        <IconWrapper icon={Home} label="Tải tiêu thụ" x={480} y={80} />
        <IconWrapper icon={TowerControl} label="Lưới điện" x={480} y={220} />
        
        <Arrow d="M 120 150 H 210" />
        <Arrow d="M 350 150 C 400 150, 420 100, 440 100" />
        <Arrow d="M 350 150 C 400 150, 420 200, 440 200" bidirectional />
    </svg>
)

// Hybrid Diagram
const HybridDiagram = () => (
     <svg viewBox="0 0 600 350" className="w-full h-auto max-w-2xl mx-auto">
        <IconWrapper icon={PanelTop} label="Tấm pin" x={80} y={150} />
        <BoxWrapper label="Inverter Hybrid" x={280} y={150} />
        <IconWrapper icon={Battery} label="Pin lưu trữ" x={280} y={280} />
        <IconWrapper icon={Home} label="Tải tiêu thụ" x={480} y={80} />
        <IconWrapper icon={TowerControl} label="Lưới điện" x={480} y={220} />
        
        <Arrow d="M 120 150 H 210" />
        <Arrow d="M 280 175 V 240" bidirectional />
        <Arrow d="M 350 150 C 400 150, 420 100, 440 100" />
        <Arrow d="M 350 150 C 400 150, 420 200, 440 200" bidirectional />
    </svg>
)

// Off-Grid Diagram
const OffGridDiagram = () => (
     <svg viewBox="0 0 800 350" className="w-full h-auto max-w-3xl mx-auto">
        <IconWrapper icon={PanelTop} label="Tấm pin" x={80} y={150} />
        <BoxWrapper label="Charge Controller" x={280} y={150} />
        <IconWrapper icon={Battery} label="Pin lưu trữ" x={480} y={150} />
        <BoxWrapper label="Inverter Off-Grid" x={680} y={150} />
        <IconWrapper icon={Home} label="Tải tiêu thụ" x={880} y={150} />
        <BoxWrapper label="Máy phát dự phòng" x={680} y={280} width={160}/>

        <Arrow d="M 120 150 H 210" />
        <Arrow d="M 350 150 H 440" />
        <Arrow d="M 520 150 H 610" />
        <Arrow d="M 750 150 H 840" />
        <Arrow d="M 680 255 V 175" dashed />
    </svg>
)


export function SolarSystemDiagram({ systemType }: { systemType: string }) {
    const renderDiagram = () => {
        switch (systemType) {
            case 'grid-tie':
                return <GridTieDiagram />;
            case 'hybrid':
                return <HybridDiagram />;
            case 'off-grid':
                return <OffGridDiagram />;
            default:
                return <GridTieDiagram />;
        }
    };

    return (
        <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border bg-background p-4 min-h-48">
            {renderDiagram()}
        </div>
    );
}
