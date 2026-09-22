<script setup lang="ts">

import AppHeader
  from './components/AppHeader.vue'

</script>


<template>

  <div class="app">

    <AppHeader />

    <main class="app-content">

      <RouterView />

    </main>

  </div>

</template>


<style scoped>

.app {

  width: 100%;
  min-height: 100vh;

  background: transparent;

}


.app-content {

  width: 100%;
  min-height: 100vh;

}

</style>