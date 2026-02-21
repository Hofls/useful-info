import torch
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
from diffusers.utils import export_to_video

# 1. Setup Model (Zeroscope v2 is optimized for low-res/small size)
model_id = "cerspense/zeroscope_v2_576w"

print(f"Loading model: {model_id}...")
pipe = DiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16
)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

# 2. Optimization for low VRAM/Disk
# This enables sequential CPU offloading to save memory
pipe.enable_model_cpu_offload()

# 3. Generate Video
prompt = "A small robot dancing in a field of sunflowers, cinematic lighting"
print(f"Generating video for prompt: '{prompt}'...")

# Using lower frame count and resolution to keep it fast/tiny
video_frames = pipe(
    prompt,
    num_inference_steps=20,
    height=320,
    width=576,
    num_frames=16
).frames[0]

# 4. Export
output_path = "output_video.mp4"
export_to_video(video_frames, output_path)
print(f"Success! Video saved to {output_path}")