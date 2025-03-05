<script setup>
import PluginsPage from "./components/PluginsPage.vue";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();

const maxPoints = ref(store.state.maxPoints);

store.watch(() => store.state.maxPoints, (newVal) => {
  maxPoints.value = newVal;
  store.dispatch("updateMaxPoints", newVal);
});

</script>

<template>
  <div class="container__app">
    <div class="container__header">
      <h1>randallite</h1>
    </div>
    <div class="container__settings">
      <div class="container__settings-item">
        <label for="max-points">Max Points</label>
        <input id="max-points" type="number" v-model="maxPoints"/>
        </div>

    </div>
  <PluginsPage/>
  </div>
</template>

<style scoped>
.container__app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  justify-content: start;
  align-items: center;
  background-color: var(--bg1);
  color: white;
  text-align: center;
}
</style>
