<template>
  <div class="container__sample-info">
    <div class="row__sample-info">
      <FileInfoBar/>
      <div class="container__like-button">
        <v-icon icon="mdi-heart-outline" class="icon__like-button"/>
      </div>
    </div>
    <SamplePlayer ref="waveformComponent"/>
  </div>
</template>
<script>
import SamplePlayer from "./SamplePlayer.vue";
import {mapState} from "vuex";
import FileInfoBar from "./FileInfoBar.vue";

const {shell} = require('electron')

export default {
  name: 'SampleBox',
  components: {FileInfoBar, SamplePlayer},
}
</script>
<style>

.container__sample-info {
  margin-left: 14px;
}

.icon__file-location.v-icon {
  color: var(--bg4);
  font-size: 1.25rem;
  margin-right: 8px;
}

.container__like-button {
  width: 53px;
  height: 42px;
  background-color: var(--bg1);
  border: 1px solid var(--bg3);
  border-radius: 5px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.row__sample-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
}

.icon__like-button {
  color: var(--currAccent);
}
</style>