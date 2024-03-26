<template>
  <div class="container__browser-section">
    <div class="item__browser-tooltip">
      <span class="color-y">Color Mode</span> is enabled. Select a folder in the Library and press <span
        class="color-a">1</span> through <span class="color-m">4</span> on your keyboard to assign it a color.
    </div>
    <div class="container__browser-tabset">
      <div class="row__browser-tabs">
        <BrowserTab v-for="tab in browserTabs" :icon="tab.icon" :selected="isSelected(tab.id)"
                    @click="setSelected(tab.id)"/>
      </div>

      <vue-custom-scrollbar :settings="{
          suppressScrollX: true,
          suppressScrollY: false
        }" class="container__scroll-area">

        <div class="container__browser">
          <LibraryPage v-if="isSelected('library')"/>
          <PluginsPage v-if="isSelected('plugins')"/>
          <ParamsPage v-if="isSelected('config')"/>
          <ListsPage v-if="isSelected('lists')"/>
          <FavoritesPage v-if="isSelected('favorites')"/>
        </div>
      </vue-custom-scrollbar>
    </div>
  </div>
</template>
<script>
import BrowserTab from "./BrowserTab.vue";
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import LibraryPage from "./LibraryPage.vue";
import PluginsPage from "./PluginsPage.vue";
import ParamsPage from "./ParamsPage.vue";
import FavoritesPage from "./FavoritesPage.vue";
import ListsPage from "./ListsPage.vue";

export default {
  name: 'BrowserSection',
  components: {ListsPage, FavoritesPage, ParamsPage, PluginsPage, LibraryPage, BrowserTab, vueCustomScrollbar},
  data() {
    return {
      selectedTab: "library",
      browserTabs: [
        {
          id: 'config',
          icon: 'mdi-tune',
        },
        {
          id: 'favorites',
          icon: 'mdi-heart'
        },
        {
          id: 'library',
          icon: 'mdi-music-box-multiple-outline'
        },
        {
          id: 'plugins',
          icon: 'mdi-power-plug'
        },
        {
          id: 'lists',
          icon: 'mdi-list-box-outline'
        }
      ]
    }
  },
  methods: {
    isSelected(val) {
      return val === this.selectedTab;
    },
    setSelected(val) {
      this.selectedTab = val;
    }
  }
}
</script>
<style>

.item__browser-tooltip {
  font-size: 11px;
  line-height: 1.3;
  color: var(--bg4);
  text-align: left;
  padding: 14px;
  overflow: hidden;
}

.container__browser {
  flex: 1 0 auto;
  background-color: var(--bg1);
}

.container__browser-section {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}

.container__browser-tabset {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}


.row__browser-tabs {
  display: flex;
  margin-left: 20px;
  margin-bottom: -20px;
}

.container__scroll-area {
  border: 1px solid var(--bg3);
  border-radius: 5px;
  height: 350px;
  margin: 14px;
  position: relative;
  background-color: var(--bg1);
}

.container__scroll-area .ps__rail-y {
  background-color: transparent !important;
  opacity: 0;
  border-radius: 5px;
  padding-right: 5px;
}

.container__scroll-area .ps__rail-y:hover {
  background-color: var(--bg1);
  opacity: 0.5;
}

.container__scroll-area .ps__thumb-y {
  background-color: var(--bg3) !important;
  border-radius: 5px;
  right: 3px;
}


</style>