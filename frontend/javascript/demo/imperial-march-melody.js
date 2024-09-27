// Imperial march melody (8-bit)

// Define note frequencies (in Hz)
const NOTES = {
  REST: 0,
  NOTE_A4: 440,
  NOTE_F4: 349.23,
  NOTE_C5: 523.25,
  NOTE_E5: 659.25,
  NOTE_A5: 880,
  NOTE_GS5: 830.61,
  NOTE_G5: 783.99,
  NOTE_DS5: 622.25,
  NOTE_D5: 587.33,
  NOTE_CS5: 554.37,
  NOTE_B4: 493.88,
  NOTE_GS4: 415.30,
};

// Melody (Note, Duration)
const melody = [
  [NOTES.NOTE_A4, 4], [NOTES.NOTE_F4, -8], [NOTES.NOTE_C5, 16], [NOTES.NOTE_A4, 2],

  [NOTES.NOTE_A5, 4], [NOTES.NOTE_A4, -8], [NOTES.NOTE_A4, 16], [NOTES.NOTE_A5, 4],
  [NOTES.NOTE_GS5, -8], [NOTES.NOTE_G5, 16], [NOTES.NOTE_DS5, 16], [NOTES.NOTE_D5, 16],
  [NOTES.NOTE_DS5, 8], [NOTES.REST, 8], [NOTES.NOTE_A4, 8], [NOTES.NOTE_DS5, 4],
  [NOTES.NOTE_D5, -8], [NOTES.NOTE_CS5, 16],

  [NOTES.NOTE_C5, 16], [NOTES.NOTE_B4, 16], [NOTES.NOTE_C5, 16], [NOTES.REST, 8],
  [NOTES.NOTE_F4, 8], [NOTES.NOTE_GS4, 4], [NOTES.NOTE_F4, -8], [NOTES.NOTE_A4, -16],
  [NOTES.NOTE_C5, 4], [NOTES.NOTE_A4, -8], [NOTES.NOTE_C5, 16], [NOTES.NOTE_E5, 2],

  [NOTES.NOTE_A5, 4], [NOTES.NOTE_A4, -8], [NOTES.NOTE_A4, 16], [NOTES.NOTE_A5, 4],
  [NOTES.NOTE_GS5, -8], [NOTES.NOTE_G5, 16], [NOTES.NOTE_DS5, 16], [NOTES.NOTE_D5, 16],
  [NOTES.NOTE_DS5, 8], [NOTES.REST, 8], [NOTES.NOTE_A4, 8], [NOTES.NOTE_DS5, 4],
  [NOTES.NOTE_D5, -8], [NOTES.NOTE_CS5, 16],

  [NOTES.NOTE_C5, 16], [NOTES.NOTE_B4, 16], [NOTES.NOTE_C5, 16], [NOTES.REST, 8],
  [NOTES.NOTE_F4, 8], [NOTES.NOTE_GS4, 4], [NOTES.NOTE_F4, -8], [NOTES.NOTE_A4, -16],
  [NOTES.NOTE_A4, 4], [NOTES.NOTE_F4, -8], [NOTES.NOTE_C5, 16], [NOTES.NOTE_A4, 2]
];

const tempo = 120; // Adjust the tempo

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(frequency, duration) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "square"; // 8-bit sound effect
  oscillator.start();

  gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime); // Set volume
  oscillator.stop(audioCtx.currentTime + duration / 1000); // Stop after the duration
}

function playMelody() {
  let currentTime = 0;

  for (let i = 0; i < melody.length; i++) {
    const note = melody[i][0];
    const duration = melody[i][1];

    const noteDuration = (60 / tempo) * (4 / Math.abs(duration)) * 1000;

    setTimeout(() => {
      if (note > 0) {
        playTone(note, noteDuration);
      }
    }, currentTime);

    currentTime += noteDuration;
  }
}

playMelody();