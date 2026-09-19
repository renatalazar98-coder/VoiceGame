<script setup lang="ts">

import {
  onMounted,
  onUnmounted,
  ref
} from 'vue'

import { useAudio } from '../../composables/useAudio'


/*
|--------------------------------------------------------------------------
| AUDIO
|--------------------------------------------------------------------------
*/

const {
  pitch,
  intensity,
  isRunning,
  error,
  start,
  stop
} = useAudio()


/*
|--------------------------------------------------------------------------
| GAME STATE
|--------------------------------------------------------------------------
*/

const gameOver = ref(false)

const score = ref(0)

const playerY = ref(0)

const velocityY = ref(0)

const isJumping = ref(false)

const obstacleX = ref(85)

const obstacleHeight = ref(70)


/*
|--------------------------------------------------------------------------
| PITCH RANGE
|--------------------------------------------------------------------------
|
| MIDI:
|
| 48 = C3
| 60 = C4
| 72 = C5
| 84 = C6
|
*/

const pitchMin = 48
const pitchMax = 84


/*
|--------------------------------------------------------------------------
| JUMP RANGE
|--------------------------------------------------------------------------
*/

const minJumpStrength = 450
const maxJumpStrength = 1100


/*
|--------------------------------------------------------------------------
| PHYSICS
|--------------------------------------------------------------------------
*/

const gravity = 1800


/*
|--------------------------------------------------------------------------
| PLAYER
|--------------------------------------------------------------------------
*/

const playerSize = 40

const playerLeft = 15


/*
|--------------------------------------------------------------------------
| OBSTACLE
|--------------------------------------------------------------------------
*/

const obstacleWidth = 40

const obstacleMinHeight = 40
const obstacleMaxHeight = 150

const obstacleSpeed = 30


/*
|--------------------------------------------------------------------------
| VOICE
|--------------------------------------------------------------------------
*/

const voiceThreshold = 0.02


/*
|--------------------------------------------------------------------------
| ANIMATION
|--------------------------------------------------------------------------
*/

let animationFrame:
  number | null = null

let previousTimestamp:
  number | null = null


/*
|--------------------------------------------------------------------------
| PITCH → JUMP
|--------------------------------------------------------------------------
*/

function pitchToJumpStrength(
  midi: number
): number {

  /*
   * Normalize MIDI pitch.
   */

  const normalized =
    (
      midi -
      pitchMin
    ) /
    (
      pitchMax -
      pitchMin
    )


  /*
   * Keep value between 0 and 1.
   */

  const value =
    Math.max(
      0,
      Math.min(
        1,
        normalized
      )
    )


  /*
   * Map pitch to jump strength.
   */

  return (
    minJumpStrength +
    value *
    (
      maxJumpStrength -
      minJumpStrength
    )
  )
}


/*
|--------------------------------------------------------------------------
| OBSTACLE GENERATION
|--------------------------------------------------------------------------
*/

function generateObstacle() {

  obstacleHeight.value =
    obstacleMinHeight +
    Math.random() *
    (
      obstacleMaxHeight -
      obstacleMinHeight
    )
}


/*
|--------------------------------------------------------------------------
| JUMP
|--------------------------------------------------------------------------
*/

function jump(
  midi: number
) {

  /*
   * Do nothing if game is over.
   */

  if (
    gameOver.value
  ) {
    return
  }


  /*
   * Do not jump while already
   * in the air.
   */

  if (
    isJumping.value
  ) {
    return
  }


  /*
   * Ignore pitches outside
   * the playable range.
   */

  if (
    midi < pitchMin ||
    midi > pitchMax
  ) {
    return
  }


  /*
   * Convert pitch into
   * jump strength.
   */

  const jumpStrength =
    pitchToJumpStrength(
      midi
    )


  /*
   * Start jump.
   */

  velocityY.value =
    -jumpStrength

  isJumping.value =
    true
}


/*
|--------------------------------------------------------------------------
| VOICE CONTROL
|--------------------------------------------------------------------------
*/

function processVoice() {

  /*
   * Check whether there is
   * enough sound.
   *
   * Intensity does NOT determine
   * the jump height.
   */

  if (
    intensity.value <
    voiceThreshold
  ) {
    return
  }


  /*
   * Get detected pitch.
   */

  const currentMidi =
    pitch.value.midi


  /*
   * No valid pitch.

   */

  if (
    currentMidi <= 0
  ) {
    return
  }


  /*
   * Pitch determines
   * jump height.
   */

  jump(currentMidi)
}


