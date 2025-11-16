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
  * To understand what node (e.g. lora) does - use fixed seed in KSampler, generate with and without node (deactivate/bypass it)
  * Accidentally closed a tab? Look at C:\Users\Hofls\Documents\ComfyUI\user\default\workflows
* Where to find LoRA:
  * https://civitai.com/tag/lora
  * Put them in C:\Users\Hofls\Documents\ComfyUI\models\loras
* Where to find Checkpoints:
  * https://civitai.com/tag/checkpoint
  * Put them in C:\Users\Hofls\Documents\ComfyUI\models\checkpoints
* Where to find Workflows:
  * https://civitai.com/search/models?modelType=Workflows&sortBy=models_v9&query=workflow
  * Drag & drop them into ComfyUI

### Custom workflow
* Getting started (custom checkpoints/lora):
  * Download simple workflow - https://civitai.com/models/255121/workflow-lora
  * ComfyUI -> New / + -> Drag & drop .json file
  * Run -> Get a lot of errors:
    * Not found `chilloutmix_NiPrunedFp32Fix_2.safetensors`
    * Not found `idol LeeSungKyung.safetensors`
    * Not found `Model weight_slider_v2.safetensors`
  * Find them on the internet, download and copy into their respective folders
  * Or use your own Models/LoRA instead
* Getting started (custom nodes/extensions)
  * Download simple workflow - https://github.com/pwillia7/Basic_ComfyUI_Workflows/blob/main/Basic/WorkflowJsons/controlnet.json
  * ComfyUI -> New / + -> Drag & drop .json file
  * ComfyUI -> Manager -> Custom Nodes in Workflow -> Select all -> Install -> Restart
  * Sometimes it doesn't work (e.g. KSampler - Inspire), so you have to find package manually via manager (ComfyUI Inspire Pack)
* Examples:
  * https://github.com/pwillia7/Basic_ComfyUI_Workflows/tree/main/Basic/WorkflowJsons
  * `examples/controlnet.json` - generate new variation of image (converts image to black&white edges, gives it to model as input)
  * `examples/upscale-highres.json` - generate low resolution image, then upscale it to high resolution
  * `examples/img2img-noise.json` - generate new variation of image (applies noise to the image, then model restores it)
    * Hint - remove useless EZLoadImgFromUrlNode
  * 
