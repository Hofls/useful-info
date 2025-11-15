### ComfyUI
* Getting started:
  * Menu -> Browse Templates -> Lora
  * Download custom models, select them in nodes (Load Checkpoint / Load LoRa)
* Terminology:
  * Checkpoint - stable diffusion model, used to generate images
  * LoRA - lightweight adapter that tweaks checkpoint (improves quality, adds specific style or character)
* Common tips:
  * Models for inpaint/outpaint should have "inpaint" in their name! Regular models can't do it
  * LoRA greatly improves image quality or can be used to consistently generate same character (model fine-tuning)
  * Use fixed seeds to see effects of different options/LoRAs
  * Accidentally closed a tab? Look at C:\Users\Hofls\Documents\ComfyUI\user\default\workflows
* Where to find LoRA:
  * https://civitai.com/tag/lora
  * Put them in C:\Users\Hofls\Documents\ComfyUI\models\loras
* Where to find Checkpoints:
  * https://civitai.com/tag/checkpoint
  * Put them in C:\Users\Hofls\Documents\ComfyUI\models\checkpoints
