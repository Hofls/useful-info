from midiutil import MIDIFile

def generate_synthwave():
    # Configuration
    bpm = 118
    total_bars = 32

    # MIDI Setup
    # Track 0: Bass
    # Track 1: Arpeggio (Lead)
    # Track 2: Pad
    # Track 3: Drums
    midi = MIDIFile(4)

    # Track Setup (Name, Channel, Instrument/Program)
    # Channel 9 is reserved for drums in General MIDI
    tracks = [
        {"index": 0, "name": "Bass", "channel": 0, "program": 38, "volume": 100}, # Synth Bass 1
        {"index": 1, "name": "Arp",   "channel": 1, "program": 80, "volume": 90},  # Synth Lead 1 (Square)
        {"index": 2, "name": "Pad",   "channel": 2, "program": 88, "volume": 70},  # Pad 1 (New Age)
        {"index": 3, "name": "Drums", "channel": 9, "program": 0,  "volume": 110}  # Drum Kit
    ]

    for track in tracks:
        midi.addTrackName(track["index"], 0, track["name"])
        midi.addProgramChange(track["index"], track["channel"], 0, track["program"])
        midi.addTempo(track["index"], 0, bpm)

    # Chord Progression Data (Key of A Minor)
    # Am -> F -> C -> G
    # Notes: Root, 3rd, 5th, Octave, 5th, 3rd (for Arp)
    chords = {
        'Am': {'root': 57, 'arp': [57, 60, 64, 69, 64, 60], 'pad': [57, 64, 69]},
        'F':  {'root': 53, 'arp': [53, 57, 60, 65, 60, 57], 'pad': [53, 60, 65]},
        'C':  {'root': 48, 'arp': [48, 52, 55, 60, 55, 52], 'pad': [48, 55, 60]},
        'G':  {'root': 43, 'arp': [43, 47, 50, 55, 50, 47], 'pad': [43, 50, 55]}
    }

    progression = ['Am', 'F', 'C', 'G']

    # Generate Loop
    for bar in range(total_bars):
        chord_key = progression[bar % 4]
        chord = chords[chord_key]
        bar_start_time = bar * 4

        # --- DRUMS (Track 3, Channel 9) ---
        # Kick: 4/4 beat
        for beat in range(4):
            time = bar_start_time + beat
            midi.addNote(3, 9, 36, time, 0.5, 110) # Kick

            # Snare on 2 and 4
            if beat in [1, 3]:
                midi.addNote(3, 9, 38, time, 0.5, 100) # Snare

            # Hi-hats every 8th note
            midi.addNote(3, 9, 42, time, 0.25, 80)
            midi.addNote(3, 9, 42, time + 0.5, 0.25, 80)

        # --- BASS (Track 0, Channel 0) ---
        # Driving 8th notes on root
        for beat in range(4):
            time = bar_start_time + beat
            midi.addNote(0, 0, chord['root'], time, 0.5, tracks[0]['volume'])
            midi.addNote(0, 0, chord['root'], time + 0.5, 0.5, tracks[0]['volume'])

        # --- ARPEGGIO (Track 1, Channel 1) ---
        # 8th notes playing the defined pattern
        for i in range(8):
            time = bar_start_time + (i * 0.5)
            # Cycle through the 6-note arp pattern
            note = chord['arp'][i % 6]
            midi.addNote(1, 1, note, time, 0.25, tracks[1]['volume'])

        # --- PAD (Track 2, Channel 2) ---
        # Sustained chord for the whole bar
        for note in chord['pad']:
            midi.addNote(2, 2, note, bar_start_time, 4, tracks[2]['volume'])

    # Save
    with open("synthwave.mid", "wb") as output_file:
        midi.writeFile(output_file)

if __name__ == "__main__":
    generate_synthwave()