<template>
  <div class="page__library">
    <div class="row__header-library">
      <div class="row__title-library">
        <h2 class="title__library">Library</h2>
        <div class="info__selected-num">
          419 / 2599 selected
        </div>
      </div>
      <v-icon icon="mdi-refresh" class="icon__rescan"/>
    </div>
    <div class="container__folder-select" @click="browseFolder" @drop.prevent="addFolder">
      <v-icon icon="mdi-folder-plus-outline" class="icon__folder-select"/>
      <div class="text__folder-select">Drag & drop folders here, or click to add</div>
    </div>
    <RootFolderTile v-for="folder in rootFolders" :folder-path="folder"/>
  </div>
</template>
<script>
import RootFolderTile from "./RootFolderTile.vue"
import {mapState} from "vuex";
import {ipcRenderer} from "electron";


export default {
  name: 'LibraryPage',
  components: {RootFolderTile},
  computed: {
    ...mapState('library', ['rootFolders'])
  },
  methods: {
    async browseFolder() {
      const result = await ipcRenderer.invoke('browse-folder');
      console.log(result);
    },
    addFolder() {
      console.log("add folder")
    }
  }
}
</script>
<style>


.page__library {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.title__library {
  color: var(--currAccent);
  font-size: 1.35rem;
  text-align: left;
  padding: 5px 12px;
}

.info__selected-num {
  font-size: 13px;
  color: var(--bg3);
  margin-top: 8px;
  margin-left: -5px;
}

.row__title-library {
  display: flex;
  justify-content: left;
  width: 100%;
  align-items: center;
}

.container__folder-select {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  border-bottom: 1px dashed var(--bg3);
  border-radius: 5px;
  margin-top: 10px;
  padding: 0 10px 15px 10px;
  color: var(--bg4);
  font-size: 0.7rem;
}

.icon__folder-select {
  color: var(--bg4);
  font-size: 1.5rem;
  margin-right: 10px;
}


.row__header-library {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.icon__rescan {
  padding: 15px;
  margin-top: 7px;
  margin-right: 10px;
  font-size: 1.3rem !important;
  color: var(--bg3);
  transition: color 0.2s ease-in-out;
}

.icon__rescan:hover {
  color: var(--bg4);
}
</style>