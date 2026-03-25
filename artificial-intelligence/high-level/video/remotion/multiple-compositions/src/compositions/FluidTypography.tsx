import { z } from "zod";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import React from "react";

export const FluidTypography: React.FC<{
  text: string;
  textColor: string;
  bgColor: string;
  fluidIntensity: number;
  fontSize: number;
}> = ({ text, textColor, bgColor, fluidIntensity, fontSize }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const renderWaveText = () => {
    const letters = text.split("");
    const totalWidth = letters.length * fontSize * 0.4;
    const startX = (width - totalWidth) / 2;

    return letters.map((letter, idx) => {
      const waveOffset =
        Math.sin(frame * 0.05 + idx * 0.5) * fluidIntensity * 30;
      const skewOffset =
        Math.sin(frame * 0.04 + idx * 0.3) * fluidIntensity * 5;
      const scaleOffset =
        1 + Math.sin(frame * 0.06 + idx * 0.4) * fluidIntensity * 0.2;
      const rotationOffset =
        Math.sin(frame * 0.03 + idx * 0.2) * fluidIntensity * 10;
      const opacityOffset =
        0.7 + Math.cos(frame * 0.05 + idx * 0.3) * 0.3;

      const x = startX + idx * fontSize * 0.4;
      const y = height / 2 + waveOffset;

      return {
        letter,
        x,
        y,
        skew: skewOffset,
        scale: scaleOffset,
        rotation: rotationOffset,
        opacity: opacityOffset,
        index: idx,
      };
    });
  };

  const letters = renderWaveText();
  const distortionPhase = frame * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: bgColor,
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
        style={{
          position: "absolute",
          filter: `url(#fluid-distortion)`,
        }}
      >
        <defs>
          {/* Fluid distortion filter */}
          <filter id="fluid-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.01}
              numOctaves={5}
              result="noise"
              seed={Math.floor(distortionPhase)}
              animated="true"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={fluidIntensity * 15}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Glow filter */}
          <filter id="text-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Text shadow filter */}
          <filter id="text-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx={Math.sin(distortionPhase) * 5} dy={Math.cos(distortionPhase) * 5} result="offsetblur" />
            <feFlood floodColor={textColor} floodOpacity="0.3" result="flood" />
            <feComposite in="flood" in2="offsetblur" operator="in" result="shadow" />
            <feComposite in="shadow" in2="SourceGraphic" operator="over" />
          </filter>

          {/* Gradient */}
          <linearGradient
            id="text-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={textColor} stopOpacity="1" />
            <stop offset="50%" stopColor={textColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={textColor} stopOpacity="1" />
          </linearGradient>

          {/* Polygon clipping */}
          <clipPath id="text-clip">
            <polygon
              points={Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2 + distortionPhase;
                const r = 500 + Math.sin(distortionPhase + i) * 100;
                return `${width / 2 + Math.cos(angle) * r},${height / 2 + Math.sin(angle) * r}`;
              }).join(" ")}
            />
          </clipPath>
        </defs>

        {/* Background animated elements */}
        <g opacity="0.05">
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i / 20) * Math.PI * 2 + distortionPhase;
            const radius = 300 + Math.sin(distortionPhase + i * 0.5) * 100;
            return (
              <circle
                key={`bg-${i}`}
                cx={width / 2 + Math.cos(angle) * radius}
                cy={height / 2 + Math.sin(angle) * radius}
                r={50}
                fill={textColor}
                opacity={Math.abs(Math.sin(distortionPhase + i))}
              />
            );
          })}
        </g>

        {/* Main text with wave effect */}
        <g filter="url(#text-shadow)">
          {letters.map((letterData) => (
            <text
              key={letterData.index}
              x={letterData.x}
              y={letterData.y}
              fontSize={fontSize}
              fontWeight="900"
              fontFamily="Arial, sans-serif"
              fill="url(#text-gradient)"
              opacity={letterData.opacity}
              transform={`
                translate(0, 0)
                scale(${letterData.scale})
                skewX(${letterData.skew})
                rotate(${letterData.rotation} ${letterData.x} ${letterData.y})
              `}
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#text-glow)"
              style={{
                letterSpacing: "2px",
              }}
            >
              {letterData.letter}
            </text>
          ))}
        </g>

        {/* Surrounding aura */}
        {letters.map((letterData) => (
          <circle
            key={`aura-${letterData.index}`}
            cx={letterData.x}
            cy={letterData.y}
            r={fontSize * 0.3}
            fill="none"
            stroke={textColor}
            strokeWidth="1"
            opacity={letterData.opacity * 0.3}
          />
        ))}

        {/* Flowing particles */}
        {Array.from({ length: 30 }, (_, i) => {
          const angle = (i / 30) * Math.PI * 2 + distortionPhase;
          const distance = 200 + Math.sin(distortionPhase + i * 0.2) * 100;
          const x = width / 2 + Math.cos(angle) * distance;
          const y = height / 2 + Math.sin(angle) * distance;
          const size = Math.abs(Math.sin(distortionPhase + i * 0.3)) * 3 + 1;

          return (
            <circle
              key={`particle-${i}`}
              cx={x}
              cy={y}
              r={size}
              fill={textColor}
              opacity={Math.abs(Math.sin(distortionPhase + i)) * 0.5}
            />
          );
        })}
      </svg>

      <style>{`
        @keyframes fluid-pulse {
          0%, 100% { filter: blur(0px); }
          50% { filter: blur(2px); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

export const fluidTypoSchema = z.object({
  text: z.string().default("REMOTION"),
  textColor: z.string().default("#fff"),
  bgColor: z.string().default("#0a0e27"),
  fluidIntensity: z.number().default(1.0),
  fontSize: z.number().default(200),
});
