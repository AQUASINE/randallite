<template>
  <div class="page__plugins">
    <div class="row__title-plugins">
      <div class="title__plugins">Plugins</div>
      <div class="info__plugin-num">{{ generators.length }} generators, {{ effects.length }} effects</div>
    </div>

    <PluginListTile :plugins="generators" name="Generators" :probabilities="generatorProbabilities" :update-plugin-value="updateGeneratorPluginValue"/>
    <PluginListTile :plugins="effects" name="Effects" :probabilities="effectProbabilities" :update-plugin-value="updateEffectsPluginValue"/>
    <div class="container__reroll-overlay">
      <div class="container__reroll-box">
        <div class="container__rolled-plugins" v-if="pluginCombo || isInDelay">
          <v-icon icon="mdi-close" class="icon__rolled-plugins" @click="clearCombo"/>
          <div class="container__dice" v-if="isInDelay">
            <img src="/dice2.gif" alt="dice" class="img__reroll"/>
          </div>
          <div class="info__rolled" v-else v-html="pluginCombo">
          </div>
        </div>
        <div class="container__reroll-config" :class="{round: !pluginCombo}">
          <div class="row__reroll-config">
            <div class="container__generator-num">
              <div class="info__reroll-config" :class="{selected: isNumGenerator(0)}" @click="setGeneratorNum(0)">0
              </div>
              <div class="info__reroll-config" :class="{selected: isNumGenerator(1)}" @click="setGeneratorNum(1)">1
              </div>
            </div>
            <div class="title__reroll-config">Generator</div>
          </div>
          <div class="title__reroll-config">+</div>
          <div class="row__reroll-config">
            <div class="grid__effect-num">
              <div class="info__reroll-config" v-for="i in 4" :key="i" :class="{selected: isNumEffect(i - 1)}"
                   @click="setEffectNum(i - 1)">
                {{ i - 1 }}
              </div>
            </div>
            <div class="title__reroll-config">Effects</div>
          </div>
        </div>
        <div class="button__reroll" @click="reroll">
          <v-icon icon="mdi-dice-3-outline" class="icon__reroll"/>
          Reroll
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PluginListTile from "./PluginListTile.vue";

export default {
  name: "PluginsPage",
  components: {PluginListTile},
  data() {
    return {
      effects: [
        "chipcrusher",
        "FabFilter Pro-Q 3",
        "FabFilter Pro-R",
        "Gullfoss",
        "iZotope Ozone 9",
        "iZotope Neutron 3",
        "iZotope Nectar 3",
        "iZotope RX 10 Elements",
        "iZotope Trash 2",
        "iZotope VocalSynth 2",
      ],
      generators: [
        "Phase Plant",
        "Serum",
        "Spire",
        "Sylenth1",
        "Vital",
        "Synthmaster Player",
        "FLEX",
        "Harmor",
      ],
      numEffect: 1,
      numGenerator: 0,
      pluginCombo: "",
      generatorProbabilities: {},
      effectProbabilities: {},
      rerollDelayTimeout: null,
      isInDelay: false
    }
  },
  created() {
    this.initializeProbabilities();
  },
  methods: {
    clearCombo() {
      this.pluginCombo = "";
    },
    initializeProbabilities() {
      this.generators.forEach((generator) => {
        this.generatorProbabilities[generator] = 0.5;
      });
      this.effects.forEach((effect) => {
        this.effectProbabilities[effect] = 0.5;
      });
    },
    updateEffectsPluginValue(val, plugin) {
      this.effectProbabilities[plugin] = val;
    },
    updateGeneratorPluginValue(val, plugin) {
      this.generatorProbabilities[plugin] = val;
    },
    setEffectNum(val) {
      this.numEffect = val;
      if (this.numEffect === 0 && this.numGenerator === 0) {
        this.numGenerator = 1;
      }
    },
    setGeneratorNum(val) {
      this.numGenerator = val;
      if (this.numEffect === 0 && this.numGenerator === 0) {
        this.numEffect = 1;
      }
    },
    isNumEffect(val) {
      return this.numEffect === val;
    },
    isNumGenerator(val) {
      return this.numGenerator === val;
    },
    reroll() {
      let audio = new Audio("/ffft.wav");
      audio.volume = 0.25;
      audio.play();

      this.isInDelay = true;
      if (this.rerollDelayTimeout) {
        clearTimeout(this.rerollDelayTimeout);
      }
      this.rerollDelayTimeout = setTimeout(() => {
        let audio = new Audio("/bop.wav");
        audio.volume = 0.1;
        audio.play();

        this.rollPluginCombo();
        this.isInDelay = false;
      }, 500);
    },
    rollPluginCombo() {
      let generators = this.generators.slice();
      let effects = this.effects.slice();
      console.log("probability map", this.generatorProbabilities)

      let pluginCombo = "";
      for (let i = 0; i < this.numGenerator; i++) {
        // let randIndex = Math.floor(Math.random() * generators.length);
        // use probabilities instead. this is a weighted random with each weight being from 0 to 1
        pluginCombo += "<span style='color: var(--currAccent)'>"
        let randIndex = this.weightedProbability(this.generatorProbabilities, generators);
        pluginCombo += generators[randIndex];
        pluginCombo += "</span>"
        generators.splice(randIndex, 1);
        if (i < this.numGenerator - 1 || this.numEffect > 0) {
          pluginCombo += " + ";
        }
      }

      for (let i = 0; i < this.numEffect; i++) {
        let randIndex = this.weightedProbability(this.effectProbabilities, effects);
        pluginCombo += effects[randIndex];
        effects.splice(randIndex, 1);
        if (i < this.numEffect - 1) {
          pluginCombo += " + ";
        }
      }

      this.pluginCombo = pluginCombo;
    },
    weightedProbability(probabilityMap, items) {
      // items is an array of strings that are the keys of the probabilityMap
      // return the index of the item that was chosen

      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        sum += probabilityMap[items[i]];
      }

      if (sum === 0) {
        return Math.floor(Math.random() * items.length);
      }

      let rand = Math.random() * sum;

      let runningSum = 0;
      for (let i = 0; i < items.length; i++) {
        runningSum += probabilityMap[items[i]];
        if (rand < runningSum) {
          return i;
        }
      }

      return items.length - 1;
    }
  }
}
</script>

