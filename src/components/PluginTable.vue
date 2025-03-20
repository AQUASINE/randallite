<template>
  <div class="container__plugin-table">
    <table class="table__plugins">
      <thead>
      <tr>
        <th class="table__col-left">Plugin</th>
        <th class="table__col-right">
          <div class="left__col-right">
            <v-icon icon="mdi-dice-3-outline" class="icon__plugin-tableheader"/>
            Weight
          </div>
          <div class="right__col-right">
            <v-icon icon="mdi-restore" class="icon__restore"/>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <PluginTableRow v-for="plugin in plugins" :value="getProbability(plugin)" :name="plugin" @update="update"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import PluginTableRow from "./PluginTableRow.vue"

export default {
  name: 'PluginTable',
  components: {PluginTableRow},
  props: {
    plugins: {},
    weights: {},
    updatePluginValue: {},
  },
  methods: {
    getProbability(plugin) {
      return this.weights[plugin] || 0;
    },
    update(val, plugin) {
      this.updatePluginValue(val, plugin);
    }
  }
}
</script>
<style scoped>

.container__plugin-table {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin: 5px 10px 10px;
  border-top: 1px solid var(--bg3);
  background-color: var(--bg1);
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

.table__plugins {
  flex: 1 0 auto;
  border-collapse: collapse;
}

.icon__plugin-tableheader {
  font-size: 1rem;
  color: var(--currAccent);
  margin-right: 5px;
}

.icon__restore {
  font-size: 1rem;
  color: var(--currAccent);
  margin-left: 5px;
}

.left__col-right, .right__col-right {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

</style>