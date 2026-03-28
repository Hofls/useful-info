from midiutil import MIDIFile

def create_memphis_phonk():
    # Configuration
    bpm = 140
    duration_bars = 4  # Length of the loop
    output_file = "memphis-phonk.mid"

    # Create MIDIFile object with 3 tracks (Drums, Bass, Melody)
    midi = MIDIFile(3)

    # Track 0: Drums
    track_drums = 0
    time_drums = 0
    midi.addTrackName(track_drums, time_drums, "Drums")
    midi.addTempo(track_drums, time_drums, bpm)

    # Track 1: 808 Bass
    track_bass = 1
    time_bass = 0
    midi.addTrackName(track_bass, time_bass, "808 Bass")
    # Bass and Melody inherit tempo from first track, no need to addTempo again usually,
    # but we set the channel here.

    # Track 2: Dark Synth
    track_synth = 2
    time_synth = 0
    midi.addTrackName(track_synth, time_synth, "Synth")

    # --- Musical Constants ---
    # General MIDI Percussion Key Map
    KICK = 36
    SNARE = 40
    HI_HAT_CLOSED = 42
    COWBELL = 56  # The signature Phonk sound

    channel_drums = 9      # Channel 10 (index 9) is standard for drums
    channel_bass = 0       # Acoustic Grand / Synth Bass
    channel_synth = 1      # Bright Acoustic / Synth Lead

    volume_loud = 100
    volume_med = 80
    volume_bass = 110

    # --- Generate the Loop (4 Bars) ---

    for bar in range(duration_bars):
        current_time = bar * 4  # Move time forward 4 beats (1 bar) per iteration

        # --- DRUMS (Track 0) ---

        # 1. Kick Pattern (Heavy on 1 and syncopated trap rhythms)
        # Beat 1, 1.75, 3
        midi.addNote(track_drums, channel_drums, KICK, current_time + 0, 0.5, volume_loud)
        midi.addNote(track_drums, channel_drums, KICK, current_time + 1.75, 0.25, volume_loud)
        midi.addNote(track_drums, channel_drums, KICK, current_time + 3.0, 0.5, volume_loud)

        # 2. Snare Pattern (Standard 2 and 4 backbeat)
        midi.addNote(track_drums, channel_drums, SNARE, current_time + 1.0, 0.2, volume_med)
        midi.addNote(track_drums, channel_drums, SNARE, current_time + 3.0, 0.2, volume_med)

        # 3. Hi-Hats (Rapid 1/8 notes)
        for i in range(8):
            midi.addNote(track_drums, channel_drums, HI_HAT_CLOSED, current_time + (i * 0.5), 0.1, 50)

        # 4. COWBELL (The Memphis Signature)
        # A syncopated rhythmic pattern
        cowbell_times = [0.5, 1.5, 2.0, 2.5, 3.5]
        for t in cowbell_times:
            midi.addNote(track_drums, channel_drums, COWBELL, current_time + t, 0.2, volume_loud)

        # --- 808 BASS (Track 1) ---
        # Sustained low notes (A Minor)
        # Note 33 is A1.
        # We make the note duration 2 beats long and overlap them slightly for a rolling feel.
        midi.addNote(track_bass, channel_bass, 33, current_time + 0, 2.0, volume_bass)   # Root (A)
        midi.addNote(track_bass, channel_bass, 33, current_time + 2, 2.0, volume_bass)   # Root (A)

        # --- SYNTH MELODY (Track 2) ---
        # Dark, staccato chords. A Minor (A-C-E) and D Minor (D-F-A)
        # A = 57, C = 60, E = 64
        # D = 62, F = 65, A = 69

        # Bar 1 & 3: A Min Stab
        if bar == 0 or bar == 2:
            midi.addNote(track_synth, channel_synth, 57, current_time + 0, 0.5, volume_med) # A3
            midi.addNote(track_synth, channel_synth, 60, current_time + 0, 0.5, volume_med) # C4
            midi.addNote(track_synth, channel_synth, 64, current_time + 0, 0.5, volume_med) # E4

        # Bar 2 & 4: D Min Stab
        elif bar == 1 or bar == 3:
            midi.addNote(track_synth, channel_synth, 62, current_time + 0, 0.5, volume_med) # D4
            midi.addNote(track_synth, channel_synth, 65, current_time + 0, 0.5, volume_med) # F4
            midi.addNote(track_synth, channel_synth, 69, current_time + 0, 0.5, volume_med) # A5

        # Add a little high-pitch scream slide effect (Phonk characteristic)
        # Using a very short, high note
        midi.addNote(track_synth, channel_synth, 81, current_time + 3.75, 0.1, 100)

    # Write to disk
    with open(output_file, "wb") as output_file_handle:
        midi.writeFile(output_file_handle)

    print(f"Successfully generated {output_file}")

if __name__ == "__main__":
    create_memphis_phonk()