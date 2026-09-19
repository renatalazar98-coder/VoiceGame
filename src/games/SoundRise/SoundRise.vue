<script setup lang="ts">

import {
  computed,
  onMounted,
  onUnmounted
} from 'vue'

import { useAudio } from '../../composables/useAudio'

import {
  pitchMin,
  pitchMax,
  sunSize
} from '../../config/settings'

import {
  visualizationConfig
} from '../../config/visualization'


const {pitch,intensity,isRunning,error,start,stop} = useAudio()


onMounted(async () => {await start()})

onUnmounted(() => {stop()})

const sunY =
  computed(() => {
    if (!pitch.value.midi) {return 0}
    
    const range = pitchMax.value - pitchMin.value

    if (range <= 0) {return 0}
    
    const normalized = (pitch.value.midi - pitchMin.value) / range
    
    const clamped = Math.max(0, Math.min(1, normalized))
    
    const maxY = 350
    
    return ((1 - clamped) * maxY * 2 - maxY)
  })


const sunScale =
  computed(() => {

    const minScale =
      visualizationConfig
        .sun
        .minScale


    const maxScale =
      visualizationConfig
        .sun
        .maxScale


    const intensityMax =
      visualizationConfig
        .sun
        .intensityMax


    const normalized =
      Math.min(
        intensity.value /
        intensityMax,
        1
      )


    const scale =
      minScale +
      normalized *
      (
        maxScale -
        minScale
      )


    return (
      scale *
      sunSize.value
    )

  })

</script>


<template>

  <section class="visualizer">

    <div class="scene">

      <div class="sun" :style="{transform: 
            `translateY(${sunY}px) scale(${sunScale})`
        }"
      ></div>

    </div>


    <div class="status">

      <span
        class="status-dot"
        :class="{
          active: isRunning,
          error: error
        }"
      ></span>


      <span v-if="isRunning">

        Listening

      </span>


      <span v-else-if="error">

        Microphone unavailable

      </span>

    </div>


    <div class="note-display">

      <span
        v-if="pitch.note"
        class="note"
      >

        {{ pitch.note }}{{ pitch.octave }}

      </span>

    </div>

  </section>

</template>


<style scoped>

.visualizer {

  position: relative;

  width: 100%;
  height: 100vh;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #111;

  color: white;

  overflow: hidden;

}


.scene {

  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  overflow: hidden;

}


.sun {

  width: 200px;
  height: 200px;

  border-radius: 50%;

  background: orange;

  transition:
    transform 0.08s linear;

}


.status {

  position: absolute;

  top: 88px;

  left: 50%;

  transform:
    translateX(-50%);

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 0.75rem;

  color:
    rgba(255, 255, 255, 0.5);

  letter-spacing: 0.04em;

  pointer-events: none;

}


.status-dot {

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.25);

}


.status-dot.active {

  background:
    var(--color-accent);

}


.status-dot.error {

  background:
    #ff5c5c;

}


.note-display {

  position: absolute;

  left: 0;
  right: 0;

  bottom: 48px;

  display: flex;

  justify-content: center;

  pointer-events: none;

}


.note {

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  font-size: 1.5rem;

  font-weight: 500;

  letter-spacing: -0.02em;

  color:
    rgba(255, 255, 255, 0.85);

}

</style>