/*
|--------------------------------------------------------------------------
| COLLISION
|--------------------------------------------------------------------------
*/

function checkCollision(): boolean {

  /*
   * Convert player width
   * from pixels to percentage.
   */

  const playerWidthPercent =
    (
      playerSize /
      window.innerWidth
    ) *
    100


  /*
   * Player horizontal bounds.
   */

  const playerLeftPosition =
    playerLeft

  const playerRightPosition =
    playerLeft +
    playerWidthPercent


  /*
   * Convert obstacle width
   * from pixels to percentage.
   */

  const obstacleWidthPercent =
    (
      obstacleWidth /
      window.innerWidth
    ) *
    100


  /*
   * Obstacle horizontal bounds.
   */

  const obstacleLeftPosition =
    obstacleX.value

  const obstacleRightPosition =
    obstacleX.value +
    obstacleWidthPercent


  /*
   * Horizontal collision.

   */

  const horizontalCollision =
    playerRightPosition >
      obstacleLeftPosition &&
    playerLeftPosition <
      obstacleRightPosition


  /*
   * Player vertical position.
   *
   * playerY = 0
   * means ground.
   *
   * Negative values mean
   * player is above ground.
   */

  const playerBottom =
    -playerY.value

  const playerTop =
    playerBottom +
    playerSize


  /*
   * Obstacle vertical range.
   */

  const obstacleTop =
    obstacleHeight.value


  /*
   * Vertical collision.

   */

  const verticalCollision =
    playerBottom <
      obstacleTop &&
    playerTop >
      0


  return (
    horizontalCollision &&
    verticalCollision
  )
}


/*
|--------------------------------------------------------------------------
| GAME LOOP
|--------------------------------------------------------------------------
*/

function update(
  timestamp: number
) {

  /*
   * Wait until microphone
   * is available.
   */

  if (
    !isRunning.value
  ) {

    animationFrame =
      requestAnimationFrame(
        update
      )

    return
  }


  /*
   * Stop game physics
   * after game over.
   */

  if (
    gameOver.value
  ) {

    animationFrame =
      requestAnimationFrame(
        update
      )

    return
  }


  /*
   * First frame.

   */

  if (
    previousTimestamp === null
  ) {

    previousTimestamp =
      timestamp
  }


  /*
   * Delta time.

   */

  const deltaTime =
    (
      timestamp -
      previousTimestamp
    ) / 1000


  previousTimestamp =
    timestamp


  /*
   * VOICE
   */

  processVoice()


  /*
   * PLAYER PHYSICS
   */

  if (
    isJumping.value
  ) {

    /*
     * Gravity.
     */

    velocityY.value +=
      gravity *
      deltaTime


    /*
     * Vertical movement.
     */

    playerY.value +=
      velocityY.value *
      deltaTime


    /*
     * Landing.
     */

    if (
      playerY.value >= 0
    ) {

      playerY.value = 0

      velocityY.value = 0

      isJumping.value = false
    }
  }


  /*
   * OBSTACLE MOVEMENT
   */

  obstacleX.value -=
    obstacleSpeed *
    deltaTime


  /*
   * OBSTACLE PASSED
   */

  if (
    obstacleX.value < -10
  ) {

    /*
     * Increase score.

     */

    score.value += 1


    /*
     * Move obstacle back
     * to the right.

     */

    obstacleX.value = 110


    /*
     * Generate a new
     * random height.
     */

    generateObstacle()
  }


  /*
   * COLLISION
   */

  if (
    checkCollision()
  ) {

    gameOver.value = true
  }


  /*
   * NEXT FRAME
   */

  animationFrame =
    requestAnimationFrame(
      update
    )
}


/*
|--------------------------------------------------------------------------
| RESTART
|--------------------------------------------------------------------------
*/

function restartGame() {

  gameOver.value = false

  score.value = 0

  playerY.value = 0

  velocityY.value = 0

  isJumping.value = false

  obstacleX.value = 85

  generateObstacle()

  previousTimestamp = null
}


/*
|--------------------------------------------------------------------------
| LIFECYCLE
|--------------------------------------------------------------------------
*/

onMounted(async () => {

  /*
   * Generate first obstacle.
   */

  generateObstacle()


  /*
   * Start microphone.
   */

  await start()


  /*
   * Reset timing.
   */

  previousTimestamp = null


  /*
   * Start game loop.
   */

  animationFrame =
    requestAnimationFrame(
      update
    )
})


