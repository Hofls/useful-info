from midiutil import MIDIFile
import random

midi = MIDIFile(1)
track = 0
time = 0
tempo = 140
midi.addTempo(track, time, tempo)

# === Drums (Channel 9 - Percussion) ===
drum_channel = 9

def add_phonk_beat(midi, track, start_time, repetitions=32):
    for i in range(repetitions):
        t = start_time + i * 4

        # Kick
        midi.addNote(track, drum_channel, 35, t, 0.8, 100)
        midi.addNote(track, drum_channel, 35, t + 2.5, 0.5, 90)

        # Snare
        midi.addNote(track, drum_channel, 38, t + 2, 0.6, 95)

        # Closed Hi-Hats
        for h in range(8):
            midi.addNote(track, drum_channel, 42, t + h*0.5, 0.3, 65 + random.randint(-10,15))

        # Open Hat
        if i % 2 == 0:
            midi.addNote(track, drum_channel, 46, t + 3.5, 0.7, 80)

        # Cowbell (Phonk essential!)
        midi.addNote(track, drum_channel, 56, t + 1, 0.4, 110)
        midi.addNote(track, drum_channel, 56, t + 3, 0.4, 105)

add_phonk_beat(midi, track, 0, 64)

# === Melody (Dark Phonk lead) ===
melody_channel = 0
midi.addProgramChange(track, melody_channel, 0, 81)  # Sawtooth lead

def add_melody(midi, track, channel, start_time):
    t = start_time
    for _ in range(16):  # 16 bars
        for offset in [0, 3, 7, 12, 7, 3, 0, -5]:
            pitch = 45 + offset
            dur = 1.5 if offset in [0, 7, 12] else 0.75
            midi.addNote(track, channel, pitch, t, dur, 88)
            t += 0.5

add_melody(midi, track, melody_channel, 0)

# === Sub Bass ===
bass_channel = 1
midi.addProgramChange(track, bass_channel, 0, 38)  # Synth Bass

def add_bass(midi, track, channel, start_time):
    t = start_time
    notes = [33, 33, 36, 33, 31, 33]
    for i in range(64):
        midi.addNote(track, channel, notes[i % len(notes)], t, 2.0, 105)
        t += 2.0

add_bass(midi, track, bass_channel, 0)

# Save the file
with open("memphis-phonk.mid", "wb") as f:
    midi.writeFile(f)

print("✅ memphis-phonk.mid generated!")