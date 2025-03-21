<template>
  <div class="page__plugins">
    <div class="row__title-plugins">
      <div class="title__plugins">Plugins</div>
      <div class="info__plugin-num">{{ generators.length }} generators, {{ effects.length }} effects</div>
    </div>
    <input type="file" id="generatorFile" ref="generatorFile" style="display: none"/>
    <input type="file" id="effectsFile" ref="effectsFile" style="display: none"/>
    <PluginListTile :plugins="generators" name="Generators" :update-plugin-value="updateGeneratorPluginValue" :weights="generatorWeights"
                    @download="downloadGenerators" @upload="uploadGenerators" @updatedList="updateGenerators"/>
    <PluginListTile :plugins="effects" name="Effects" :update-plugin-value="updateEffectsPluginValue" :weights="effectWeights"
                    @download="downloadEffects" @upload="uploadEffects" @updatedList="updateEffects"/>
    <div class="container__recent-rows" v-if="pluginCombo">
      <h3 class="header__adjust">Adjust</h3>
      <table class="table__recent-rows">
        <thead>
        <tr>
          <th class="table__col-left"></th>
          <th class="table__col-right">
          </th>
        </tr>
        </thead>
        <tbody>
        <PluginTableRow v-if="selectedGenerator" :name="selectedGenerator" :key="selectedGenerator"
                        :value="generatorWeights[selectedGenerator]" @update="updateGeneratorPluginValue"/>
        <PluginTableRow v-for="effect in selectedEffects" :name="effect" :value="effectWeights[effect]" :key="effect" @update="updateEffectsPluginValue"/>
        </tbody>
      </table>
    </div>
    <div class="container__reroll-overlay">
      <div class="container__reroll-box">
        <div class="container__rolled-plugins" :class="{hide: !(pluginCombo || isInDelay)}">
          <v-icon icon="mdi-close" class="icon__rolled-plugins" @click="clearCombo"/>
          <div class="container__dice" v-if="isInDelay">
            <img src="/dice2.gif" alt="dice" class="img__reroll"/>
          </div>
          <div class="info__rolled" v-else v-html="pluginCombo">
          </div>
        </div>
        <div class="container__reroll-config" :class="{round: !(pluginCombo || isInDelay)}">
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
          Randomize
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PluginListTile from "./PluginListTile.vue";
import {mapState} from "vuex";
import PluginTableRow from "./PluginTableRow.vue";

