import { z } from "zod";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import React from "react";

export const ParticleExplosion: React.FC<{
  particleColor: string;
  coreColor: string;
  explosionScale: number;
  particleCount: number;
}> = ({ particleColor, coreColor, explosionScale, particleCount }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const explosionProgress = Math.min(frame / 180, 1);
  const explosionEase = 1 - Math.pow(1 - explosionProgress, 2);

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = 5 + Math.random() * 8;
    const distance = velocity * frame * explosionScale * explosionEase;

    const wobble = Math.sin(frame * 0.1 + i) * 10;
    const wobbleY = Math.cos(frame * 0.08 + i) * 10;

    const x =
      width / 2 +
      Math.cos(angle) * distance +
      wobble;
    const y =
      height / 2 +
      Math.sin(angle) * distance +
      wobbleY;

    const size = (Math.random() + 0.5) * 4;
    const opacity = Math.max(0, 1 - explosionProgress * 1.5);
    const rotation = (frame * 5 + i * 10) % 360;

    return {
      x,
      y,
      size,
      opacity,
      rotation,
      angle,
      distance,
      index: i,
    };
  });

  const coreSize = 40 + explosionEase * 100;
  const coreOpacity = 1 - explosionProgress * 0.8;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle, #1a0033 0%, #0a0e27 100%)`,
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
          {/* Core glow */}
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={coreColor} stopOpacity="1" />
            <stop offset="50%" stopColor={particleColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={coreColor} stopOpacity="0" />
          </radialGradient>

          {/* Particle gradient */}
          <linearGradient id="particle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={particleColor} stopOpacity="1" />
            <stop offset="100%" stopColor={coreColor} stopOpacity="0.6" />
          </linearGradient>

          {/* Explosion blur */}
          <filter id="explosion-blur">
            <feGaussianBlur
              stdDeviation={explosionProgress * 5}
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Particle glow */}
          <filter id="particle-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial blur */}
          <filter id="radial-blur">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.5 + explosionProgress * 0.5}
              numOctaves={3}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={explosionProgress * 20}
            />
          </filter>
        </defs>

        {/* Background shockwave rings */}
        {Array.from({ length: 5 }, (_, i) => {
          const ringProgress = explosionProgress - i * 0.15;
          const ringOpacity = Math.max(
            0,
            0.8 - ringProgress * 0.8
          );
          const ringRadius = ringProgress * 300 * explosionScale;

          return (
            <circle
              key={`ring-${i}`}
              cx={width / 2}
              cy={height / 2}
              r={ringRadius}
              fill="none"
              stroke={particleColor}
              strokeWidth={2}
              opacity={ringOpacity}
            />
          );
        })}

        {/* Explosion rays */}
        {Array.from({ length: 20 }, (_, i) => {
          const rayAngle = (i / 20) * Math.PI * 2;
          const rayLength = explosionEase * 400 * explosionScale;
          const rayOpacity = Math.max(0, 1 - explosionProgress);

          return (
            <line
              key={`ray-${i}`}
              x1={width / 2}
              y1={height / 2}
              x2={
                width / 2 +
                Math.cos(rayAngle) * rayLength
              }
              y2={
                height / 2 +
                Math.sin(rayAngle) * rayLength
              }
              stroke={
                i % 2 === 0 ? particleColor : coreColor
              }
              strokeWidth={2 + explosionProgress * 3}
              opacity={rayOpacity * 0.6}
            />
          );
        })}

        {/* Particles */}
        {particles.map((particle) => (
          <g key={particle.index}>
            {/* Particle trail */}
            <line
              x1={width / 2}
              y1={height / 2}
              x2={particle.x}
              y2={particle.y}
              stroke={particleColor}
              strokeWidth={particle.size * 0.3}
              opacity={particle.opacity * 0.3}
            />

            {/* Particle orb */}
            <circle
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={
                particle.index % 2 === 0
                  ? particleColor
                  : coreColor
              }
              opacity={particle.opacity}
              filter="url(#particle-glow)"
            />

            {/* Particle shine */}
            <circle
              cx={particle.x - particle.size * 0.3}
              cy={particle.y - particle.size * 0.3}
              r={particle.size * 0.4}
              fill="white"
              opacity={particle.opacity * 0.4}
            />
          </g>
        ))}

        {/* Core explosion center */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={coreSize}
          fill="url(#core-glow)"
          opacity={coreOpacity}
          filter="url(#explosion-blur)"
        />

        {/* Core inner light */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={coreSize * 0.4}
          fill={coreColor}
          opacity={coreOpacity * 0.8}
          filter="url(#particle-glow)"
        />

        {/* Shattered fragments */}
        {Array.from({ length: 30 }, (_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const distance = explosionEase * 200 * explosionScale;
          const fragmentSize = Math.random() * 6 + 2;
          const x = width / 2 + Math.cos(angle) * distance;
          const y = height / 2 + Math.sin(angle) * distance;
          const fragOpacity =
            Math.max(0, 1 - explosionProgress * 1.2) *
            (0.5 + Math.random() * 0.5);

          return (
            <polygon
              key={`fragment-${i}`}
              points={Array.from({ length: 4 }, (_, j) => {
                const a = (j / 4) * Math.PI * 2 + angle;
                return `${Math.cos(a) * fragmentSize},${Math.sin(a) * fragmentSize}`;
              }).join(" ")}
              transform={`translate(${x}, ${y}) rotate(${(frame * 10 + i * 30) % 360})`}
              fill={
                i % 2 === 0 ? particleColor : coreColor
              }
              opacity={fragOpacity}
            />
          );
        })}
      </svg>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

export const particleSchema = z.object({
  particleColor: z.string().default("#ff00ff"),
  coreColor: z.string().default("#00ffff"),
  explosionScale: z.number().default(1.0),
  particleCount: z.number().default(150),
});
