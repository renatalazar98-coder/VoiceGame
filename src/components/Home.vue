<script setup lang="ts">

</script>

<template>

  <section class="home">

    <div class="hero">

      <div class="eyebrow">
        Interactive voice games
      </div>

      <h1>
        VoiceGame
      </h1>

      <p class="description">
        Use your voice to play, interact
        and explore sound through games.
      </p>

    </div>


    <div class="games">

      <RouterLink
        to="/soundrise"
        class="game-card"
      >

        <div class="game-number">
          01
        </div>

        <div class="game-content">

          <h2>
            SoundRise
          </h2>

          <p>
            Explore your voice through
            sound and visual movement.
          </p>

        </div>

        <div class="game-arrow">
          →
        </div>

      </RouterLink>


      <RouterLink
        to="/voicejump"
        class="game-card"
      >

        <div class="game-number">
          02
        </div>

        <div class="game-content">

          <h2>
            VoiceJump
          </h2>

          <p>
            Control a character with your
            voice and jump over obstacles.
          </p>

        </div>

        <div class="game-arrow">
          →
        </div>

      </RouterLink>

    </div>

  </section>

</template>


<style scoped>

.home {

  width: 100%;
  min-height: 100vh;

  padding:
    var(--space-3xl)
    var(--space-lg);

  display: flex;
  flex-direction: column;
  align-items: center;

}


.hero {

  width: 100%;
  max-width: 900px;

  padding:
    var(--space-3xl) 0
    var(--space-2xl);

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

  font-size:
    clamp(4rem, 10vw, 7rem);

  font-weight: 600;

  line-height: 0.95;

  letter-spacing: -0.06em;

}


.description {

  max-width: 500px;

  margin-top:
    var(--space-lg);

  color:
    var(--color-text-secondary);

  font-size: 1.1rem;

  line-height: 1.6;

}


.games {

  width: 100%;
  max-width: 900px;

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap:
    var(--space-md);

}


.game-card {

  position: relative;

  min-height: 260px;

  padding:
    var(--space-xl);

  display: flex;
  flex-direction: column;

  border:
    1px solid var(--color-border);

  border-radius:
    var(--radius-lg);

  background:
    var(--color-surface);

  color:
    var(--color-text);

  text-decoration: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

}


.game-card:hover {

  background:
    var(--color-surface-hover);

  border-color:
    #3a3a3f;

  transform:
    translateY(-3px);

}


.game-number {

  color:
    var(--color-accent);

  font-size: 0.75rem;

  font-weight: 600;

  letter-spacing: 0.05em;

}


.game-content {

  margin-top: auto;

}


.game-content h2 {

  margin:
    0 0 var(--space-sm);

  font-size: 1.8rem;

  font-weight: 600;

  letter-spacing: -0.03em;

}


.game-content p {

  max-width: 300px;

  margin: 0;

  color:
    var(--color-text-secondary);

  font-size: 0.9rem;

  line-height: 1.5;

}


.game-arrow {

  position: absolute;

  right:
    var(--space-xl);

  top:
    var(--space-xl);

  color:
    var(--color-text-secondary);

  font-size: 1.2rem;

  transition:
    transform 0.2s ease,
    color 0.2s ease;

}


.game-card:hover .game-arrow {

  color:
    var(--color-text);

  transform:
    translateX(4px);

}


@media (max-width: 700px) {

  .home {

    padding:
      var(--space-xl)
      var(--space-md);

  }


  .hero {

    padding:
      var(--space-2xl) 0
      var(--space-xl);

  }


  h1 {

    font-size:
      clamp(3.5rem, 18vw, 5rem);

  }


  .games {

    grid-template-columns:
      1fr;

  }


  .game-card {

    min-height: 220px;

  }

}

</style>