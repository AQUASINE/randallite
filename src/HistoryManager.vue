<style>
.title__history {
  font-weight: bold;
  color: var(--bg4);
  font-size: 14px;
}

.row__history {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 70px;
  padding: 0px 14px;
}

.container__history-items {
  flex: 1 0 auto;
  height: 35px;
  background-color: var(--bg2);
  border-radius: 5px;
  border: 1px solid var(--bg3);
  margin-left: 14px;
  margin-right: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.item__history-point {
  width: 7px;
  height: 7px;
  border-radius: 4px;
  opacity: 50%;
  background-color: var(--bg4);
}

.item__history-point.selected {
  opacity: 100%;
}

.item__history-point.yellow {
  background-color: var(--yellow);
}

.item__history-point.purple {
  background-color: var(--purple);
}

.item__history-point.aqua {
  background-color: var(--aqua);
}

.item__history-point.pink {
  background-color: var(--pink);
}

.item__updown-ctrls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  color: var(--bg3);
  margin-right: -2px;
  margin-left: -2px;
}

.icon__up.enabled, .icon__down.enabled {
  color: var(--bg4);
  cursor: pointer !important;
}

.icon__up {
  margin-bottom: -5px;
  cursor: default !important;
}

.icon__down {
  margin-top: -5px;
  cursor: default !important;
}

.wrap__history-point {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  width: 17px;
  border-radius: 9px;
  border: 1px solid transparent;
}

.wrap__history-point.selected {
  border: 1px solid var(--bg4);
}

</style>
<template>
  <div class="container__history">
    <div class="row__history">
      <div class="title__history">
        History
      </div>
      <div class="container__history-items">
        <div v-for="(point, ind) in historyPoints" class="wrap__history-point" :class="{selected: isSelected(ind)}"
             @click="selectHistoryItem(ind)">
          <div class="item__history-point"
               :class="`${colorFromPoint(point)} ${isSelected(ind)}`"
               ></div>
        </div>
        <div class="item__updown-ctrls">
          <v-icon icon="mdi-triangle-small-up" class="icon__up" :class="{enabled: isLeftPossible}" @click="moveLeft"></v-icon>
          <v-icon icon="mdi-triangle-small-down" class="icon__down" :class="{enabled: isRightPossible}" @click="moveRight"></v-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import store from "./store/store";

export default {
  name: 'HistoryManager',
  computed: {
    ...mapState('history', ['history']),
    ...mapState('player', ['sample']),
    historyPoints() {
      // pad history with null until it is length 16
      let paddedHistory = this.history.slice();
      // reverse so that most recent is at the end
      paddedHistory.reverse();
      while (paddedHistory.length < 16) {
        paddedHistory.push(null);
      }
      return paddedHistory;
    },
    isLeftPossible() {
      return this.selectedInd > 0 && this.historyPoints[this.selectedInd - 1] !== null;
    },
    isRightPossible() {
      return this.selectedInd < this.historyPoints.length - 1 && this.historyPoints[this.selectedInd + 1] !== null;
    }
  },
  watch: {
    sample: function (val) {
      if (val !== this.historyPoints[this.selectedInd]?.path) {
        this.selectedInd = -1;
      }
    }
  },
  methods: {
    colorFromPoint(point) {
      if (point === null) {
        return "";
      }
      switch (point.accentNum) {
        case 0:
          return "yellow";
        case 1:
          return "purple";
        case 2:
          return "aqua";
        case 3:
          return "pink";
      }
      return "";
    },
    isSelected(ind) {
      if (ind === this.selectedInd) {
        return "selected";
      }
      return "";
    },
    selectHistoryItem(ind) {
      if (this.historyPoints[ind] === null) {
        return;
      }
      this.selectedInd = ind;
      store.dispatch("player/loadHistoryEntry", this.historyPoints[ind]);
    },
    moveLeft() {
      if (!this.isLeftPossible) {
        return;
      }
      this.selectHistoryItem(this.selectedInd - 1);
    },
    moveRight() {
      if (!this.isRightPossible) {
        return;
      }
      this.selectHistoryItem(this.selectedInd + 1);
    }
  },
  data() {
    return {
      selectedInd: -1,
    }
  }
}
</script>