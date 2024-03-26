<template>
  <div class="container__sample-player">
    <div ref="waveform" @click="handleClick"></div>
    <div class="info__load-error" v-if="loadError">Could not load.</div>
  </div>
</template>
<script>
import WaveSurfer from "wavesurfer.js";
import {mapState} from "vuex";
import store from "./store/store";
import fs from "node:fs";

export default {
  name: 'SamplePlayer',
  mounted() {
    let color = '#fff';
    // get value of var(--currAccent) from css
    let style = getComputedStyle(document.body);
    color = style.getPropertyValue('--currAccent');

    this.waveSurfer = WaveSurfer.create({
      container: this.$refs.waveform,
      waveColor: color,
      progressColor: "#fff",
      cursorColor: '#fff',
      cursorWidth: 3,
      barWidth: 4,
      barRadius: 3,
      responsive: true,
      height: 80,
      barGap: 2,
      barMinHeight: 1,
      barHeight: 1,
      normalize: true,
      backend: 'MediaElement'
    });

    this.waveSurfer.load(this.file);
  },
  beforeUnmount() {
    this.waveSurfer.destroy();
  },
  data() {
    return {
      options: {},
      file: "/amen.mp3",
      loadError: false,
    }
  },
  methods: {
    play() {
      console.log("sample play")
      let startTime = this.analyzeStartTime();
      console.log("analyzed")
      // reset the playhead to the beginning
      this.waveSurfer.seekTo(startTime);
      this.waveSurfer.playPause();
    },
    handleClick() {
      if (this.isPlaying) {
        return;
      }
      this.play()
    },
    analyzeStartTime() {
      let startSample = 0;
      return startSample;
    }
  },
  watch: {
    isPlayReady: function (val) {
      console.log("isPlayReady changed", val);
      if (val) {
        this.play();
        store.dispatch("player/setPlayReady", false);
      }
    },
    currAccentNum: function (val) {
      let color;
      // get value of var(--currAccent) from css
      let style = document.documentElement.style;
      const cssColorVar = style.getPropertyValue('--currAccent');
      // cssColorVar is like var(--currAccent). We need to see what it's set to.
      // We can do this by creating a dummy element and setting its color to the cssColorVar.
      // Then we can get the computed color value of that element.
      const dummy = document.createElement('div');
      dummy.style.color = cssColorVar;
      document.body.appendChild(dummy);
      const computedColor = getComputedStyle(dummy).color;
      document.body.removeChild(dummy);
      color = computedColor;
      this.waveSurfer.setOptions({
        waveColor: color
      });
    },
    sample: async function (val) {
      console.log("sample changed", val);
      try {
        let buffer = fs.readFileSync(val);
        let blob = new Blob([buffer])
        await this.waveSurfer.loadBlob(blob);
        this.loadError = false;
      } catch (e) {
        console.log(e)
        this.waveSurfer.empty();
        this.loadError = true;
      }
    }
  },
  computed: {
    ...mapState('theme', ['currAccentNum']),
    ...mapState('player', ['isPlayReady', 'sample', 'isPlaying'])
  },

}
</script>
<style>

.container__sample-player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 22px 0 22px;
  width: 387px;
  min-width: 387px;
  height: 117px;
  min-height: 117px;
  background-color: var(--bg1);
  border: 1px solid var(--bg3);
  margin-top: 13px;
  border-radius: 5px;
}

.info__load-error {
  position: absolute;
  left: 256px;
  color: var(--bg3);
}
</style>