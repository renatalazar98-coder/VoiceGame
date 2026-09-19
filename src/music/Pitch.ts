const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
]


export interface Pitch {

  frequency: number

  midi: number

  note: string

  octave: number

}


export function frequencyToMidi(
  frequency: number
): number {

  if (frequency <= 0) {
    return 0
  }

  return (
    69 +
    12 *
    Math.log2(
      frequency / 440
    )
  )
}


export function midiToNote(
  midi: number
): string {

  const roundedMidi =
    Math.round(midi)

  const noteIndex =
    roundedMidi % 12

  const octave =
    Math.floor(
      roundedMidi / 12
    ) - 1

  return (
    `${NOTE_NAMES[noteIndex]}${octave}`
  )
}


export function frequencyToPitch(
  frequency: number
): Pitch {

  if (frequency <= 0) {

    return {
      frequency: 0,
      midi: 0,
      note: '',
      octave: 0
    }

  }

  const midi =
    frequencyToMidi(
      frequency
    )

  const roundedMidi =
    Math.round(midi)

  const noteIndex =
    roundedMidi % 12

  const octave =
    Math.floor(
      roundedMidi / 12
    ) - 1

  return {

    frequency,

    midi,

    note:
      NOTE_NAMES[noteIndex],

    octave

  }
}