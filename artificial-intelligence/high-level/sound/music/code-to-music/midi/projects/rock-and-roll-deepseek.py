from midiutil import MIDIFile
import random

track = 0
time = 0
duration = 0.5
tempo = 140
volume = 100

midi = MIDIFile(1)
midi.addTempo(track, time, tempo)

# Rock and roll chord progression: I - IV - V - IV (A, D, E, D)
chords = [57, 62, 64, 62]  # A3, D4, E4, D4

# Bass line (root notes)
bass_notes = [45, 50, 52, 50]  # A2, D3, E3, D3

# Rock drum pattern (kick on 1 and 3, snare on 2 and 4, hi-hat steady)
# Using GM drum mapping: kick=36, snare=38, hi-hat=42

# Main melody (pentatonic rock riff)
melody_notes = [
    57, 59, 61, 62, 61, 59, 57, 59,  # A3, B3, C#4, D4, C#4, B3, A3, B3
    62, 64, 65, 64, 62, 61, 59, 57,  # D4, E4, F#4, E4, D4, C#4, B3, A3
    57, 57, 59, 61, 62, 64, 62, 61,  # A3, A3, B3, C#4, D4, E4, D4, C#4
    59, 57, 59, 57, 59, 61, 62, 64   # B3, A3, B3, A3, B3, C#4, D4, E4
]

# Add piano/guitar chords (power chords)
for i, chord_root in enumerate(chords):
    chord_time = i * 2
    # Power chord: root + fifth
    midi.addNote(track, 0, chord_root, chord_time, duration * 2, volume)
    midi.addNote(track, 0, chord_root + 7, chord_time, duration * 2, volume)
    # Add upper octave for fullness
    midi.addNote(track, 0, chord_root + 12, chord_time, duration * 2, volume)

# Add bass line
for i, bass_note in enumerate(bass_notes):
    bass_time = i * 2
    for beat in range(4):
        midi.addNote(track, 1, bass_note, bass_time + (beat * 0.5), 0.4, volume - 10)

# Add drums
for bar in range(8):
    bar_time = bar * 4
    # Kick drum (beats 1 and 3)
    midi.addNote(track, 9, 36, bar_time, 0.3, volume - 20)
    midi.addNote(track, 9, 36, bar_time + 2, 0.3, volume - 20)
    # Snare drum (beats 2 and 4)
    midi.addNote(track, 9, 38, bar_time + 1, 0.3, volume - 15)
    midi.addNote(track, 9, 38, bar_time + 3, 0.3, volume - 15)
    # Hi-hat (eighth notes)
    for beat in range(8):
        hihat_time = bar_time + (beat * 0.5)
        midi.addNote(track, 9, 42, hihat_time, 0.2, volume - 30)

# Add melody (electric guitar/lead)
for i, note in enumerate(melody_notes):
    note_time = i * 0.5
    if note_time < 32:  # 4 bars of 8th notes = 32 notes
        midi.addNote(track, 2, note, note_time, 0.4, volume)

# Add guitar solo (blues-rock style)
solo_notes = [
    64, 66, 67, 69, 67, 66, 64, 62,  # E4, F#4, G4, A4, G4, F#4, E4, D4
    64, 64, 66, 67, 69, 71, 72, 71,  # E4, E4, F#4, G4, A4, B4, C5, B4
    69, 67, 66, 64, 62, 64, 66, 67,  # A4, G4, F#4, E4, D4, E4, F#4, G4
    69, 71, 69, 67, 69, 67, 64, 62   # A4, B4, A4, G4, A4, G4, E4, D4
]

solo_start = 32
for i, note in enumerate(solo_notes):
    solo_time = solo_start + (i * 0.5)
    if solo_time < 48:  # 4 bars of solo
        midi.addNote(track, 3, note, solo_time, 0.3, volume + 10)

# Add tambourine and crash cymbal accents
for bar in range(8):
    # Crash cymbal on bar starts
    midi.addNote(track, 9, 49, bar * 4, 0.5, volume - 10)
    # Tambourine on off-beats
    for beat in range(8):
        if beat % 2 == 1:
            tamb_time = (bar * 4) + (beat * 0.5)
            midi.addNote(track, 9, 54, tamb_time, 0.2, volume - 25)

# Add rock organ pads
organ_notes = [45, 47, 49, 50, 52, 54, 55, 57]  # A2, B2, C#3, D3, E3, F#3, G3, A3
for i, note in enumerate(organ_notes):
    organ_time = i * 0.5
    if organ_time < 48:
        midi.addNote(track, 4, note, organ_time, 0.8, volume - 15)

with open("rock_and_roll_song.mid", "wb") as output_file:
    midi.writeFile(output_file)

print("Rock and roll MIDI song generated: rock_and_roll_song.mid")