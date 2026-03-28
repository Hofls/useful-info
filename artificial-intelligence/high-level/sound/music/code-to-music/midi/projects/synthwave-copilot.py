from midiutil import MIDIFile

# Synthwave / Retrowave fixed-song generator using MIDIUtil
# No randomness: always generates the same track

def create_synthwave_midi(filename: str = "synthwave_track.mid"):
    # Basic MIDI setup
    num_tracks = 4
    midi = MIDIFile(numTracks=num_tracks, removeDuplicates=True, deinterleave=False)
    tempo = 100  # BPM
    volume = 90

    # Track indices
    TRACK_DRUMS = 0
    TRACK_BASS = 1
    TRACK_CHORDS = 2
    TRACK_LEAD = 3

    # Channels (0–15)
    CH_DRUMS = 9   # Standard GM drums channel
    CH_BASS = 0
    CH_CHORDS = 1
    CH_LEAD = 2

    # Set tempo and track names
    for track in range(num_tracks):
        midi.addTempo(track, 0, tempo)

    midi.addTrackName(TRACK_DRUMS, 0, "Drums")
    midi.addTrackName(TRACK_BASS, 0, "Bass")
    midi.addTrackName(TRACK_CHORDS, 0, "Chords")
    midi.addTrackName(TRACK_LEAD, 0, "Lead")

    # Song structure: 4-bar intro + 8-bar main = 12 bars total
    # 4/4 time, 1 bar = 4 beats
    bars_intro = 4
    bars_main = 8
    total_bars = bars_intro + bars_main
    beats_per_bar = 4

    # Helper to convert bar/beat to absolute time
    def t(bar, beat=0.0):
        return bar * beats_per_bar + beat

    # Scale and key: A minor (A natural minor)
    # MIDI note numbers (C4 = 60)
    A2 = 45
    A3 = 57
    A4 = 69
    C4 = 60
    E4 = 64
    G4 = 67
    D4 = 62
    F4 = 65
    G3 = 55
    E3 = 52
    F3 = 53
    G2 = 43
    E2 = 40

    # -----------------------
    # DRUMS: simple 4-on-the-floor with snare and hats
    # -----------------------
    kick = 36
    snare = 38
    closed_hat = 42

    for bar in range(total_bars):
        bar_start = t(bar)

        # Kick on beats 1 and 3
        midi.addNote(TRACK_DRUMS, CH_DRUMS, kick, bar_start + 0.0, 0.25, 100)
        midi.addNote(TRACK_DRUMS, CH_DRUMS, kick, bar_start + 2.0, 0.25, 100)

        # Snare on beats 2 and 4
        midi.addNote(TRACK_DRUMS, CH_DRUMS, snare, bar_start + 1.0, 0.25, 100)
        midi.addNote(TRACK_DRUMS, CH_DRUMS, snare, bar_start + 3.0, 0.25, 100)

        # Closed hat on every 8th note
        for step in range(8):
            midi.addNote(TRACK_DRUMS, CH_DRUMS, closed_hat, bar_start + step * 0.5, 0.1, 70)

    # -----------------------
    # BASS: steady synth bass pattern
    # Progression (per bar): Am | F | C | G (repeats)
    # -----------------------
    bass_pattern = [
        A2,  # Am
        F2 := 41,  # F
        C3 := 48,  # C
        G2,  # G
    ]

    # Each bar: root note on beats 1 and 3 (half notes)
    for bar in range(total_bars):
        chord_index = bar % 4
        root = bass_pattern[chord_index]
        bar_start = t(bar)

        midi.addNote(TRACK_BASS, CH_BASS, root, bar_start + 0.0, 2.0, 90)
        midi.addNote(TRACK_BASS, CH_BASS, root, bar_start + 2.0, 2.0, 90)

    # -----------------------
    # CHORDS: lush synth pads
    # Same progression: Am | F | C | G
    # Chords voiced in mid register
    # -----------------------
    chords = {
        "Am": [A3, C4, E4],
        "F": [F3, A3, C4],
        "C": [C4, E4, G4],
        "G": [G3, B3 := 59, D4],
    }

    chord_order = ["Am", "F", "C", "G"]

    # Intro: chords held for full bar, softer
    for bar in range(bars_intro):
        chord_name = chord_order[bar % 4]
        notes = chords[chord_name]
        bar_start = t(bar)
        for n in notes:
            midi.addNote(TRACK_CHORDS, CH_CHORDS, n, bar_start, 4.0, 70)

    # Main: same chords but slightly louder
    for bar in range(bars_intro, total_bars):
        chord_name = chord_order[bar % 4]
        notes = chords[chord_name]
        bar_start = t(bar)
        for n in notes:
            midi.addNote(TRACK_CHORDS, CH_CHORDS, n, bar_start, 4.0, 80)

    # -----------------------
    # LEAD: fixed arpeggiated synthwave-style melody
    # Plays only in main section (after intro)
    # -----------------------
    # Simple 1-bar motif in A minor, repeated and slightly varied
    motif_1 = [
        (A4, 0.0, 0.5),
        (C4 + 12, 0.5, 0.5),
        (E4 + 12, 1.0, 0.5),
        (C4 + 12, 1.5, 0.5),
        (A4, 2.0, 0.5),
        (G4 + 12, 2.5, 0.5),
        (E4 + 12, 3.0, 0.5),
        (C4 + 12, 3.5, 0.5),
    ]

    # Slight variation motif
    motif_2 = [
        (E4 + 12, 0.0, 0.5),
        (C4 + 12, 0.5, 0.5),
        (A4, 1.0, 0.5),
        (C4 + 12, 1.5, 0.5),
        (E4 + 12, 2.0, 0.5),
        (G4 + 12, 2.5, 0.5),
        (A4 + 12, 3.0, 0.5),
        (G4 + 12, 3.5, 0.5),
    ]

    # Assign motifs across main bars
    for i, bar in enumerate(range(bars_intro, total_bars)):
        bar_start = t(bar)
        motif = motif_1 if i % 2 == 0 else motif_2
        for pitch, offset, dur in motif:
            midi.addNote(TRACK_LEAD, CH_LEAD, pitch, bar_start + offset, dur, 95)

    # Write to file
    with open(filename, "wb") as output_file:
        midi.writeFile(output_file)


if __name__ == "__main__":
    create_synthwave_midi("synthwave_fixed_song.mid")
