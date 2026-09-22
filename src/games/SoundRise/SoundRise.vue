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

import nomeSoundrise from '../../images/nome-soundrise.png'
import prato from '../../images/prato.png'


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


    <img
      :src="nomeSoundrise"
      alt="Soundrise"
      class="game-title"
    />


    <img
      :src="prato"
      alt=""
      class="ground-grass"
    />


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

  background:
    url('../../images/sfondo.png')
    center / cover
    no-repeat;

  color: var(--color-text);

  overflow: hidden;

}


.scene {

  position: absolute;

  inset: 0;

  z-index: 2;

  display: flex;

  align-items: center;
  justify-content: center;

  overflow: hidden;

}


.sun {

  width: 220px;
  height: 220px;

  border-radius: 50%;

  background: #ffff00;

  transition:
    transform 0.08s linear;

}


.game-title {

  position: absolute;

  top: 108px;

  left: 50%;

  transform:
    translateX(-50%);

  z-index: 3;

  height: 22px;
  width: auto;

  pointer-events: none;

}


.ground-grass {

  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;

  width: 100%;
  height: auto;

  pointer-events: none;

  user-select: none;

}


.status {

  position: absolute;

  left: 0;
  right: 0;

  bottom: 40px;

  z-index: 3;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 10px;

  font-size: 0.75rem;

  color:
    var(--color-text-secondary);

  letter-spacing: 0.04em;

  pointer-events: none;

}


.status-dot {

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background:
    rgba(23, 24, 26, 0.2);

}


.status-dot.active {

  background:
    var(--color-accent);

}


.status-dot.error {

  background:
    #e0303c;

}


.note {

  margin-left:
    var(--space-sm);

  padding-left:
    var(--space-sm);

  border-left:
    1px solid var(--color-border);

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  font-size: 0.95rem;

  font-weight: 600;

  letter-spacing: -0.01em;

  color:
    var(--color-text);

}

</style>