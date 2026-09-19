<script setup lang="ts">

import { useRouter } from 'vue-router'

import {
  sensitivity,
  sunSize,
  pitchMin,
  pitchMax,
  threshold,
  pitchSmoothing
} from '../config/settings'

import {
  midiToNote
} from '../music/Pitch'


const router = useRouter()


/*
 * Navigation
 */

function goBack() {

  router.back()

}


/*
 * Pitch range
 */

function updatePitchMin(
  value: number
) {

  pitchMin.value = value

  if (
    pitchMin.value >=
    pitchMax.value
  ) {

    pitchMin.value =
      pitchMax.value - 1

  }

}


function updatePitchMax(
  value: number
) {

  pitchMax.value = value

  if (
    pitchMax.value <=
    pitchMin.value
  ) {

    pitchMax.value =
      pitchMin.value + 1

  }

}


/*
 * Reset
 */

function resetSettings() {

  sensitivity.value = 1

  threshold.value = 0.02

  pitchSmoothing.value = 0.05

  sunSize.value = 1

  pitchMin.value = 48

  pitchMax.value = 84

}

</script>


<template>

  <section class="settings">

    <div class="settings-inner">


      <!--
       * Back
       -->

      <button
        class="back-button"
        @click="goBack"
      >
        ← Back
      </button>


      <!--
       * Heading
       -->

      <div class="heading">

        <div class="eyebrow">
          Configuration
        </div>

        <h1>
          Settings
        </h1>

        <p>
          Adjust how SoundRise responds
          to your voice.
        </p>

      </div>


      <!--
       * Audio
       -->

      <div class="settings-section">

        <h2>
          Audio
        </h2>


        <div class="setting">

          <div class="setting-header">

            <div>

              <h3>
                Sensitivity
              </h3>

              <p>
                Controls how strongly the
                visualization responds to intensity.
              </p>

            </div>

            <span class="value">
              {{ sensitivity.toFixed(2) }}
            </span>

          </div>


          <input
            v-model.number="sensitivity"
            type="range"
            min="0.5"
            max="2"
            step="0.05"
          />


        </div>

        <div class="setting">

  <div class="setting-header">

    <div>

      <h3>
        Voice threshold
      </h3>

      <p>
        Minimum intensity required to detect
        your voice.
      </p>

    </div>

    <span class="value">
      {{ threshold.toFixed(3) }}
    </span>

  </div>

  <input
    v-model.number="threshold"
    type="range"
    min="0.005"
    max="0.05"
    step="0.001"
  />

</div>

      </div>


      <!--
       * Pitch range
       -->

      <div class="settings-section">

        <h2>
          Pitch range
        </h2>


        <!-- Minimum -->

        <div class="setting">

          <div class="setting-header">

            <div>

              <h3>
                Minimum pitch
              </h3>

              <p>
                Lowest pitch used by the
                visualization.
              </p>

            </div>

            <span class="value">
              {{ midiToNote(pitchMin) }}
            </span>

          </div>


          <input
            :value="pitchMin"
            type="range"
            min="36"
            max="95"
            step="1"
            @input="
              updatePitchMin(
                Number(
                  ($event.target as HTMLInputElement).value
                )
              )
            "
          />

        </div>


        <!-- Maximum -->

        <div class="setting">

          <div class="setting-header">

            <div>

              <h3>
                Maximum pitch
              </h3>

              <p>
                Highest pitch used by the
                visualization.
              </p>

            </div>

            <span class="value">
              {{ midiToNote(pitchMax) }}
            </span>

          </div>


          <input
            :value="pitchMax"
            type="range"
            min="37"
            max="96"
            step="1"
            @input="
              updatePitchMax(
                Number(
                  ($event.target as HTMLInputElement).value
                )
              )
            "
          />

        </div>

        <div class="settings-section">

  <h2>
    Pitch response
  </h2>

  <div class="setting">

    <div class="setting-header">

      <div>

        <h3>
          Pitch smoothing
        </h3>

        <p>
          Controls how smoothly the visualization
          follows changes in pitch.
        </p>

      </div>

      <span class="value">
        {{ pitchSmoothing.toFixed(2) }}
      </span>

    </div>

    <input
      v-model.number="pitchSmoothing"
      type="range"
      min="0.01"
      max="0.20"
      step="0.01"
    />

  </div>

