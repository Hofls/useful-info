# Chiptune / 8-bit MIDI Generator using midiutil
# Classic retro game vibes with square/pulse wave patterns

from midiutil import MIDIFile
track = 0
channel = 0
time = 0
tempo = 150
volume = 100

midi = MIDIFile(4)  # 4 tracks
midi.addTempo(track, time, tempo)

# Track 0: Lead melody (square wave style)
# Track 1: Bass line
# Track 2: Arpeggios
# Track 3: Drums

# === LEAD MELODY (Track 0) ===
lead_notes = [
    # Main theme - classic 8-bit ascending pattern
    (72, 0, 0.5), (74, 0.5, 0.5), (76, 1.0, 0.5), (79, 1.5, 1.0),
    (76, 2.5, 0.5), (74, 3.0, 0.5), (72, 3.5, 1.0),
    # Second phrase
    (74, 4.5, 0.5), (76, 5.0, 0.5), (77, 5.5, 0.5), (81, 6.0, 1.0),
    (77, 7.0, 0.5), (76, 7.5, 0.5), (74, 8.0, 1.0),
    # Bridge with jump effect
    (79, 9.0, 0.25), (81, 9.25, 0.25), (84, 9.5, 0.5), (84, 10.0, 0.5),
    (83, 10.5, 0.25), (81, 10.75, 0.25), (79, 11.0, 0.5), (77, 11.5, 0.5),
    # Resolution
    (76, 12.0, 0.5), (74, 12.5, 0.5), (72, 13.0, 2.0),
    # Repeat with variation
    (72, 15.0, 0.5), (74, 15.5, 0.5), (76, 16.0, 0.5), (79, 16.5, 1.0),
    (81, 17.5, 0.5), (84, 18.0, 0.5), (86, 18.5, 1.0),
    (84, 19.5, 0.5), (81, 20.0, 0.5), (79, 20.5, 2.0),
]

for pitch, start, duration in lead_notes:
    midi.addNote(0, 0, pitch, start, duration, volume)

# === BASS LINE (Track 1) ===
bass_notes = [
    # Root notes following the harmony
    (48, 0, 1.0), (48, 1.0, 1.0),  # C
    (45, 2.0, 1.0), (45, 3.0, 1.0),  # A
    (43, 4.0, 1.0), (43, 5.0, 1.0),  # G
    (48, 6.0, 1.0), (48, 7.0, 1.0),  # C
    (41, 8.0, 1.0), (41, 9.0, 1.0),  # F
    (43, 10.0, 1.0), (43, 11.0, 1.0),  # G
    (45, 12.0, 1.0), (45, 13.0, 1.0),  # A
    (48, 14.0, 2.0),  # C (long hold)
    # Second section
    (48, 16.0, 1.0), (48, 17.0, 1.0),
    (50, 18.0, 0.5), (50, 18.5, 0.5), (50, 19.0, 0.5), (50, 19.5, 0.5),
    (48, 20.0, 2.0),
]

for pitch, start, duration in bass_notes:
    midi.addNote(1, 1, pitch, start, duration, volume)

# === ARPEGGIO (Track 2) - Fast 16th note runs ===
arpeggio_pattern = [
    (60, 0, 0.125), (64, 0.125, 0.125), (67, 0.25, 0.125), (72, 0.375, 0.125),
    (60, 0.5, 0.125), (64, 0.625, 0.125), (67, 0.75, 0.125), (72, 0.875, 0.125),
]
# Repeat arpeggio pattern throughout
for bar in range(16):
    offset = bar * 1.0
    for pitch, start, duration in arpeggio_pattern:
        midi.addNote(2, 2, pitch, start + offset, duration, 80)

# === DRUMS (Track 3) ===
# Kick drum (note 36)
kicks = [(0, 0.5), (1, 0.5), (2, 0.5), (3, 0.5), (4, 0.5), (5, 0.5), (6, 0.5), (7, 0.5),
         (8, 0.5), (9, 0.5), (10, 0.5), (11, 0.5), (12, 0.5), (13, 0.5), (14, 0.5), (15, 0.5),
         (16, 0.5), (17, 0.5), (18, 0.5), (19, 0.5), (20, 0.5)]

# Snare (note 38) - on beats 2 and 4
snares = [(0.5, 0.25), (1.5, 0.25), (2.5, 0.25), (3.5, 0.25),
          (4.5, 0.25), (5.5, 0.25), (6.5, 0.25), (7.5, 0.25),
          (8.5, 0.25), (9.5, 0.25), (10.5, 0.25), (11.5, 0.25),
          (12.5, 0.25), (13.5, 0.25), (14.5, 0.25), (15.5, 0.25),
          (16.5, 0.25), (17.5, 0.25), (18.5, 0.25), (19.5, 0.25), (20.5, 0.25)]

# Hi-hat (note 42) - 8th notes
hihats = []
for i in range(44):
    hihats.append((i * 0.25, 0.125))

for start, duration in kicks:
    midi.addNote(3, 9, 36, start, duration, volume)

for start, duration in snares:
    midi.addNote(3, 9, 38, start, duration, volume)

for start, duration in hihats:
    midi.addNote(3, 9, 42, start, duration, 70)

# Write to file
with open("chiptune_song.mid", "wb") as output_file:
    midi.writeFile(output_file)

print("Generated chiptune_song.mid - Classic 8-bit retro game music!")