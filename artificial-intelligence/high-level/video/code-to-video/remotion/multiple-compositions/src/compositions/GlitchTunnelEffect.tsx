import { z } from "zod";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import React from "react";

export const GlitchTunnelEffect: React.FC<{
  colorA: string;
  colorB: string;
  colorC: string;
  glitchIntensity: number;
  depthSpeed: number;
}> = ({ colorA, colorB, colorC, glitchIntensity, depthSpeed }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const generateTunnelLayers = () => {
    const layers = [];
    const layerCount = 40;

    for (let i = 0; i < layerCount; i++) {
      const depth = (frame * depthSpeed + i * 30) % 1000;
      const zIndex = 1000 - depth;
      const scale = Math.max(0.1, 1 + depth / 500);
      const glitch =
        Math.sin(frame * 0.1 + i * 0.5) * glitchIntensity * 20;

      const rotationOffset = Math.sin(frame * 0.01 + i * 0.1) * 15;
      const hueShift = ((frame + i * 10) % 360);

      const hexagons = Array.from({ length: 6 }, (_, j) => {
        const angle = (j / 6) * Math.PI * 2 + rotationOffset * Math.PI / 180;
        const baseSize = Math.max(10, 100 / scale);
        return {
          x: Math.cos(angle) * (baseSize * 1.5 + glitch),
          y: Math.sin(angle) * (baseSize * 1.5 + glitch),
          angle,
        };
      });

      layers.push({
        depth,
        zIndex,
        scale,
        glitch,
        rotationOffset,
        hueShift,
        hexagons,
      });
    }

    return layers;
  };

  const layers = generateTunnelLayers();

  const interpolateColor = (
    c1: string,
    c2: string,
    c3: string,
    t: number
  ): string => {
    t = ((t % 1) + 1) % 1;
    if (t < 0.5) {
      const r1 = parseInt(c1.slice(1, 3), 16);
      const g1 = parseInt(c1.slice(3, 5), 16);
      const b1 = parseInt(c1.slice(5, 7), 16);
      const r2 = parseInt(c2.slice(1, 3), 16);
      const g2 = parseInt(c2.slice(3, 5), 16);
      const b2 = parseInt(c2.slice(5, 7), 16);

      const t2 = t * 2;
      const r = Math.round(r1 + (r2 - r1) * t2);
      const g = Math.round(g1 + (g2 - g1) * t2);
      const b = Math.round(b1 + (b2 - b1) * t2);
      return `rgb(${r},${g},${b})`;
    } else {
      const r2 = parseInt(c2.slice(1, 3), 16);
      const g2 = parseInt(c2.slice(3, 5), 16);
      const b2 = parseInt(c2.slice(5, 7), 16);
      const r3 = parseInt(c3.slice(1, 3), 16);
      const g3 = parseInt(c3.slice(3, 5), 16);
      const b3 = parseInt(c3.slice(5, 7), 16);

      const t2 = (t - 0.5) * 2;
      const r = Math.round(r2 + (r3 - r2) * t2);
      const g = Math.round(g2 + (g3 - g2) * t2);
      const b = Math.round(b2 + (b3 - b2) * t2);
      return `rgb(${r},${g},${b})`;
    }
  };

  return (
    <AbsoluteFill
      style={{
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: "1000px",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          transformStyle: "preserve-3d",
        }}
      >
        <defs>
          <filter id="glitch-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.5}
              numOctaves={4}
              result="noise"
              seed={frame}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={glitchIntensity * 5}
            />
          </filter>
          <linearGradient id="tunnel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorA} />
            <stop offset="50%" stopColor={colorB} />
            <stop offset="100%" stopColor={colorC} />
          </linearGradient>
        </defs>

        {/* Tunnel layers */}
        {layers.slice(0, 30).map((layer, idx) => {
          const color = interpolateColor(
            colorA,
            colorB,
            colorC,
            layer.hueShift / 360
          );
          const opacity = Math.max(0, 1 - layer.scale * 0.5);

          return (
            <g
              key={idx}
              style={{
                transform: `translate(${width / 2}px, ${height / 2}px) scale(${layer.scale}) rotate(${layer.rotationOffset}deg)`,
                opacity,
                mixBlendMode: "screen",
              }}
            >
              {/* Hexagon shape */}
              <polygon
                points={Array.from({ length: 6 }, (_, j) => {
                  const angle = (j / 6) * Math.PI * 2 + layer.rotationOffset * Math.PI / 180;
                  const radius = 80;
                  return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
                }).join(" ")}
                fill="none"
                stroke={color}
                strokeWidth={2 + Math.sin(frame * 0.05 + idx) * 1}
              />

              {/* Inner circles */}
              {Array.from({ length: 3 }, (_, i) => (
                <circle
                  key={`circle-${i}`}
                  cx="0"
                  cy="0"
                  r={(i + 1) * 25}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.5}
                />
              ))}
            </g>
          );
        })}

        {/* Glitch artifacts */}
        {Array.from({ length: 8 }, (_, i) => {
          const glitchX =
            (Math.sin(frame * 0.15 + i) * glitchIntensity * 30) %
            width;
          const glitchY =
            (Math.cos(frame * 0.12 + i) * glitchIntensity * 30) %
            height;
          const glitchSize =
            Math.abs(Math.sin(frame * 0.08 + i)) * 100 + 50;

          return (
            <rect
              key={`glitch-${i}`}
              x={glitchX}
              y={glitchY}
              width={glitchSize}
              height={Math.random() * 20 + 10}
              fill={[colorA, colorB, colorC][i % 3]}
              opacity={Math.random() * 0.3 + 0.1}
              filter="url(#glitch-filter)"
            />
          );
        })}
      </svg>

      <style>{`
        @keyframes glitch-pan {
          0% { transform: translateZ(0); }
          100% { transform: translateZ(100px); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

export const glitchTunnelSchema = z.object({
  colorA: z.string().default("#ff006e"),
  colorB: z.string().default("#00d9ff"),
  colorC: z.string().default("#ffbe0b"),
  glitchIntensity: z.number().default(0.7),
  depthSpeed: z.number().default(1.5),
});