</div>

      </div>


      <!--
       * Visualization
       -->

      <div class="settings-section">

        <h2>
          Visualization
        </h2>


        <div class="setting">

          <div class="setting-header">

            <div>

              <h3>
                Sun size
              </h3>

              <p>
                Adjust the overall size of the sun.
              </p>

            </div>

            <span class="value">
              {{ sunSize.toFixed(2) }}
            </span>

          </div>


          <input
            v-model.number="sunSize"
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
          />

        </div>

      </div>


      <!--
       * General
       -->

      <div class="settings-section">

        <h2>
          General
        </h2>


        <button
          class="reset-button"
          @click="resetSettings"
        >
          Reset settings
        </button>

      </div>


    </div>

  </section>

</template>


<style scoped>

.settings {

  width: 100%;

  min-height: 100vh;

  padding:
    var(--space-xl)
    var(--space-lg);

}


.settings-inner {

  width: 100%;

  max-width: 720px;

  margin: 0 auto;

}


/*
 * Back button
 */

.back-button {

  display: inline-block;

  margin-bottom:
    var(--space-3xl);

  padding: 0;

  border: none;

  background: transparent;

  color:
    var(--color-text-secondary);

  font-family: inherit;

  font-size: 0.85rem;

  cursor: pointer;

}


.back-button:hover {

  color:
    var(--color-text);

}


/*
 * Heading
 */

.heading {

  margin-bottom:
    var(--space-3xl);

}


.eyebrow {

  margin-bottom:
    var(--space-md);

  color:
    var(--color-text-muted);

  font-size: 0.75rem;

  font-weight: 600;

  letter-spacing: 0.12em;

  text-transform: uppercase;

}


h1 {

  margin: 0;

  font-size: 3.5rem;

  font-weight: 600;

  letter-spacing: -0.05em;

}


.heading p {

  max-width: 480px;

  margin-top:
    var(--space-md);

  color:
    var(--color-text-secondary);

  line-height: 1.6;

}


/*
 * Sections
 */

.settings-section {

  padding:
    var(--space-xl) 0;

  border-top:
    1px solid var(--color-border);

}


.settings-section h2 {

  margin:
    0 0 var(--space-xl);

  font-size: 0.9rem;

  font-weight: 600;

}


/*
 * Individual setting
 */

.setting {

  margin-bottom:
    var(--space-xl);

}


.setting-header {

  display: flex;

  justify-content:
    space-between;

  gap:
    var(--space-lg);

}


.setting h3 {

  margin:
    0 0 var(--space-sm);

  font-size: 1rem;

  font-weight: 500;

}


.setting p {

  max-width: 480px;

  margin: 0;

  color:
    var(--color-text-secondary);

  font-size: 0.85rem;

  line-height: 1.5;

}


.value {

  color:
    var(--color-text-secondary);

  font-family: monospace;

  font-size: 0.8rem;

  white-space: nowrap;

}


/*
 * Range inputs
 */

input[type="range"] {

  width: 100%;

  margin-top:
    var(--space-lg);

  accent-color:
    var(--color-accent);

}


/*
 * Reset button
 */

.reset-button {

  padding:
    10px 18px;

  border:
    1px solid var(--color-border);

  border-radius:
    var(--radius-sm);

  background:
    transparent;

  color:
    var(--color-text-secondary);

  font-family: inherit;

  cursor: pointer;

}


.reset-button:hover {

  background:
    var(--color-surface-hover);

  color:
    var(--color-text);

}


/*
 * Mobile
 */

@media (max-width: 600px) {

  .settings {

    padding:
      var(--space-xl)
      var(--space-md);

  }


  h1 {

    font-size: 2.75rem;

  }

}

</style>