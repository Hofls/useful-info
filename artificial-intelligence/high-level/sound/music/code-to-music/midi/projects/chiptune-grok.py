from midiutil import MIDIFile
import random

# Chiptune / 8-bit style MIDI generator - always the same retro game song
def generate_chiptune_midi(filename="chiptune_song.mid"):
    # Create MIDI file with 4 tracks (for classic chiptune feel: pulse1, pulse2, triangle/bass, noise/drums)
    midi = MIDIFile(4)
    tempo = 140  # Classic chiptune tempo
    volume = 100

    # Track 0: Lead (Pulse 1 - square wave melody)
    track = 0
    channel = 0
    midi.addTempo(track, 0, tempo)

    # Simple 8-bit melody (C major pentatonic-ish retro feel)
    melody_notes = [
        # Intro
        (60, 0.5), (62, 0.5), (64, 0.5), (65, 0.5),  # C D E F
        (67, 1.0), (65, 0.5), (64, 0.5),              # G - E - D
        (62, 0.5), (64, 0.5), (65, 0.5), (67, 0.5),   # D E F G
        (69, 2.0),                                    # A (hold)

        # Main theme
        (72, 0.25), (74, 0.25), (76, 0.25), (77, 0.25), (79, 0.5), (77, 0.5),
        (76, 0.25), (74, 0.25), (72, 1.0),
        (69, 0.25), (71, 0.25), (72, 0.25), (74, 0.25), (76, 1.0),
        (74, 0.5), (72, 0.5), (71, 1.0),

        # Repeat with variation
        (72, 0.25), (74, 0.25), (76, 0.25), (77, 0.25), (79, 0.5), (81, 0.5),
        (79, 0.25), (77, 0.25), (76, 1.0),
        (74, 0.5), (72, 0.5), (71, 0.5), (69, 0.5),
        (67, 2.0)
    ]

    time = 0
    for note, dur in melody_notes:
        midi.addNote(track, channel, note, time, dur, volume)
        time += dur

    # Track 1: Harmony / Pulse 2 (octave lower or counter melody)
    track = 1
    channel = 1
    harmony_notes = [
        (48, 4.0), (50, 4.0), (52, 4.0), (53, 4.0),  # Long bass notes under intro
        (55, 8.0), (57, 8.0),                        # Main section
        (55, 8.0), (53, 8.0)
    ]
    time = 0
    for note, dur in harmony_notes:
        midi.addNote(track, channel, note, time, dur, volume - 20)
        time += dur

    # Track 2: Bass (Triangle wave style)
    track = 2
    channel = 2
    bass_line = [
        (36, 1.0), (36, 1.0), (43, 1.0), (43, 1.0),  # C - C - G - G
        (41, 1.0), (41, 1.0), (43, 1.0), (43, 1.0),  # F - F - G - G
        (36, 1.0), (36, 1.0), (43, 1.0), (43, 1.0),
        (41, 2.0), (36, 2.0)
    ]
    time = 0
    for note, dur in bass_line * 3:  # Repeat pattern
        midi.addNote(track, channel, note, time, dur, volume - 10)
        time += dur

    # Track 3: Simple drums (Noise channel simulation with high notes)
    track = 3
    channel = 9  # Percussion channel
    drum_pattern = [
        # Kick on 1 and 3, snare on 2 and 4, hi-hat every 0.5
        (36, 0.5), (42, 0.5), (38, 0.5), (42, 0.5),  # Kick - hat - snare - hat
        (36, 0.5), (42, 0.5), (38, 0.5), (42, 0.5)
    ]

    time = 0
    for _ in range(16):  # Repeat drum pattern many times
        for note, dur in drum_pattern:
            midi.addNote(track, channel, note, time, dur, volume - 30)
            time += dur

    # Write to file
    with open(filename, "wb") as output_file:
        midi.writeFile(output_file)

    print(f"Chiptune MIDI song generated: {filename}")
    print("Classic 8-bit retro game style - sounds great with square/triangle waves!")

# Run the generator
if __name__ == "__main__":
    generate_chiptune_midi()