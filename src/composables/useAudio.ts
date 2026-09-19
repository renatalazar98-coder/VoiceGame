import { ref } from 'vue'

import { AudioEngine } from '../audio/AudioEngine'
import { PitchDetector } from '../audio/PitchDetector'
import { Smoother } from '../audio/Smoother'

import {
  frequencyToMidi,
  frequencyToPitch,
  type Pitch
} from '../music/Pitch'

import {
  sensitivity,
  threshold,
  pitchSmoothing
} from '../config/settings'


export function useAudio() {

  const audioEngine =
    new AudioEngine()

  let pitchDetector:
    PitchDetector

  let animationFrame:
    number | null = null

  let previousTimestamp:
    number | null = null


  const pitch =
    ref<Pitch>({

      frequency: 0,

      midi: 0,

      note: '',

      octave: 0

    })


  const intensity =
    ref(0)


  const isRunning =
    ref(false)


  const error =
    ref<string | null>(null)


  const intensitySmoother =
    new Smoother(
      0.05,
      0.15
    )


  const pitchSmoother =
    new Smoother(
      pitchSmoothing.value,
      pitchSmoothing.value
    )


  async function start() {

    try {

      error.value = null

      await audioEngine.start()

      pitchDetector =
        new PitchDetector(
          audioEngine.getSampleRate()
        )

      intensitySmoother.reset()
      pitchSmoother.reset()

      previousTimestamp = null

      isRunning.value = true

      animationFrame =
        requestAnimationFrame(
          update
        )

    } catch (err) {

      console.error(err)

      error.value =
        'Microphone access is required.'

      isRunning.value = false

    }

  }


  function update(
    timestamp: number
  ) {

    if (!isRunning.value) {
      return
    }


    if (
      previousTimestamp === null
    ) {

      previousTimestamp =
        timestamp

    }


    const deltaTime =
      (
        timestamp -
        previousTimestamp
      ) / 1000


    previousTimestamp =
      timestamp


    const buffer =
      audioEngine
        .getTimeDomainData()


    const rawIntensity =
      calculateIntensity(
        buffer
      ) *
      sensitivity.value


    const smoothedIntensity =
      intensitySmoother.process(
        rawIntensity,
        deltaTime
      )


    intensity.value =
      smoothedIntensity


    if (
      smoothedIntensity <
      threshold.value
    ) {

      animationFrame =
        requestAnimationFrame(
          update
        )

      return

    }


    const frequency =
      pitchDetector.detect(
        buffer
      )


    const midi =
      frequencyToMidi(
        frequency
      )


    pitchSmoother.setTime(
      pitchSmoothing.value,
      pitchSmoothing.value
    )


    const smoothedMidi =
      pitchSmoother.process(
        midi,
        deltaTime
      )


    const smoothedFrequency =
      440 *
      Math.pow(
        2,
        (
          smoothedMidi - 69
        ) / 12
      )


    pitch.value =
      frequencyToPitch(
        smoothedFrequency
      )


    animationFrame =
      requestAnimationFrame(
        update
      )

  }


  function calculateIntensity(
    buffer: Float32Array
  ): number {

    if (
      buffer.length === 0
    ) {

      return 0

    }


    let sum = 0


    for (
      const sample of buffer
    ) {

      sum +=
        sample * sample

    }


    return Math.sqrt(
      sum / buffer.length
    )

  }


  function stop() {

    if (
      animationFrame !== null
    ) {

      cancelAnimationFrame(
        animationFrame
      )

      animationFrame = null

    }


    audioEngine.stop()


    isRunning.value =
      false


    previousTimestamp =
      null


    pitch.value = {

      frequency: 0,

      midi: 0,

      note: '',

      octave: 0

    }


    intensity.value = 0


    intensitySmoother.reset()

    pitchSmoother.reset()

  }


  return {

    pitch,

    intensity,

    isRunning,

    error,

    start,

    stop

  }

}