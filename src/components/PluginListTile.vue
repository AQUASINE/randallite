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
          <div class="flex__item" @click="edit">
            <div class="info__edit-list">Edit</div>
            <v-icon icon="mdi-pencil" class="icon__plugin-list-tile-right"></v-icon>
          </div>
          <div class="flex__item" @click="download">
            <div class="info__edit-list">Download</div>
            <v-icon icon="mdi-download" class="icon__plugin-list-tile-right"></v-icon>
          </div>
          <div class="flex__item" @click="upload">
            <div class="info__edit-list">Replace</div>
            <v-icon icon="mdi-upload" class="icon__plugin-list-tile-right"></v-icon>
          </div>
        </div>
      </div>
      <div v-if="isEditMode">
        <div>
          <textarea v-model="pluginList" class="input__plugin-list-tile"></textarea>
        </div>
        <div>
          <v-btn @click="savePluginList" class="btn__plugin-list-tile">Save</v-btn>
        </div>
      </div>
      <PluginTable :plugins="plugins" :update-plugin-value="updatePluginValue"
        :class="{ 'pluginsCollapsed': !isExpanded }" :weights="weights"/>
    </div>
  </div>
</template>
<script>
import store from "../store/store";
import PluginTable from "./PluginTable.vue"

export default {
  name: 'PluginListTile',
  components: { PluginTable },
  props: {
    updatePluginValue: {},
    plugins: {
      type: Array,
      default: () => []
    },
    weights: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ""
    },
  },
  emits: ['download', 'upload', 'updatedList'],
  data() {
    return {
      isExpanded: false,
      isEditMode: false,
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
    },
    edit() {
      this.isEditMode = !this.isEditMode;
      if (this.isEditMode) {
        let list = []
        this.plugins.forEach(plugin => {
          list.push(plugin.name);
        });
        this.pluginList = list.join('\n');
      }
    },
    savePluginList() {
      let list = this.pluginList.split('\n');
      let plugins = [];
      list.forEach(plugin => {
        plugins.push({ name: plugin });
      });
      this.isEditMode = false;

      this.$emit('updatedList', plugins);
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

.input__plugin-list-tile {
  height: 100px;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--bg2);

}

.btn__plugin-list-tile {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--bg2);
  color: var(--currAccent);
}

.btn__plugin-list-tile:hover {
  background-color: var(--bg2);
  color: var(--currAccent);
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

.pluginsCollapsed {
  display: none;
}
</style>