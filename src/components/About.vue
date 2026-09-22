<script setup lang="ts">
import { useRouter } from 'vue-router'

defineEmits<{
  back: []
}>()

const router = useRouter()


function goBack() {

  router.back()

}

</script>


<template>

  <section class="about-page">

    <div class="about-content">

       <!--
       * Back
       -->

      <button
        class="back-button"
        @click="goBack"
      >
        ← Back
      </button>


      <div class="eyebrow">
        About
      </div>

      <h1>
        VoiceGame
      </h1>

      <p class="lead"> VoiceGame is an experimental collection of games controlled through the human voice.</p>
      <p class="lead" style="font-size:medium;">Instead of using a keyboard, mouse, or traditional game controller, VoiceGame turns vocal expression into an interface for interaction.</p>
      <p class="lead" style="font-size:medium;">The games explore different ways of translating sound into movement and visual behavior. Pitch, intensity, and other characteristics of the voice can become parameters for controlling the game, creating a direct relationship between what you hear, what you produce, and what happens on screen.</p>


      <div class="divider"></div>


      <div class="text">
        <h3>The Games</h3>
        <h2>SoundRise</h2>

        <p>
          In SoundRise, pitch and vocal intensity 
          control the movement and behavior of a visual element.
        </p>
        <p>
          The game explores the relationship between voice, pitch, intensity, 
          and visual space, turning vocal performance into a continuous interaction.
        </p>
        <h2>VoiceJump</h2>

        <p>
          VoiceJump uses pitch as a means of controlling the height of a jump.
        </p>
        <p>
          Higher or lower vocal pitches produce different movements, requiring the player to use their voice to navigate obstacles.
        </p>
        <p>The game experiments with the idea of voice as a physical controller, where vocal expression becomes part of the gameplay itself.</p>

      </div>


      <div class="credits">

        <div class="credit">

          <span class="label">
            Version
          </span>

          <span>
            0.1.0
          </span>

        </div>


        <div class="credit">

          <span class="label">
            Project
          </span>

          <span>
            VoiceGame
          </span>

        </div>

      </div>

    </div>

  </section>

</template>


<style scoped>

.about-page {

  width: 100%;
  height: 100%;

  padding:
    var(--space-2xl)
    var(--space-lg);

  overflow-y: auto;

}


.about-content {

  width: 100%;
  max-width: 680px;

  margin: 0 auto;

  padding:
    var(--space-2xl)
    var(--space-2xl)
    var(--space-3xl);

  border-radius:
    var(--radius-lg);

  background:
    rgba(255, 255, 255, 0.82);

  backdrop-filter:
    blur(6px);

  box-shadow:
    0 12px 40px rgba(20, 20, 25, 0.08);

}


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


.eyebrow {

  margin-bottom:
    var(--space-md);

  color:
    var(--color-text-muted);

  font-size: 0.7rem;

  font-weight: 600;

  letter-spacing: 0.12em;

  text-transform: uppercase;
}


h1 {

  margin: 0;

  font-size: 4rem;

  font-weight: 600;

  letter-spacing: -0.05em;
}


.lead {

  max-width: 560px;

  margin:
    var(--space-lg)
    0;

  color:
    var(--color-text-secondary);

  font-size: 1.25rem;

  line-height: 1.6;
}


.divider {

  width: 100%;

  height: 1px;

  margin:
    var(--space-3xl)
    0;

  background:
    var(--color-border);
}


.text {

  color:
    var(--color-text-secondary);

  font-size: 1rem;

  line-height: 1.7;
}


.text p {

  margin:
    0 0
    var(--space-lg);
}


.credits {

  margin-top:
    var(--space-3xl);

  padding-top:
    var(--space-lg);

  border-top:
    1px solid var(--color-border);
}


.credit {

  display: flex;

  justify-content: space-between;

  padding:
    var(--space-sm) 0;

  font-size: 0.85rem;
}


.label {

  color:
    var(--color-text-muted);
}


</style>