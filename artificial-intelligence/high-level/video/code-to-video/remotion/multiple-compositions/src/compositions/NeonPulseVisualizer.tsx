import { z } from "zod";
import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  staticFile,
} from "remotion";
import React from "react";

const colorGradients = (
  c1: string,
  c2: string,
  c3: string,
  progress: number
) => `
  <defs>
    <radialGradient id="pulse-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="${c1}" stopOpacity="1" />
      <stop offset="50%" stopColor="${c2}" stopOpacity="0.6" />
      <stop offset="100%" stopColor="${c3}" stopOpacity="0.1" />
    </radialGradient>
    <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="${c1}" />
      <stop offset="50%" stopColor="${c2}" />
      <stop offset="100%" stopColor="${c3}" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="${3 + Math.sin(progress) * 2}" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
`;

export const NeonPulseVisualizer: React.FC<{
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  beatIntensity: number;
  pulseSpeed: number;
}> = ({
  primaryColor,
  secondaryColor,
  accentColor,
  beatIntensity,
  pulseSpeed,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const progress = (frame / 240) * Math.PI * 2 * pulseSpeed;
  const pulse = Math.sin(progress) * beatIntensity;
  const beat = Math.abs(Math.sin(frame * 0.1)) * beatIntensity;

  const circles = Array.from({ length: 5 }, (_, i) => {
    const radius = 100 + i * 80 + pulse * 30;
    const opacity = Math.max(0, 1 - i * 0.2 - Math.abs(pulse) * 0.3);
    return { radius, opacity, delay: i * 0.3 };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0e27 0%, #1a0033 50%, #0a0e27 100%)`,
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
          <radialGradient
            id="center-glow"
            cx="50%"
            cy="50%"
            r={`${50 + pulse * 20}%`}
          >
            <stop
              offset="0%"
              stopColor={primaryColor}
              stopOpacity={1 + pulse * 0.2}
            />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity={0.5} />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
          <filter id="blur-glow">
            <feGaussianBlur
              stdDeviation={5 + beat * 10}
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center glow circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={80 + pulse * 30}
          fill="url(#center-glow)"
          opacity={0.8 + pulse * 0.2}
          filter="url(#blur-glow)"
        />

        {/* Pulsing rings */}
        {circles.map((circle, i) => (
          <circle
            key={i}
            cx={width / 2}
            cy={height / 2}
            r={circle.radius}
            fill="none"
            stroke={i % 2 === 0 ? primaryColor : secondaryColor}
            strokeWidth={3}
            opacity={circle.opacity}
            filter="url(#neon-glow)"
            style={{
              animation: `pulse-ring ${2 / pulseSpeed}s ease-in-out infinite`,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}

        {/* Rotating lines */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2 + progress;
          const x1 = width / 2 + Math.cos(angle) * 100;
          const y1 = height / 2 + Math.sin(angle) * 100;
          const x2 = width / 2 + Math.cos(angle) * 300;
          const y2 = height / 2 + Math.sin(angle) * 300;
          return (
            <line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 3 === 0 ? primaryColor : accentColor}
              strokeWidth={2}
              opacity={0.5 + Math.sin(progress + i) * 0.3}
              filter="url(#neon-glow)"
            />
          );
        })}

        {/* Orbiting particles */}
        {Array.from({ length: 30 }, (_, i) => {
          const angle = (i / 30) * Math.PI * 2 + progress * 0.5;
          const radius = 200 + Math.sin(frame * 0.02 + i) * 50;
          const x = width / 2 + Math.cos(angle) * radius;
          const y = height / 2 + Math.sin(angle) * radius;
          return (
            <circle
              key={`particle-${i}`}
              cx={x}
              cy={y}
              r={2 + Math.abs(Math.sin(frame * 0.03 + i)) * 2}
              fill={
                i % 3 === 0
                  ? primaryColor
                  : i % 3 === 1
                    ? secondaryColor
                    : accentColor
              }
              opacity={0.6 + Math.sin(frame * 0.02 + i) * 0.4}
              filter="url(#neon-glow)"
            />
          );
        })}
      </svg>

      <style>{`
        @keyframes pulse-ring {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

export const neuroPulseSchema = z.object({
  primaryColor: z.string().default("#00ff88"),
  secondaryColor: z.string().default("#ff00ff"),
  accentColor: z.string().default("#00ffff"),
  beatIntensity: z.number().default(1.2),
  pulseSpeed: z.number().default(0.8),
});
