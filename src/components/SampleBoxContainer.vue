<template>
  <div class="container__sample-box">
    <div class="column__sample-box">
      <div class="top__sample-box">
        <div class="row__top-info">
          <div class="container__sample-meta">
            <div class="item__metadata">
              2.61s
            </div>
            <div class="item__selection">
              Selecting from 2245 samples
            </div>
          </div>
          <div class="container__color-seq">
            <div class="item__color-enabled">ENABLED</div>
            <div class="row__seq-squares">
              <div class="item__seq-square yellow" :class="{active: isCurrColor(0)}"></div>
              <div class="item__seq-square purple" :class="{active: isCurrColor(1)}"></div>
              <div class="item__seq-square aqua" :class="{active: isCurrColor(2)}"></div>
              <div class="item__seq-square pink" :class="{active: isCurrColor(3)}"></div>
            </div>
          </div>
        </div>
        <div class="row__sample-container">
          <SampleButtons/>
          <SampleBox/>
        </div>
      </div>
      <div class="bottom__sample-box"/>
    </div>
  </div>
</template>
<script>
import SampleButtons from "./SampleButtons.vue";
import SampleBox from "./SampleBox.vue";
import {mapState} from "vuex";

export default {
  name: 'SampleBoxContainer',
  components: {SampleBox, SampleButtons},
  methods: {
    isCurrColor(num) {
      return this.currAccentNum === num;
    }
  },
  computed: {
    ...mapState('theme', ['currAccentNum'])
  }
}
</script>
<style>

.container__sample-box {
  width: 100%;
  background-color: var(--bg2);
  margin-top: 15px;
  height: 278px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.33);
}

.column__sample-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.bottom__sample-box {
  width: 100%;
  height: 18px;
  background-color: var(--bg2mute);
}

.row__top-info {
  display: flex;
  width: 100%;
  height: 40px;
  min-height: 40px;
  max-height: 40px;

  justify-content: left;
}

.container__sample-meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  border: 1px solid var(--bg3);
  color: var(--bg4);
  flex: 1 0 auto;
  font-size: 14px;
}

.item__metadata {
  border-right: 1px solid var(--bg3);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  min-width: 88px;
}

.item__selection {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 0px 18px;
}

.row__seq-squares {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.item__color-enabled {
  color: var(--currAccent);
  font-size: 10px;
  font-weight: bold;
  margin-top: -3px;
}

.item__seq-square {
  height: 8px;
  width: 8px;
  background-color: var(--bg3);
  margin-right: 5px;
  margin-bottom: -2px;
  transition: background-color 0.1s;
}

.item__seq-square.active.yellow {
  background-color: var(--yellow)
}

.item__seq-square.active.purple {
  background-color: var(--purple)
}

.item__seq-square.active.aqua {
  background-color: var(--aqua)
}

.item__seq-square.active.pink {
  background-color: var(--pink)
}

.item__seq-square:last-child {
  margin-right: 0;
}

.container__color-seq {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 69px;
  min-width: 69px;
  border: 1px solid var(--bg3);
  height: 100%;
  border-radius: 3px;
  margin-left: 14px;
}

.top__sample-box {
  height: 100%;
  width: 100%;
  padding: 10px 20px 0px 20px;
  margin-top: 10px;
}

.row__sample-container {
  margin-top: 14px;
  display: flex;
}

</style>