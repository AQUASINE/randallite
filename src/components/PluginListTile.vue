<template>
  <div class="tile__plugin-list">
    <div class="container__plugin-list-tile">
      <div class="row__plugin-list-tile">
        <div class="left__plugin-list-tile">
          <v-icon :icon="isExpanded ? 'mdi-menu-down' : 'mdi-menu-right'" class="icon__plugin-list-tile"
                  @click="toggleExpanded"></v-icon>
          <div class="title__plugin-list-tile">{{ name }}</div>
        </div>
        <div class="right__plugin-list-tile">
          <div class="flex__item" @click="download">
            <div class="info__edit-list">Download List</div>
            <v-icon icon="mdi-download" class="icon__plugin-list-tile-right"></v-icon>
          </div>
          <div class="flex__item" @click="upload">
            <div class="info__edit-list">Replace List</div>
            <v-icon icon="mdi-upload" class="icon__plugin-list-tile-right"></v-icon>
          </div>
        </div>
      </div>
      <PluginTable v-if="isExpanded" :plugins="plugins" :update-plugin-value="updatePluginValue"/>
    </div>
  </div>
</template>
<script>
import PluginTable from "./PluginTable.vue"

export default {
  name: 'PluginListTile',
  components: {PluginTable},
  props: {
    updatePluginValue: {},
    plugins: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ""
    },
  },
  emits: ['download', 'upload'],
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    download() {
      this.$emit('download');
    },
    upload() {
      this.$emit('upload');
    }
  }
}
</script>
<style scoped>

.row__plugin-list-tile {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.left__plugin-list-tile {
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.right__plugin-list-tile {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.info__edit-list {
  font-size: 0.75rem;
  margin-right: 5px;
  color: var(--currAccent);
}

.icon__plugin-list-tile {
  font-size: 1.6rem;
  color: var(--currAccent);
  margin-left: 6px;
}

.title__plugin-list-tile {
  font-size: 0.85rem;
  margin-left: 5px;
  margin-top: 2px;
  color: var(--currAccent);
}

.icon__plugin-list-tile-right {
  font-size: 1.2rem;
  color: var(--currAccent);
  margin-right: 12px;
}

.flex__item {
  display: flex;
  cursor: pointer;
}
</style>