from midiutil import MIDIFile

def main():
    midi = MIDIFile(1)
    track, channel = 0, 0
    tempo = 120
    midi.addTempo(track, 0, tempo)

    notes = [(60,0,1,100),(60,1,1,100),(67,2,1,100),(67,3,1,100),
             (69,4,1,100),(69,5,1,100),(67,6,2,100),(65,8,1,100),
             (65,9,1,100),(64,10,1,100),(64,11,1,100),(62,12,1,100),
             (62,13,1,100),(60,14,2,100)]

    for pitch, t, dur, vel in notes:
        midi.addNote(track, channel, pitch, t, dur, vel)

    with open("simplest_melody.mid", "wb") as f:
        midi.writeFile(f)

    print("🎵 simplest_melody.mid created!")
    print("Drag & drop this file into any MIDI track in Ableton.")

if __name__ == "__main__":
    main()