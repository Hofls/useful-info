import { z } from "zod";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import React from "react";

export const GeometricMorphism: React.FC<{
  color1: string;
  color2: string;
  color3: string;
  rotationSpeed: number;
  morphSpeed: number;
  shapeCount: number;
}> = ({ color1, color2, color3, rotationSpeed, morphSpeed, shapeCount }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const getShapePath = (
    shapeType: number,
    size: number,
    morph: number
  ): string => {
    const points = 8;
    const morphFactor = (morph % 1);

    if (shapeType === 0) {
      // Circle to square
      const coords = Array.from({ length: points }, (_, i) => {
        const angle = (i / points) * Math.PI * 2;
        let x = Math.cos(angle) * size;
        let y = Math.sin(angle) * size;

        const squareX = Math.cos(angle) > 0 ? size : -size;
        const squareY = Math.sin(angle) > 0 ? size : -size;

        x = x + (squareX - x) * morphFactor;
        y = y + (squareY - y) * morphFactor;

        return [x, y];
      });
      return `M${coords.map((c) => c.join(",")).join("L")}Z`;
    } else if (shapeType === 1) {
      // Square to triangle
      const coords = Array.from({ length: Math.max(3, Math.round(5 - morphFactor * 2)) }, (_, i) => {
        const angle = (i / Math.max(3, Math.round(5 - morphFactor * 2))) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;
        return [x, y];
      });
      return `M${coords.map((c) => c.join(",")).join("L")}Z`;
    } else {
      // Star
      const coords = [];
      for (let i = 0; i < points * 2; i++) {
        const angle = (i / (points * 2)) * Math.PI * 2;
        const r = i % 2 === 0 ? size : size * morphFactor * 0.5 + size * 0.3;
        coords.push([Math.cos(angle) * r, Math.sin(angle) * r]);
      }
      return `M${coords.map((c) => c.join(",")).join("L")}Z`;
    }
  };

  const shapes = Array.from({ length: shapeCount }, (_, i) => {
    const angle = (i / shapeCount) * Math.PI * 2;
    const distance = 300 + Math.sin(frame * 0.01 + i) * 100;
    const x = width / 2 + Math.cos(angle + frame * rotationSpeed * 0.01) * distance;
    const y = height / 2 + Math.sin(angle + frame * rotationSpeed * 0.01) * distance;
    const size = 50 + Math.sin(frame * 0.02 + i * 0.5) * 30;
    const rotation = (frame * rotationSpeed * 0.05 + i * (360 / shapeCount)) % 360;
    const morph = frame * morphSpeed * 0.01 + i;
    const shapeType = Math.floor(i / (shapeCount / 3)) % 3;

    const colors = [color1, color2, color3];
    const color = colors[i % 3];

    return {
      x,
      y,
      size,
      rotation,
      morph,
      shapeType,
      color,
      index: i,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(45deg, #0a0e27 0%, #1a0033 50%, #0a0e27 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute" }}
      >
        <defs>
          <linearGradient
            id="morph-grad-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color1} stopOpacity="1" />
            <stop offset="100%" stopColor={color2} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient
            id="morph-grad-2"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={color2} stopOpacity="1" />
            <stop offset="100%" stopColor={color3} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient
            id="morph-grad-3"
            x1="100%"
            y1="50%"
            x2="0%"
            y2="50%"
          >
            <stop offset="0%" stopColor={color3} stopOpacity="1" />
            <stop offset="100%" stopColor={color1} stopOpacity="0.5" />
          </linearGradient>
          <filter id="morph-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="morph-blur">
            <feGaussianBlur
              stdDeviation={Math.abs(Math.sin(frame * 0.02)) * 3}
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background animated grid */}
        <g opacity="0.1">
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i / 10) * height}
              x2={width}
              y2={(i / 10) * height}
              stroke={color1}
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={(i / 10) * width}
              y1="0"
              x2={(i / 10) * width}
              y2={height}
              stroke={color1}
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Orbiting shapes */}
        {shapes.map((shape) => (
          <g
            key={shape.index}
            transform={`translate(${shape.x},${shape.y}) rotate(${shape.rotation})`}
          >
            {/* Outer ring */}
            <circle
              cx="0"
              cy="0"
              r={shape.size + 10}
              fill="none"
              stroke={shape.color}
              strokeWidth="2"
              opacity="0.4"
              filter="url(#morph-glow)"
            />

            {/* Main shape */}
            <path
              d={getShapePath(shape.shapeType, shape.size, shape.morph)}
              fill={`url(#morph-grad-${(shape.index % 3) + 1})`}
              stroke={shape.color}
              strokeWidth="2"
              opacity={0.8}
              filter="url(#morph-blur)"
            />

            {/* Inner detail */}
            <circle
              cx="0"
              cy="0"
              r={shape.size * 0.4}
              fill="none"
              stroke={shape.color}
              strokeWidth="1"
              opacity="0.6"
            />
          </g>
        ))}

        {/* Central mandala */}
        <g transform={`translate(${width / 2},${height / 2})`}>
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * Math.PI * 2 + frame * 0.005;
            const distance = 150;
            return (
              <line
                key={`mandala-${i}`}
                x1={Math.cos(angle) * 20}
                y1={Math.sin(angle) * 20}
                x2={Math.cos(angle) * distance}
                y2={Math.sin(angle) * distance}
                stroke={
                  i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3
                }
                strokeWidth="1"
                opacity={0.3}
              />
            );
          })}

          {Array.from({ length: 4 }, (_, i) => (
            <circle
              key={`center-${i}`}
              cx="0"
              cy="0"
              r={(i + 1) * 30}
              fill="none"
              stroke={
                i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3
              }
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          <circle
            cx="0"
            cy="0"
            r="15"
            fill={color1}
            opacity="0.6"
            filter="url(#morph-glow)"
          />
        </g>
      </svg>

      <style>{`
        @keyframes morph-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

export const geometricSchema = z.object({
  color1: z.string().default("#a8edea"),
  color2: z.string().default("#fed6e3"),
  color3: z.string().default("#ff9ff3"),
  rotationSpeed: z.number().default(0.5),
  morphSpeed: z.number().default(1.0),
  shapeCount: z.number().default(7),
});
