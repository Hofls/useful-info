import tkinter as tk
from kittentts import KittenTTS
import sounddevice as sd

# Initialize model once
m = KittenTTS("KittenML/kitten-tts-mini-0.8")

def play_audio():
    text = text_input.get("1.0", tk.END).strip()
    if text:
        btn.config(state="disabled", text="Generating...")
        root.update()

        audio = m.generate(text, voice='Jasper')
        sd.play(audio, 24000)

        btn.config(state="normal", text="Generate & Play")

# UI Setup
root = tk.Tk()
root.title("KittenTTS Mini")
root.geometry("1000x350")

text_input = tk.Text(root, height=15, width=150)
text_input.pack(pady=10, padx=10)
text_input.insert("1.0", "Type something here...")

btn = tk.Button(root, text="Generate & Play", command=play_audio)
btn.pack(pady=5)

root.mainloop()