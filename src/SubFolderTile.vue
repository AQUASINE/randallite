<template>
  <div class="row__sub-folder">
    <div class="left__folder-tile">
      <v-icon v-if="expanded" icon="mdi-menu-down" class="icon__subfolder-tile-menu" @click="setExpanded(false)"/>
      <v-icon v-else icon="mdi-menu-right" class="icon__subfolder-tile-menu" @click="setExpanded(true)"/>
      <div class="container__folder-tile-info">
        <div class="row__folder-tile-info">
          <div class="container__box-indic">
            <div class="row__box-indic">
              <div class="indic__color-square yellow"></div>
              <div class="indic__color-square purple"></div>
            </div>
            <div class="row__box-indic">
              <div class="indic__color-square pink"></div>
              <div class="indic__color-square aqua"></div>
            </div>
          </div>
          <div class="info__subfolder-name">
            {{ folderPath }}
          </div>
        </div>
      </div>
    </div>
    <div class="right__folder-tile">
      <div class="info__num-items">
        1052
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubFolderTile',
  props: {
    folderPath: String
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    setExpanded(val) {
      this.expanded = val;
    }
  }
}
</script>
<style>


.indic__color-square {
  width: 4px;
  height: 4px;
  min-width: 4px;
  min-height: 4px;
  margin-right: 1px;
  background-color: var(--bg3);
}

.row__box-indic {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-bottom: 1px;
}

.row__box-indic .yellow {
  background-color: var(--yellow);
}

.row__box-indic .purple {
  background-color: var(--purple);
}

.row__box-indic .aqua {
  background-color: var(--aqua);
}

.row__box-indic .pink {
  background-color: var(--pink);
}

.row__sub-folder {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 1px 5px 1px 2px;
}

.row__folder-tile-info {
  display: flex;
  align-items: center;
  justify-content: left;
}

.info__subfolder-name {
  font-size: 10px;
  margin-left: 8px;
  margin-top: 2px;
}

.info__num-items {
  font-size: 10px;
  background: var(--bg4);
  width: 36px;
  height: 15px;
  border-radius: 3px;
  color: var(--bg1);
  margin-right: 10px;
  margin-top: 2px;
}

.left__folder-tile {
  display: flex;
  align-items: center;
}

.icon__subfolder-tile-menu.v-icon {
  color: var(--bg4);
  font-size: 1.3rem;
  margin: -1px 8px -4px 5px;
}

.detail__highlighted {
  color: var(--bg4);
}
</style>