onUnmounted(() => {

  /*
   * Stop animation.

   */

  if (
    animationFrame !== null
  ) {

    cancelAnimationFrame(
      animationFrame
    )

    animationFrame = null
  }


  /*
   * Stop microphone.

   */

  stop()
})

</script>


<template>

  <div class="voice-jump">


    <!-- GAME -->

    <div class="game">


      <!-- SCORE -->

      <div class="score">
        {{ score }}
      </div>


      <!-- PLAYER -->

      <div
        class="player"
        :style="{
          transform:
            `translateY(${playerY}px)`
        }"
      ></div>


      <!-- OBSTACLE -->

      <div
        class="obstacle"
        :style="{
          left:
            `${obstacleX}%`,
          height:
            `${obstacleHeight}px`
        }"
      ></div>


      <!-- GROUND -->

      <div class="ground"></div>


    </div>


    <!-- GAME OVER -->

    <div
      v-if="gameOver"
      class="game-over"
    >

      <div class="game-over-title">
        Game Over
      </div>

      <div class="game-over-text">
        Try using a higher pitch.
      </div>

      <div class="final-score">
        Score: {{ score }}
      </div>

      <button
        class="restart-button"
        @click="restartGame"
      >
        Play again
      </button>

    </div>


    <!-- MICROPHONE ERROR -->

    <div
      v-if="error"
      class="microphone-error"
    >
      {{ error }}
    </div>


  </div>

</template>


<style scoped>

.voice-jump {

  position: relative;

  width: 100%;

  height: 100vh;

  overflow: hidden;

  background:
    var(--color-background);
}


/*
|--------------------------------------------------------------------------
| GAME
|--------------------------------------------------------------------------
*/

.game {

  position: absolute;

  inset: 0;

  overflow: hidden;
}


/*
|--------------------------------------------------------------------------
| SCORE
|--------------------------------------------------------------------------
*/

.score {

  position: absolute;

  top: 90px;

  right: 32px;

  z-index: 10;

  font-size: 2rem;

  font-weight: 600;

  color:
    var(--color-text);

  font-variant-numeric:
    tabular-nums;
}


/*
|--------------------------------------------------------------------------
| PLAYER
|--------------------------------------------------------------------------
*/

.player {

  position: absolute;

  left: 15%;

  bottom: 122px;

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background:
    var(--color-accent);

  transition:
    transform 0.02s linear;
}


/*
|--------------------------------------------------------------------------
| OBSTACLE
|--------------------------------------------------------------------------
*/

.obstacle {

  position: absolute;

  bottom: 122px;

  width: 40px;

  min-height: 20px;

  background:
    rgba(
      255,
      255,
      255,
      0.8
    );
}


/*
|--------------------------------------------------------------------------
| GROUND
|--------------------------------------------------------------------------
*/

.ground {

  position: absolute;

  left: 0;

  right: 0;

  bottom: 120px;

  height: 2px;

  background:
    rgba(
      255,
      255,
      255,
      0.25
    );
}


/*
|--------------------------------------------------------------------------
| GAME OVER
|--------------------------------------------------------------------------
*/

.game-over {

  position: absolute;

  inset: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap:
    var(--space-lg);

  background:
    rgba(
      13,
      13,
      15,
      0.8
    );

  backdrop-filter:
    blur(8px);
}


.game-over-title {

  font-size: 3rem;

  font-weight: 600;

  letter-spacing:
    -0.03em;
}


.game-over-text {

  color:
    var(--color-text-secondary);

  font-size: 1rem;
}


.final-score {

  font-size: 1.2rem;

  font-weight: 500;

  color:
    var(--color-text);
}


/*
|--------------------------------------------------------------------------
| BUTTON
|--------------------------------------------------------------------------
*/

.restart-button {

  padding:
    12px 24px;

  border: none;

  border-radius:
    var(--radius-md);

  background:
    var(--color-accent);

  color:
    var(--color-background);

  font-size: 0.95rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.restart-button:hover {

  background:
    var(--color-accent-hover);

  transform:
    translateY(-1px);
}


/*
|--------------------------------------------------------------------------
| MICROPHONE ERROR
|--------------------------------------------------------------------------
*/

.microphone-error {

  position: absolute;

  left: 50%;

  bottom: 32px;

  transform:
    translateX(-50%);

  padding:
    10px 16px;

  border-radius:
    var(--radius-md);

  background:
    var(--color-surface);

  border:
    1px solid
    var(--color-border);

  color:
    var(--color-text-secondary);

  font-size: 0.85rem;
}

</style>

