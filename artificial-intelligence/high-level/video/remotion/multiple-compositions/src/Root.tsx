import "./index.css";
import { Composition } from "remotion";
import {
  NeonPulseVisualizer,
  neuroPulseSchema,
} from "./compositions/NeonPulseVisualizer";
import {
  GlitchTunnelEffect,
  glitchTunnelSchema,
} from "./compositions/GlitchTunnelEffect";
import {
  GeometricMorphism,
  geometricSchema,
} from "./compositions/GeometricMorphism";
import {
  FluidTypography,
  fluidTypoSchema,
} from "./compositions/FluidTypography";
import {
  ParticleExplosion,
  particleSchema,
} from "./compositions/ParticleExplosion";
import {
  SynthwaveOdyssey,
  synthwaveSchema,
} from "./compositions/SynthwaveOdyssey";

import { 
  CosmicResonance, 
  cosmicSchema 
} from "./compositions/CosmicResonance";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* COMPOSITION 1: Neon Pulse Visualizer */}
      <Composition
        id="NeonPulse"
        component={NeonPulseVisualizer}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        schema={neuroPulseSchema}
        defaultProps={{
          primaryColor: "#00ff88",
          secondaryColor: "#ff00ff",
          accentColor: "#00ffff",
          beatIntensity: 1.2,
          pulseSpeed: 0.8,
        }}
      />

      {/* COMPOSITION 2: Glitch Tunnel Effect */}
      <Composition
        id="GlitchTunnel"
        component={GlitchTunnelEffect}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        schema={glitchTunnelSchema}
        defaultProps={{
          colorA: "#ff006e",
          colorB: "#00d9ff",
          colorC: "#ffbe0b",
          glitchIntensity: 0.7,
          depthSpeed: 1.5,
        }}
      />

      {/* COMPOSITION 3: Geometric Morphism */}
      <Composition
        id="GeometricMorphism"
        component={GeometricMorphism}
        durationInFrames={360}
        fps={60}
        width={1920}
        height={1080}
        schema={geometricSchema}
        defaultProps={{
          color1: "#a8edea",
          color2: "#fed6e3",
          color3: "#ff9ff3",
          rotationSpeed: 0.5,
          morphSpeed: 1.0,
          shapeCount: 7,
        }}
      />

      {/* COMPOSITION 4: Fluid Typography */}
      <Composition
        id="FluidTypo"
        component={FluidTypography}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        schema={fluidTypoSchema}
        defaultProps={{
          text: "REMOTION",
          textColor: "#fff",
          bgColor: "#0a0e27",
          fluidIntensity: 1.0,
          fontSize: 200,
        }}
      />

      {/* COMPOSITION 5: Particle Explosion */}
      <Composition
        id="ParticleExplosion"
        component={ParticleExplosion}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
        schema={particleSchema}
        defaultProps={{
          particleColor: "#ff00ff",
          coreColor: "#00ffff",
          explosionScale: 1.0,
          particleCount: 150,
        }}
      />

      {/* COMPOSITION 6: Synthwave Odyssey */}
      <Composition
        id="SynthwaveOdyssey"
        component={SynthwaveOdyssey}
        durationInFrames={360}
        fps={60}
        width={1920}
        height={1080}
        schema={synthwaveSchema}
        defaultProps={{
          horizon: 540,
          gridSize: 60,
          sunColor: "#ff006e",
          gridColor: "#00ffff",
          speed: 2.0,
        }}
      />
	  
	   <Composition
        id="CosmicResonance"
        component={CosmicResonance}
        durationInFrames={300} // 10 seconds of art
        fps={30}
        width={1920}
        height={1080}
        schema={cosmicSchema}
        defaultProps={{
          titleText: "AETHERIS",
          primaryColor: "#00f2fe",
          secondaryColor: "#4facfe",
          particleCount: 40,
        }}
      />
	  

	  
    </>
  );
};
