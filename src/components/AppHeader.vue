<script setup lang="ts">

import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

import {
  useRoute
} from 'vue-router'


const route = useRoute()


const isGame =
  computed(() => {

    return (
      route.name === 'soundrise' ||
      route.name === 'voicejump'
    )

  })


const visible =
  ref(true)


let hideTimeout:
  ReturnType<typeof setTimeout> | null = null


function clearHideTimeout() {

  if (
    hideTimeout !== null
  ) {

    clearTimeout(
      hideTimeout
    )

    hideTimeout = null

  }

}


function hideHeader() {

  clearHideTimeout()

  hideTimeout =
    setTimeout(() => {

      visible.value = false

    }, 2000)

}


function showHeader() {

  clearHideTimeout()

  visible.value = true

}


function handleMouseMove(
  event: MouseEvent
) {

  if (!isGame.value) {
    return
  }


  /*
   * The upper 80px of the screen
   * act as the header activation area.
   */

  if (
    event.clientY <= 80
  ) {

    showHeader()

  } else {

    hideHeader()

  }

}


function handleMouseLeave() {

  if (!isGame.value) {
    return
  }

  hideHeader()

}


function updateHeaderVisibility() {

  clearHideTimeout()

  visible.value = true


  if (isGame.value) {

    hideHeader()

  }

}


watch(
  () => route.name,
  () => {

    updateHeaderVisibility()

  }
)


onMounted(() => {

  window.addEventListener(
    'mousemove',
    handleMouseMove
  )

  window.addEventListener(
    'mouseleave',
    handleMouseLeave
  )


  updateHeaderVisibility()

})


onUnmounted(() => {

  window.removeEventListener(
    'mousemove',
    handleMouseMove
  )

  window.removeEventListener(
    'mouseleave',
    handleMouseLeave
  )

  clearHideTimeout()

})

</script>


<template>

  <header
    class="app-header"
    :class="{
      game: isGame,
      visible: visible,
      hidden: !visible
    }"
  >

    <RouterLink
      to="/"
      class="logo"
    >
      VoiceGame
    </RouterLink>


    <nav class="navigation">

      <RouterLink
        to="/settings"
        class="nav-button"
        aria-label="Settings"
      >
        ⚙
      </RouterLink>


      <RouterLink
        to="/about"
        class="nav-button"
        aria-label="About"
      >
        ?
      </RouterLink>

    </nav>

  </header>

</template>


<style scoped>

.app-header {

  position: relative;

  z-index: 1000;

  height:
    var(--header-height);

  padding:
    0 var(--space-lg);

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-bottom:
    1px solid var(--color-border);

  background:
    var(--color-background);

  transition:
    transform 0.35s ease,
    opacity 0.35s ease;

}


/*
 * Inside a game the header becomes
 * an overlay over the visualizer.
 */

.app-header.game {

  position: fixed;

  top: 0;
  left: 0;
  right: 0;

  background:
    rgba(242, 242, 240, 0.85);

  backdrop-filter:
    blur(10px);

}


/*
 * Visible state
 */

.app-header.visible {

  transform:
    translateY(0);

  opacity: 1;

}


/*
 * Hidden state
 */

.app-header.hidden {

  transform:
    translateY(-100%);

  opacity: 0;

  pointer-events: none;

}


.logo {

  color:
    var(--color-text);

  text-decoration: none;

  font-size: 1.1rem;

  font-weight: 600;

  letter-spacing: -0.02em;

}


.navigation {

  display: flex;

  align-items: center;

  gap:
    var(--space-sm);

}


.nav-button {

  width: 36px;
  height: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius:
    var(--radius-sm);

  color:
    var(--color-text-secondary);

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease;

}


.nav-button:hover {

  background:
    var(--color-surface-hover);

  color:
    var(--color-text);

}


.router-link-active {

  color:
    var(--color-text);

}

</style>