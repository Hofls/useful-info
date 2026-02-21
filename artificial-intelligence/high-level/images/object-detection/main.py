import torch
from transformers import AutoImageProcessor, AutoModelForObjectDetection
from PIL import Image, ImageDraw
import requests

def download_and_detect_all(image_url: str):
    checkpoint = "hustvl/yolos-tiny"

    print(f"Loading model: {checkpoint}...")
    processor = AutoImageProcessor.from_pretrained(checkpoint)
    model = AutoModelForObjectDetection.from_pretrained(checkpoint)

    # Download image
    print(f"Downloading image...")
    response = requests.get(image_url, stream=True)
    image = Image.open(response.raw).convert("RGB")
    draw = ImageDraw.Draw(image)

    # Inference - Corrected context manager here:
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)

    # Post-process results
    target_sizes = torch.tensor([image.size[::-1]])
    results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.5)[0]

    print(f"\n--- Detection Results ---")
    for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
        label_name = model.config.id2label[label.item()]
        confidence = round(score.item(), 3)
        xmin, ymin, xmax, ymax = box.tolist()

        print(f"Detected: {label_name:10} | Confidence: {confidence:.3f}")

        # Draw the rectangle
        draw.rectangle([xmin, ymin, xmax, ymax], outline="lime", width=3)
        draw.text((xmin, max(0, ymin - 15)), f"{label_name} {confidence}", fill="lime")

    image.save("detected_objects.jpg")
    print(f"\nSuccess! Saved results to 'detected_objects.jpg'")

if __name__ == "__main__":
    url = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/cats.png"
    download_and_detect_all(url)