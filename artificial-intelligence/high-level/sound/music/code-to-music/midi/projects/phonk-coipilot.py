# pip install midiutil
from midiutil import MIDIFile

filename = "memphis-phonk.mid"

track_drums = 0
track_bass  = 1
track_chord = 2
channel_drums = 9   # standard drum channel
channel_bass  = 1
channel_chord = 2

tempo = 90  # BPM, slow & heavy
mf = MIDIFile(3)
mf.addTempo(track_drums, 0, tempo)
mf.addTempo(track_bass,  0, tempo)
mf.addTempo(track_chord, 0, tempo)

# Basic helpers
def add_note(track, channel, pitch, start, dur, vel):
    mf.addNote(track, channel, pitch, start, dur, vel)

bars = 8
beats_per_bar = 4

# DRUMS: kick, snare, swung hats
kick = 36
snare = 38
hat_closed = 42

for bar in range(bars):
    base = bar * beats_per_bar

    # Kicks (simple but heavy)
    add_note(track_drums, channel_drums, kick, base + 0.0, 0.1, 110)
    add_note(track_drums, channel_drums, kick, base + 1.5, 0.1, 115)
    add_note(track_drums, channel_drums, kick, base + 3.0, 0.1, 110)

    # Snares on 2 and 4
    add_note(track_drums, channel_drums, snare, base + 1.0, 0.1, 120)
    add_note(track_drums, channel_drums, snare, base + 3.0, 0.1, 120)

    # Swung hats: off‑grid feel
    step = 0.5
    for i in range(8):
        t = base + i * step
        # swing every second hat slightly late
        if i % 2 == 1:
            t += 0.08
        vel = 70 if i % 4 else 90
        add_note(track_drums, channel_drums, hat_closed, t, 0.1, vel)

# BASS: dark 808 pattern (A minor-ish)
# Use low A, G, F, E
A = 45
G = 43
F = 41
E = 40
bass_pattern = [A, A, G, F, A, A, G, E]

for bar in range(bars):
    base = bar * beats_per_bar
    pitch = bass_pattern[bar % len(bass_pattern)]
    # Long 808 note with slight stutters
    add_note(track_bass, channel_bass, pitch, base + 0.0, 1.5, 110)
    add_note(track_bass, channel_bass, pitch, base + 1.75, 0.25, 105)
    add_note(track_bass, channel_bass, pitch, base + 2.5, 1.0, 100)

# CHORDS: eerie, lo‑fi style (A minor cluster)
# Chord: A minor with added 9 and 11: A (57), C (60), E (64), B (59), D (62)
chord = [57, 60, 64, 59, 62]

for bar in range(0, bars, 2):
    base = bar * beats_per_bar
    for p in chord:
        add_note(track_chord, channel_chord, p, base + 0.0, beats_per_bar * 2, 70)

# Write file
with open(filename, "wb") as f:
    mf.writeFile(f)

print(f"Saved {filename}")
