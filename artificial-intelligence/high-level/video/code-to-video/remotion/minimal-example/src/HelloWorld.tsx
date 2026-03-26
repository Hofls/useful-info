import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 360], [0.1, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="bg-zinc-950 flex items-center justify-center">
      <div
        className="text-white text-8xl font-bold tracking-tighter"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        Hello world!
      </div>

    </AbsoluteFill>
  );
};