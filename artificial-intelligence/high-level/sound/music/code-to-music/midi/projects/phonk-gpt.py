from midiutil import MIDIFile
import random

# Create MIDI object (3 tracks: drums, bass, melody)
midi = MIDIFile(3)

tempo = 140  # phonk tempo
for track in range(3):
    midi.addTempo(track, 0, tempo)

# Track indices
DRUMS = 0
BASS = 1
MELODY = 2

channel = 0
volume = 100

# --- DRUMS (kick, snare, cowbell) ---
KICK = 36
SNARE = 38
COWBELL = 56

time = 0
length = 0.25

for bar in range(16):
    for step in range(16):
        t = bar * 4 + step * 0.25

        # Kick (phonk pattern)
        if step in [0, 7, 10]:
            midi.addNote(DRUMS, channel, KICK, t, length, 110)

        # Snare (on 2 and 4)
        if step in [4, 12]:
            midi.addNote(DRUMS, channel, SNARE, t, length, 100)

        # Cowbell (signature phonk rhythm)
        if step % 2 == 0:
            midi.addNote(DRUMS, channel, COWBELL, t, 0.1, 80)


# --- BASS (dark minor 808-style) ---
# A minor scale
scale = [33, 36, 38, 40, 43]  # low notes

for bar in range(16):
    root = random.choice(scale)

    # sustained note
    midi.addNote(BASS, channel, root, bar * 4, 2, 110)

    # bounce note
    midi.addNote(BASS, channel, root + 12, bar * 4 + 2, 0.5, 90)


# --- MELODY (lo-fi dark phonk lead) ---
melody_scale = [57, 60, 62, 64, 67]  # A minor higher octave

for bar in range(16):
    for step in range(4):
        if random.random() < 0.6:  # sparse melody
            note = random.choice(melody_scale)
            t = bar * 4 + step
            duration = random.choice([0.5, 1])
            midi.addNote(MELODY, channel, note, t, duration, 70)


# --- Save MIDI file ---
with open("memphis-phonk.mid", "wb") as f:
    midi.writeFile(f)

print("Generated memphis-phonk.mid")