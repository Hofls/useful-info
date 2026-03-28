from midiutil import MIDIFile
import random

# Techno MIDI Generator
# Repetitive patterns, hypnotic sequences, and minimal elements

# MIDI setup
track = 0
channel = 0
time = 0  # In beats
tempo = 128  # BPM
volume = 100

midi = MIDIFile(4)  # 4 tracks
midi.addTempo(track, time, tempo)
midi.addTempo(1, time, tempo)
midi.addTempo(2, time, tempo)
midi.addTempo(3, time, tempo)

# Scale: A minor (for dark techno vibe)
a_minor = [57, 59, 60, 62, 64, 65, 67, 69]  # A3 to A4

# Track 0: Bass (Channel 0) - Roland TB-303 style acid bass
bass_channel = 0
bass_notes = [45, 45, 48, 45, 43, 45, 40, 45]  # Dark bassline pattern
for i, note in enumerate(bass_notes * 8):  # Repeat 8 bars
    midi.addNote(0, bass_channel, note, i * 0.5, 0.45, 110)

# Track 1: Kick Drum (Channel 9 - Drums)
kick_channel = 9
for bar in range(8):
    for beat in range(4):
        midi.addNote(1, kick_channel, 36, bar * 4 + beat, 0.5, 120)  # Bass drum on every beat

# Track 2: Hi-hats (Channel 9)
hat_channel = 9
for bar in range(8):
    for i in range(8):
        midi.addNote(2, hat_channel, 42, bar * 4 + i * 0.5, 0.1, 80)  # Closed hi-hat 8th notes
    for i in range(4):
        midi.addNote(2, hat_channel, 46, bar * 4 + i + 0.5, 0.1, 70)  # Open hi-hat on off-beats

# Track 3: Synth Stabs (Channel 1)
synth_channel = 1
chord_progression = [
    [57, 60, 64],  # Am
    [55, 59, 62],  # G
    [53, 57, 60],  # F
    [55, 59, 62],  # G
]
for bar in range(8):
    chord = chord_progression[bar % 4]
    for note in chord:
        midi.addNote(3, synth_channel, note, bar * 4, 2.0, 90)
        midi.addNote(3, synth_channel, note, bar * 4 + 2, 2.0, 90)

# Add some random techno bleeps on track 3
random.seed(42)
for _ in range(16):
    note = random.choice([72, 74, 76, 79, 81])
    start = random.uniform(0, 32)
    duration = random.choice([0.25, 0.5])
    midi.addNote(3, synth_channel, note, start, duration, 80)

# Write to file
with open("techno_track.mid", "wb") as output_file:
    midi.writeFile(output_file)

print("Generated: techno_track.mid")