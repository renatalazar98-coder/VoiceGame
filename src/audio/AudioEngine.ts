export class AudioEngine {

  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private stream: MediaStream | null = null

  async start(): Promise<void> {

    this.stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      })

    this.audioContext =
      new AudioContext()

    const source =
      this.audioContext.createMediaStreamSource(
        this.stream
      )

    this.analyser =
      this.audioContext.createAnalyser()

    this.analyser.fftSize = 2048

    source.connect(this.analyser)
  }

  getTimeDomainData(): Float32Array {

    if (!this.analyser) {
      return new Float32Array(0)
    }

    const buffer =
      new Float32Array(
        this.analyser.fftSize
      )

    this.analyser.getFloatTimeDomainData(
      buffer
    )

    return buffer
  }

  getSampleRate(): number {

    return (
      this.audioContext?.sampleRate ??
      44100
    )

  }

  stop(): void {

    this.stream?.getTracks().forEach(
      track => track.stop()
    )

    this.audioContext?.close()

    this.stream = null
    this.audioContext = null
    this.analyser = null
  }
}