export default {
  name: "PluginsPage",
  components: {PluginTableRow, PluginListTile},
  data() {
    return {
      // effects: [
      //   "chipcrusher",
      //   "FabFilter Pro-Q 3",
      //   "FabFilter Pro-R",
      //   "Gullfoss",
      //   "iZotope Ozone 9",
      //   "iZotope Neutron 3",
      //   "iZotope Nectar 3",
      //   "iZotope RX 10 Elements",
      //   "iZotope Trash 2",
      //   "iZotope VocalSynth 2",
      // ],
      // generators: [
      //   "Phase Plant",
      //   "Serum",
      //   "Spire",
      //   "Sylenth1",
      //   "Vital",
      //   "Synthmaster Player",
      //   "FLEX",
      //   "Harmor",
      // ],
      pluginCombo: "",
      selectedGenerator: -1,
      selectedEffects: [],
      // generatorProbabilities: {},
      // effectProbabilities: {},
      rerollDelayTimeout: null,
      isInDelay: false
    }
  },
  computed: {
    ...mapState(['generators', 'effects', 'numGenerators', 'numEffects', 'generatorWeights', 'effectWeights']),
  },
  methods: {
    clearCombo() {
      this.pluginCombo = "";
      this.selectedGenerator = null;
      this.selectedEffects = [];
    },
    setEffectNum(val) {
      this.$store.commit("setNumEffects", val)
      if (val === 0 && this.numGenerators === 0) {
        this.$store.commit("setNumGenerators", 1)
      }
    },
    setGeneratorNum(val) {
      this.$store.commit("setNumGenerators", val);
      if (val === 0 && this.numEffects === 0) {
        this.$store.commit("setNumEffects", 1)
      }
    },
    updateGeneratorPluginValue(val, plugin) {
      this.$store.commit("updateGeneratorWeight", {name: plugin, weight: val});
    },
    updateEffectsPluginValue(val, plugin) {
      this.$store.commit("updateEffectWeight", {name: plugin, weight: val});
    },
    isNumEffect(val) {
      return this.numEffects === val;
    },
    isNumGenerator(val) {
      return this.numGenerators === val;
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
      let generators = JSON.parse(JSON.stringify(this.generators));
      let generatorWeights = JSON.parse(JSON.stringify(this.generatorWeights));
      let effects = JSON.parse(JSON.stringify(this.effects));
      let effectWeights = JSON.parse(JSON.stringify(this.effectWeights));

      this.selectedGenerator = ""
      this.selectedEffects = []

      let pluginCombo = "";
      for (let i = 0; i < this.numGenerators; i++) {
        // let randIndex = Math.floor(Math.random() * generators.length);
        // use probabilities instead. this is a weighted random with each weight being from 0 to 1
        pluginCombo += "<span style='color: var(--currAccent)'>"
        let randIndex = this.weightedProbability(generators, generatorWeights);
        this.selectedGenerator = generators[randIndex];
        pluginCombo += generators[randIndex];
        pluginCombo += "</span>"
        generators.splice(randIndex, 1);
        if (i < this.numGenerators - 1 || this.numEffects > 0) {
          pluginCombo += " + ";
        }
      }

      for (let i = 0; i < this.numEffects; i++) {
        if (!effects || effects.length === 0) {
          break;
        }
        let randIndex = this.weightedProbability(effects, effectWeights);
        this.selectedEffects.push(effects[randIndex]);
        pluginCombo += effects[randIndex];
        if (i < this.numEffects - 1) {
          pluginCombo += " + ";
        }
      }

      this.pluginCombo = pluginCombo;
    },
    weightedProbability(items, weights) {
      // items is an array of strings that are the keys of the probabilityMap
      // return the index of the item that was chosen

      let sum = 0;
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        if (weights[items[i]] === undefined) {
          console.log("undefined weight", items[i]);
          console.log("weights", weights);
          console.log("items", items);
          console.log("item", items[i]);
        }
        sum += weights[items[i]];
      }

      console.log("sum", sum);

      if (sum === 0) {
        return Math.floor(Math.random() * items.length);
      }

      let rand = Math.random() * sum;

      let runningSum = 0;
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        count += 1;
        runningSum += weights[items[i]];
        if (rand < runningSum) {
          return i;
        }
        if (count > 50000) {
          console.log("count exceeded 100");
          break;
        }
      }

      return items.length - 1;
    },
    downloadGenerators() {
      this.$store.dispatch("downloadGenerators");
    },
    uploadGenerators() {
      this.$refs.generatorFile.click();

      this.$refs.generatorFile.addEventListener("change", (e) => {
        let file = e.target.files[0];
        this.$store.dispatch("loadGeneratorsFromFile", file);
      });
    },
    downloadEffects() {
      this.$store.dispatch("downloadEffects");
    },
    uploadEffects() {
      this.$refs.effectsFile.click();

      this.$refs.effectsFile.addEventListener("change", (e) => {
        let file = e.target.files[0];
        this.$store.dispatch("loadEffectsFromFile", file);
      });
    },
    updateGenerators(plugins) {
      console.log("updating generators", plugins);
      this.$store.commit("setGenerators", plugins);
    },
    updateEffects(plugins) {
      console.log("updating effects", plugins);
      this.$store.commit("setEffects", plugins);
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
  margin-top: 10px;
  display: flex;
  flex-direction: column-reverse;
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
  height: 58px;
}

.container__rolled-plugins.hide {
  opacity: 0;
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
  width: 800px;
  height: 100%;
  padding: 20px;
  background-color: var(--bg1);
  z-index: 1;
  border-radius: 8px;
  border: 1px solid var(--currAccent);
  margin-bottom: 40px;
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

.table__col-left {
  flex: 1 0 auto;
  border-bottom: 1px solid var(--bg3);
  border-right: 1px solid var(--bg3);
  padding: 3px 0px;
  width: 40%;
  font-size: 0.8rem;
  color: var(--currAccent);
  font-weight: normal;
  text-align: left;
}

.table__col-right {
  flex: 1 0 auto;
  border-bottom: 1px solid var(--bg3);
  padding: 5px 6px;
  font-size: 0.8rem;
  color: var(--currAccent);
  font-weight: normal;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.container__recent-rows {
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}

.table__recent-rows {
  width: 100%;
}

.header__adjust {
  width: 100%;
  text-align: left;
  margin-top: 1rem;
  color: var(--currAccent);
}
</style>