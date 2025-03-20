<script setup>
import PluginsPage from "./components/PluginsPage.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import CharacterImage from "./components/CharacterImage.vue";
import FAQTile from "./components/FAQTile.vue";

const store = useStore();

const maxPoints = ref(store.state.maxPoints);

store.watch(() => store.state.maxPoints, (newVal) => {
  maxPoints.value = newVal;
  store.dispatch("updateMaxPoints", newVal);
});

</script>

<template>
  <div class="container__background"></div>
  <div class="container__app">
    <div class="container__header">
      <!-- <h1>randallite</h1> -->
       <img src="/randallite-title-2.gif" alt="randallite" class="item__title" />
    </div>
    <div class="container__info">
      <h2 class="heading__info">what is randallite?</h2>
      <div class="container__info-text">
        <div>
          <v-icon icon="mdi-information" class="icon__info"></v-icon>
        </div>
        <div>
          <p>randallite is a plugin combo randomizer for music production. upload a list of your generator and effect plugins (vst, etc) and randallite will randomly select a combination of them for you to use in your next project.</p>
        </div>
    
      </div>
      <FAQTile question="how do i use randallite?" answer="upload a list of your plugins, set the weight for each plugin (or don't), and click 'randomize'. you can specify the number of generators and effects you receive."/>
      <FAQTile question="what format is the plugin list?" answer="the plugin list is a simple text file with one plugin per line. you can also use the 'edit' button to manually edit the list."/>
    
    </div>
    <div class="container__settings">
      <!-- <div class="container__settings-item">
        <label for="max-points">Max Points</label>
        <input id="max-points" type="number" v-model="maxPoints"/>
        </div> -->
    </div>
    <CharacterImage/>
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
  color: white;
  text-align: center;
}

.heading__info {
  border-bottom: 1px solid var(--currAccent);
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.container__background {
  background-image: url('/dice3-export.gif');
  background-attachment: fixed;
  background-repeat: repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.03225;
  z-index: -1;
  animation: background 45s linear infinite;
}

.container__info-text {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
  background-color: var(--bg2);
  border-radius: 8px;
  padding: 10px;
}

.icon__info {
  font-size: 3rem;
  color: var(--currAccent);
  margin-right: 1rem;
}

.container__info {
  margin-top: 20px;
  max-width: 800px;
  padding: 20px;

  border-radius: 8px;
  background-color: var(--bg1);
  border: 1px solid var(--currAccent);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 20px;
  text-align: left;
}

@keyframes background {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 400px 400px;
  }
}

</style>
