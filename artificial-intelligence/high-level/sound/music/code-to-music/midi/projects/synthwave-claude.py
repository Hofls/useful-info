from midiutil import MIDIFile
import random

# Create MIDI object
midi = MIDIFile(1)  # 1 track
track = 0
channel = 0
time = 0
tempo = 128
volume = 100

midi.addTempo(track, time, tempo)

# Synthwave / Retrowave - 80s synth arpeggios with pulsing bassline

# Main arpeggio pattern (synth lead on channel 0)
arp_notes = [60, 63, 67, 70, 67, 63]  # C major arpeggio
arp_duration = 0.5

for bar in range(16):
    for note in arp_notes:
        midi.addNote(track, 0, note, time, arp_duration, volume)
        time += arp_duration

# Bassline (synth bass on channel 1) - pulsing pattern
time = 0
bass_pattern = [36, 36, 36, 36, 38, 38, 40, 40]  # C, C, C, C, Eb, Eb, E, E
bass_duration = 0.5

for bar in range(16):
    for note in bass_pattern:
        midi.addNote(track, 1, note, time, bass_duration, volume - 20)
        time += bass_duration

# Pad chords (strings on channel 2) - long sustained notes
time = 0
pad_sequence = [
    ([48, 52, 55], 4),      # C major - 4 beats
    ([50, 53, 57], 4),      # D minor - 4 beats
    ([48, 52, 55], 4),      # C major - 4 beats
    ([45, 48, 52], 4),      # A minor - 4 beats
]

for bar in range(4):
    for notes, duration in pad_sequence:
        for note in notes:
            midi.addNote(track, 2, note, time, duration, volume - 30)
        time += duration

# Hi-hat pattern (percussion on channel 9) - closed hi-hat on every 8th note
time = 0
hihat_note = 42
hihat_duration = 0.25

for bar in range(16):
    for beat in range(16):
        midi.addNote(track, 9, hihat_note, time, hihat_duration, 80)
        time += hihat_duration

# Write to file
output_file = "synthwave_80s.mid"
with open(output_file, 'wb') as output:
    midi.writeFile(output)

print(f"✨ Synthwave track created: {output_file}")