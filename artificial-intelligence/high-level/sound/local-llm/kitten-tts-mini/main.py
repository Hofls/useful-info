import soundfile as sf
from kittentts import KittenTTS

def main():
    # Initialize the model
    # Note: This will download weights on the first run
    m = KittenTTS("KittenML/kitten-tts-mini-0.8")

    text = "This high quality TTS model works without a GPU"

    print(f"Generating audio for: '{text}'...")

    # Generate the audio array
    audio = m.generate(text, voice='Jasper')

    # Save the output
    output_file = 'output.wav'
    sf.write(output_file, audio, 24000)

    print(f"Done! Audio saved to {output_file}")

if __name__ == "__main__":
    main()