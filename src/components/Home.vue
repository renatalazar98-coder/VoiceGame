<script setup lang="ts">

import logoVoiceGame from '../images/logo-voicegame.png'
import spiegazione from '../images/spiegazione.png'
import pulsanteSoundrise from '../images/pulsante-soundrise.png'
import pulsanteVoicejump from '../images/pulsante-voicejump.png'

</script>


<template>

  <section class="home">

    <div class="home-inner">

      <img
        :src="logoVoiceGame"
        alt="VoiceGame"
        class="logo"
      />

      <img
        :src="spiegazione"
        alt="Use your voice to play, interact and explore sound through games."
        class="subtitle"
      />

      <nav class="games">

        <RouterLink
          to="/soundrise"
          class="game-link"
        >
          <img
            :src="pulsanteSoundrise"
            alt="Soundrise"
          />
        </RouterLink>

        <RouterLink
          to="/voicejump"
          class="game-link"
        >
          <img
            :src="pulsanteVoicejump"
            alt="VoiceJump"
          />
        </RouterLink>

      </nav>

    </div>

  </section>

</template>


<style scoped>

.home {

  width: 100%;
  min-height: calc(100vh - var(--header-height));

  padding:
    var(--space-2xl)
    var(--space-lg);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}


.home-inner {

  width: 100%;
  max-width: 720px;

  display: flex;
  flex-direction: column;
  align-items: center;

}


.logo {

  width: 100%;
  max-width: 280px;
  height: auto;

  filter:
    drop-shadow(0 6px 18px rgba(0, 0, 0, 0.12));

}


.subtitle {

  width: 100%;
  max-width: 640px;
  height: auto;

  margin-top:
    var(--space-xl);

}


.games {

  display: flex;
  align-items: center;
  justify-content: center;

  gap:
    var(--space-3xl);

  margin-top:
    var(--space-2xl);

}


.game-link {

  display: inline-flex;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

}


.game-link img {

  height: 26px;
  width: auto;

}


.game-link:hover {

  transform:
    translateY(-2px);

  opacity: 0.75;

}


@media (max-width: 600px) {

  .home {

    padding:
      var(--space-xl)
      var(--space-md);

  }


  .logo {

    max-width: 200px;

  }


  .subtitle {

    max-width: 100%;

  }


  .games {

    gap:
      var(--space-xl);

    flex-wrap: wrap;

  }

}

</style>
