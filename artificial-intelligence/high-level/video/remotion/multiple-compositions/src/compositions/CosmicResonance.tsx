import React from 'react';
import { 
  AbsoluteFill, 
  interpolate, 
  spring, 
  useCurrentFrame, 
  useVideoConfig, 
  Easing 
} from 'remotion';
import { z } from 'zod';

export const cosmicSchema = z.object({
  titleText: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  particleCount: z.number(),
});

export const CosmicResonance: React.FC<z.infer<typeof cosmicSchema>> = ({
  titleText,
  primaryColor,
  secondaryColor,
  particleCount,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Entrance Spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // 2. Infinite Rotation Logic
  const rotation = interpolate(frame, [0, 300], [0, 360]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      {/* Background Gradient Pulse */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at center, ${primaryColor}22 0%, transparent 70%)`,
        opacity: interpolate(frame, [0, 50, 100], [0, 1, 0.5]),
      }} />

      {/* The Particle Field */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const seed = i * 123.45;
        const randomX = (Math.sin(seed) * 0.5 + 0.5) * width;
        const randomY = (Math.cos(seed) * 0.5 + 0.5) * height;
        
        const moveY = interpolate(
          frame, 
          [0, 300], 
          [randomY, randomY - 200], 
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: randomX,
              top: moveY,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
              boxShadow: `0 0 15px ${primaryColor}`,
              opacity: interpolate(frame, [0, 20], [0, 0.6]),
            }}
          />
        );
      })}

      {/* Stylized Typography */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          transform: `scale(${entrance}) rotate(${rotation * 0.05}deg)`,
          filter: `blur(${interpolate(frame, [0, 20], [20, 0])}px)`,
        }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 180,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '20px',
            textShadow: `0 0 40px ${primaryColor}88`,
            margin: 0,
            background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {titleText}
          </h1>
          
          {/* Glassmorphic Underlying Bar */}
          <div style={{
            height: 10,
            width: interpolate(frame, [20, 80], [0, 600], { easing: Easing.bezier(0.16, 1, 0.3, 1) }),
            background: 'white',
            margin: '0 auto',
            borderRadius: 5,
            opacity: 0.8,
            boxShadow: `0 0 20px white`,
          }} />
        </div>
      </AbsoluteFill>

      {/* Vignette Overlay */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        boxShadow: 'inset 0 0 300px black',
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  );
};