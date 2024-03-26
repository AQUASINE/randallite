<template>
  <div class="row__registered-folder">
    <div class="left__folder-tile">
      <v-icon v-if="expanded" icon="mdi-menu-down" class="icon__folder-tile-menu" @click="setExpanded(false)"/>
      <v-icon v-else icon="mdi-menu-right" class="icon__folder-tile-menu" @click="setExpanded(true)"/>
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
          <div class="info__folder-name">
            {{ folderName }}
          </div>
        </div>
        <div class="info__file-location" v-html="formattedPath">
        </div>
      </div>
    </div>
    <div class="right__folder-tile">
      <div class="info__num-items">
        1052
      </div>
    </div>
  </div>
  <div class="container__subfolders">
    <SubFolderTile v-for="folder in subFolders" :folder-path="folder"/>
  </div>
</template>
<script>
import SubFolderTile from "../SubFolderTile.vue";

export default {
  name: 'RootFolderTile',
  components: {SubFolderTile},
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
    },
  },
  computed: {
    folderName() {
      return this.folderPath.split("/").pop();
    },
    formattedPath() {
      // put file name in span so that it can be highlighted,
      // truncate middle of path if longer than 30 chars

      // remove foldername
      let path = this.folderPath.slice(0, this.folderPath.length - this.folderName.length);

      let pathLength = path.length + this.folderName.length;
      if (pathLength > 30) {
        let numCharsToTruncate = pathLength - 30;
        let firstHalf = path.slice(0, path.length / 2 - numCharsToTruncate / 2);
        let secondHalf = path.slice(path.length / 2 + numCharsToTruncate / 2, path.length);
        path = firstHalf + "..." + secondHalf;
      }
      return path + "<span class='detail__highlighted'>" + this.folderName + "</span>";
    },
    subFolders() {
      return ["3DS UI", "Amherst Drums (Official Verified)", "Cartoon Sound Effects 100% Best"];
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

.row__registered-folder {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 3px 5px 3px 2px;
}

.row__folder-tile-info {
  display: flex;
  align-items: center;
  justify-content: left;
}

.info__folder-name {
  font-size: 14px;
  margin-left: 8px;
  margin-top: 2px;
}

.info__file-location {
  font-size: 11px;
  color: var(--bg3);
  margin-top: -4px;
  text-align: left;
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

.icon__folder-tile-menu.v-icon {
  color: var(--bg4);
  font-size: 1.5rem;
  margin-left: 5px;
  margin-right: 5px;
}

.detail__highlighted {
  color: var(--bg4);
}

.container__subfolders {
  width: 100%;
  background-color: var(--bg2);
  padding-bottom: 5px;
  padding-top: 3px;
}
</style>