<style scoped>
.row__title-plugins {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid var(--bg3);
  margin: 5px 10px;
  padding-bottom: 5px;
}

.title__plugins {
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 10px;
  color: var(--currAccent);
}

.info__plugin-num {
  font-size: 0.8rem;
  margin-top: 5px;
  color: var(--bg3);
}

.button__reroll {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--bg1);
  height: 38px;
  border-radius: 5px;
  padding: 12px 5px 10px;
  font-size: 0.9rem;
  background-color: var(--currAccent);
  border: 1px solid var(--currAccent);
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  z-index: 10;
}

.button__reroll:hover {
  background-color: var(--bg1);
  color: var(--currAccent);
}

.icon__reroll {
  font-size: 1.3rem;
  margin-right: 5px;
}

.container__reroll-overlay {
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  width: 276px;
  top: 85px;
  height: 348px;
  border-radius: 5px;
  pointer-events: none;
}

.container__reroll-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--bg1);
  padding: 0 12px 12px;
  pointer-events: all;
  border-radius: 5px;
}

.container__reroll-config {
  background-color: var(--bg2);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px 10px 10px;
  margin-bottom: -5px;
}

.container__reroll-config.round {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.row__reroll-config {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.title__reroll-config {
  font-size: 0.9rem;
  color: var(--currAccent);
  margin-left: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info__reroll-config {
  font-size: 0.9rem;
  color: var(--bg4mute);
  font-weight: bold;
  margin-bottom: -2px;
  margin-top: -2px;
  cursor: pointer;
}

.info__reroll-config.selected {
  color: var(--currAccent);
}

.icon__rolled-plugins {
  position: relative;
  top: 5px;
  left: 5px;
  color: var(--bg4mute);
  font-size: 1rem;
  padding: 5px;
  cursor: pointer;
}

.container__rolled-plugins {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  border: 1px solid var(--bg3);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  min-height: 50px;
}

.info__rolled {
  font-size: 1rem;
  color: white;
  margin-bottom: 15px;
  padding: 0px 10px;
  font-weight: bold;
  width: 100%;
  user-select: text;
}

.grid__effect-num {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 3px;
}

.page__plugins {
  padding-bottom: 200px;
}

.container__dice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
  margin-top: -15px;
}
</style>