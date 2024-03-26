<template>
  <div class="container__file-info">
    <div class="item__file-name">
      {{filename}}<span class="file-extension">.{{extension}}</span>
    </div>
    <div class="item__file-location">
      <v-icon icon="mdi-folder-outline" class="icon__file-location"/>
      <a class="link__file-location" @click="openFileLocation">{{location}}</a>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapState} from "vuex";
import {shell} from "electron";
import store from "./store/store";

export default {
  name: 'FileInfoBar',
  computed: {
    ...mapState('player', ['sample']),
    filename() {
      let res = this.sample.split("/").pop();
      res = res.split(".").shift();
      res = this.truncateWithEllipses(res, 20)
      return res;
    },
    extension() {
      let res = this.sample.split(".").pop();
      return res;
    },
    location() {
      let res = this.sample.split("/").slice(0, -1).join("/");
      res = this.truncateWithEllipses(res, 30)
      return res;
    }
  },
  methods: {
    openFileLocation() {
      let forwardSlashes = this.sample.replaceAll("/", "\\");
      // replace spaces with %20
      forwardSlashes = forwardSlashes.replaceAll(" ", "%20");
      console.log("open file location", forwardSlashes)
      shell.showItemInFolder(forwardSlashes)
    },
    truncateWithEllipses(str, maxChar) {
      // put ellipses in middle of string. put maxChar/2 on each side
      if (str.length > maxChar) {
        let left = str.slice(0, maxChar / 2);
        let right = str.slice(-maxChar / 2);
        return left + "..." + right;
      } else {
        return str;
      }
    }
  },
}
</script>
<style>

.item__file-name {
  font-weight: bold;
  text-wrap: none;
  margin-bottom: -2px;
}

.file-extension {
  font-weight: normal;
  color: var(--bg4);
}

.container__file-info {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
}

.link__file-location {
  text-decoration: underline;
  color: var(--bg4);
  font-size: 14px;
  cursor: pointer;
}

</style>