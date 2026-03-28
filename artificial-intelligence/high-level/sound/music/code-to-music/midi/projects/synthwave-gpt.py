from midiutil import MIDIFile

# Genre chosen: Synthwave / Retrowave

tempo = 100
volume = 90

midi = MIDIFile(3)  # 3 tracks: lead, bass, chords

lead_track = 0
bass_track = 1
chord_track = 2

time = 0

midi.addTempo(lead_track, time, tempo)
midi.addTempo(bass_track, time, tempo)
midi.addTempo(chord_track, time, tempo)

# MIDI channels
lead_channel = 0
bass_channel = 1
chord_channel = 2

# Instruments (General MIDI)
midi.addProgramChange(lead_track, lead_channel, 0, 81)   # Lead (square-like)
midi.addProgramChange(bass_track, bass_channel, 0, 38)   # Synth bass
midi.addProgramChange(chord_track, chord_channel, 0, 88) # Pad

# Notes
A3 = 57
C4 = 60
E4 = 64
G4 = 67
A4 = 69
C5 = 72
E5 = 76

# Chord progression (Am - C - G - Em)
chords = [
    [A3, C4, E4],
    [C4, E4, G4],
    [G4, B := 71, D := 74],
    [E4, G4, B]
]

# Bass notes (root)
bass_notes = [A3, C4, G3 := 55, E3 := 52]

# Lead melody pattern
lead_pattern = [A4, C5, E5, C5, G4, E4, C4, E4]

bar_length = 4
total_bars = 16

current_time = 0

for bar in range(total_bars):
    chord = chords[bar % len(chords)]
    bass_note = bass_notes[bar % len(bass_notes)]

    # Add chords (whole note)
    for note in chord:
        midi.addNote(chord_track, chord_channel, note, current_time, bar_length, 60)

    # Add bass (8th notes pulse)
    for i in range(8):
        midi.addNote(bass_track, bass_channel, bass_note, current_time + i * 0.5, 0.5, 80)

    # Add lead (16th notes melody)
    for i, note in enumerate(lead_pattern):
        midi.addNote(lead_track, lead_channel, note, current_time + i * 0.5, 0.5, volume)

    current_time += bar_length

with open("synthwave.mid", "wb") as output_file:
    midi.writeFile(output_file)