import torch
from tqdm.auto import tqdm

from point_e.diffusion.configs import DIFFUSION_CONFIGS, diffusion_from_config
from point_e.diffusion.sampler import PointCloudSampler
from point_e.models.download import load_checkpoint
from point_e.models.configs import MODEL_CONFIGS, model_from_config
from point_e.util.pc_to_mesh import marching_cubes_mesh

def main():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    # 1. Load the Point Cloud Model (Smallest version)
    print("Loading Point Cloud model...")
    base_name = 'base40M-textvec'
    base_model = model_from_config(MODEL_CONFIGS[base_name], device)
    base_model.load_state_dict(load_checkpoint(base_name, device))
    base_diffusion = diffusion_from_config(DIFFUSION_CONFIGS[base_name])

    # 2. Load the SDF Mesh Model (The "Converter")
    print("Loading Mesh (SDF) model...")
    sdf_name = 'sdf'
    sdf_model = model_from_config(MODEL_CONFIGS[sdf_name], device)
    sdf_model.load_state_dict(load_checkpoint(sdf_name, device))

    sampler = PointCloudSampler(
        device=device,
        models=[base_model],
        diffusions=[base_diffusion],
        num_points=[1024],
        aux_channels=['R', 'G', 'B'],
        guidance_scale=[10.0],
        use_karras=[True],
        karras_steps=[64],
        sigma_min=[0.002],
        sigma_max=[80.0],
        clip_denoised=[True],
        s_churn=[0.0]
    )
    # 3. Generate the Point Cloud
    prompt = "A sphere"
    print(f"Generating points for: {prompt}...")
    samples = None
    for x in tqdm(sampler.sample_batch_progressive(batch_size=1, model_kwargs=dict(texts=[prompt]))):
        samples = x

    pc = sampler.output_to_point_clouds(samples)[0]

    # 4. Convert Point Cloud to Mesh
    print("Converting points to mesh (Marching Cubes)...")
    mesh = marching_cubes_mesh(
        pc=pc,
        model=sdf_model,
        batch_size=4096,
        grid_size=128,
        progress=True,
    )

    # 5. Export for Blender
    with open("output_model.ply", "wb") as f: # Note 'wb' for binary
        mesh.write_ply(f)

    print("\nSuccess! 'output_model.ply' is ready for Blender.")

if __name__ == "__main__":
    main()