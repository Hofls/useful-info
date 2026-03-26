import { z } from "zod";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import React from "react";

export const SynthwaveOdyssey: React.FC<{
  horizon: number;
  gridSize: number;
  sunColor: string;
  gridColor: string;
  speed: number;
}> = ({ horizon, gridSize, sunColor, gridColor, speed }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridOffset = ((frame * speed) % (gridSize * 2)) - gridSize;

  const generateGridLines = () => {
    const lines = [];

    // Horizontal lines (perspective)
    for (let i = 0; i < 30; i++) {
      const lineY = horizon - (i * gridSize + gridOffset);
      if (lineY > 0 && lineY < height) {
        const perspective = Math.max(0.2, 1 - i / 40);
        const lineWidth = width * 2 * perspective;
        const lineX = (width - lineWidth) / 2;

        lines.push({
          x: lineX,
          y: lineY,
          width: lineWidth,
          perspective,
          type: "horizontal",
          index: i,
        });
      }
    }

    // Vertical lines (perspective)
    for (let i = -5; i < 6; i++) {
      const leftX = width / 2 - gridSize * 2 - (frame * speed * 0.3) % gridSize;
      const x = leftX + i * gridSize;

      lines.push({
        x,
        perspective: 0.5,
        type: "vertical",
        index: i,
      });
    }

    return lines;
  };

  const gridLines = generateGridLines();

  // Sun parameters
  const sunX = width * 0.3 + Math.sin(frame * 0.005) * 50;
  const sunY = horizon - 100;
  const sunRadius = 80;

  // Sun rays
  const sunRays = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 + frame * 0.01;
    const innerRadius = sunRadius;
    const outerRadius = sunRadius + 60;

    return {
      angle,
      innerX: sunX + Math.cos(angle) * innerRadius,
      innerY: sunY + Math.sin(angle) * innerRadius,
      outerX: sunX + Math.cos(angle) * outerRadius,
      outerY: sunY + Math.sin(angle) * outerRadius,
      index: i,
    };
  });

  // Particles
  const particles = Array.from({ length: 50 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200;
    const x =
      sunX +
      Math.cos(angle) * distance +
      Math.sin(frame * 0.05 + i * 0.5) * 20;
    const y =
      sunY +
      Math.sin(angle) * distance +
      Math.cos(frame * 0.05 + i * 0.5) * 20;
    const size = Math.random() * 2 + 1;
    const opacity = Math.abs(Math.sin(frame * 0.02 + i * 0.3)) * 0.5;

    return { x, y, size, opacity, index: i };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, #0a0033 0%, #1a0055 ${horizon}px, #330033 100%)`,
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
          {/* Sun glow */}
          <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sunColor} stopOpacity="1" />
            <stop offset="70%" stopColor={sunColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={sunColor} stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="sun-glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Grid glow */}
          <filter id="grid-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Purple vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Grid floor */}
        {gridLines
          .filter((line) => line.type === "horizontal")
          .map((line) => (
            <line
              key={`h-${line.index}`}
              x1={line.x}
              y1={line.y}
              x2={line.x + line.width}
              y2={line.y}
              stroke={gridColor}
              strokeWidth={1 * line.perspective}
              opacity={0.6 * line.perspective}
              filter="url(#grid-glow)"
            />
          ))}

        {gridLines
          .filter((line) => line.type === "vertical")
          .map((line) => (
            <line
              key={`v-${line.index}`}
              x1={line.x}
              y1={0}
              x2={line.x}
              y2={height}
              stroke={gridColor}
              strokeWidth={1}
              opacity={0.3}
            />
          ))}

        {/* Horizon line */}
        <line
          x1="0"
          y1={horizon}
          x2={width}
          y2={horizon}
          stroke={sunColor}
          strokeWidth="2"
          opacity="0.8"
          filter="url(#grid-glow)"
        />

        {/* Sun rays */}
        {sunRays.map((ray) => (
          <line
            key={`ray-${ray.index}`}
            x1={ray.innerX}
            y1={ray.innerY}
            x2={ray.outerX}
            y2={ray.outerY}
            stroke={sunColor}
            strokeWidth={2 - Math.abs(Math.sin(frame * 0.02 + ray.index))}
            opacity={0.6 + Math.cos(frame * 0.01 + ray.index * 0.3) * 0.4}
          />
        ))}

        {/* Sun circle */}
        <circle
          cx={sunX}
          cy={sunY}
          r={sunRadius}
          fill="url(#sun-grad)"
          opacity="0.9"
          filter="url(#sun-glow)"
        />

        {/* Sun core */}
        <circle
          cx={sunX}
          cy={sunY}
          r={sunRadius * 0.6}
          fill={sunColor}
          opacity="0.7"
        />

        {/* Particles around sun */}
        {particles.map((particle) => (
          <circle
            key={`particle-${particle.index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={sunColor}
            opacity={particle.opacity}
          />
        ))}

        {/* Reflections on grid */}
        <g opacity="0.3">
          {gridLines
            .filter((line) => line.type === "horizontal" && line.y < horizon + 100)
            .map((line) => (
              <line
                key={`reflect-${line.index}`}
                x1={line.x}
                y1={horizon + (horizon - line.y)}
                x2={line.x + line.width}
                y2={horizon + (horizon - line.y)}
                stroke={sunColor}
                strokeWidth={1 * line.perspective}
                opacity={0.3 * line.perspective}
              />
            ))}
        </g>

        {/* Background mountains/landscape */}
        <g opacity="0.2">
          {Array.from({ length: 5 }, (_, i) => {
            const peakX = (width / 5) * (i + 0.5) + Math.sin(frame * 0.002 + i) * 30;
            const peakY = horizon - 50 - i * 15;
            const width1 = width / 4;

            return (
              <polygon
                key={`mountain-${i}`}
                points={`${peakX - width1},${horizon} ${peakX},${peakY} ${peakX + width1},${horizon}`}
                fill={sunColor}
                opacity={0.2}
              />
            );
          })}
        </g>

        {/* Vignette effect */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#vignette)"
        />
      </svg>

      <style>{`
        @keyframes synthwave-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

export const synthwaveSchema = z.object({
  horizon: z.number().default(540),
  gridSize: z.number().default(60),
  sunColor: z.string().default("#ff006e"),
  gridColor: z.string().default("#00ffff"),
  speed: z.number().default(2.0),
});
