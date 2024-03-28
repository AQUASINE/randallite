<script setup>
import PluginsPage from "./components/PluginsPage.vue";
</script>

<template>
  <div class="container__app">
  <PluginsPage/>
  </div>
</template>

<style scoped>
.container__app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;

  background-color: var(--bg1);
  color: white;
  text-align: center;
}
</style>
