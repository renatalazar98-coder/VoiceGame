export class Smoother {

  private value = 0
  private initialized = false

  constructor(
    private attackTime = 0.05,
    private releaseTime = 0.15
  ) {}

  process(
    input: number,
    deltaTime: number
  ): number {

    if (!this.initialized) {

      this.value = input
      this.initialized = true

      return this.value
    }

    const timeConstant =
      input > this.value
        ? this.attackTime
        : this.releaseTime

    const alpha =
      1 -
      Math.exp(
        -deltaTime /
        timeConstant
      )

    this.value +=
      (input - this.value) *
      alpha

    return this.value
  }

  setTime(
    attackTime: number,
    releaseTime: number
  ): void {

    this.attackTime =
      attackTime

    this.releaseTime =
      releaseTime
  }

  reset(): void {

    this.value = 0
    this.initialized = false

  }

  getValue(): number {

    return this.value

  }
}