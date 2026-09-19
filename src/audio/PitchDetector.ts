export class PitchDetector {

  private sampleRate: number

  constructor(sampleRate: number) {
    this.sampleRate = sampleRate
  }

  detect(buffer: Float32Array): number {

    const SIZE = buffer.length

    let mean = 0

    for (let i = 0; i < SIZE; i++) {
      mean += buffer[i]
    }

    mean /= SIZE

    const signal =
      new Float32Array(SIZE)

    for (let i = 0; i < SIZE; i++) {
      signal[i] =
        buffer[i] - mean
    }

    let rms = 0

    for (let i = 0; i < SIZE; i++) {
      rms +=
        signal[i] *
        signal[i]
    }

    rms =
      Math.sqrt(
        rms / SIZE
      )

    if (rms < 0.01) {
      return 0
    }

    const minFrequency = 80
    const maxFrequency = 1000

    const minLag =
      Math.floor(
        this.sampleRate /
        maxFrequency
      )

    const maxLag =
      Math.floor(
        this.sampleRate /
        minFrequency
      )

    let bestLag = -1
    let bestCorrelation = 0

    for (
      let lag = minLag;
      lag <= maxLag;
      lag++
    ) {

      let correlation = 0

      for (
        let i = 0;
        i < SIZE - lag;
        i++
      ) {

        correlation +=
          signal[i] *
          signal[i + lag]

      }

      correlation /=
        SIZE - lag

      if (
        correlation >
        bestCorrelation
      ) {

        bestCorrelation =
          correlation

        bestLag = lag
      }
    }

    if (bestLag === -1) {
      return 0
    }

    return (
      this.sampleRate /
      bestLag
    )
  }
}