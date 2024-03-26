<template>
  <div class="column__sample-buttons">
    <div class="button__randomize" @click="randomize">
      <v-icon icon="mdi-dice-3-outline" class="icon__button-big"/>
      <div class="indic__next"></div>
    </div>
    <div class="button__play" @click="play">
      <v-icon icon="mdi-play" class="icon__button-big"/>
    </div>
  </div>
</template>
<script>
import store from "./store/store";

export default {
  name: 'SampleButtons',
  methods: {
    play() {
      store.dispatch("player/play");
    },
    randomize() {
      store.dispatch("player/selectRandom");
    }
  }
}
</script>
<style>

.button__randomize {
  width: 88px;
  height: 93px;
  background-color: var(--bg1);
  border-radius: 5px;
  border: 1px solid var(--bg3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.button__randomize:hover {
  cursor: pointer;
  background-color: var(--nextAccent);
  border: 1px solid var(--nextAccent);
  color: var(--bg1);
  transition: 0.1s;
}

.button__randomize:hover .v-icon {
  color: var(--bg1);
  transition: 0.1s;
}

.button__play {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 63px;
  background-color: var(--bg1);
  border-radius: 5px;
  border: 1px solid var(--bg3);
  margin-top: 14px;
}

.button__play:hover {
  cursor: pointer;
  background-color: var(--currAccent);
  border: 1px solid var(--currAccent);
  transition: 0.1s;
}

.button__play:hover .v-icon {
  color: var(--bg1) !important;
  transition: 0.1s;
}

.icon__button-big {
  color: var(--currAccent);
}

.icon__button-big.v-icon {
  font-size: 2.5rem;
}

.indic__next {
  width: 6px;
  height: 6px;
  background-color: var(--nextAccent);
  position: relative;
  margin-left: -6px;
  right: -17px;
  bottom: -36px;
  border-radius: 4px;
}
</style>