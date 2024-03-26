<template>
  <tr>
    <td class="td__plugin-name">
      {{ formattedName }}
    </td>
    <td class="td__weight-slider">
      <input type="number" min="0" max="1" step="0.01" class="num__weight-input" @input="emitUpdate"
             v-model="localValue"/>
      <v-slider class="slider__weight" thumb-size="13" thumb-color="white" color="var(--currAccent)"
                track-color="var(--bg4)" v-model="localValue" min="0" max="1" step="0.01"/>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'PluginTableRow',
  props: {
    value: {
      type: Number,
      default: 0.5,
    },
    name: {
      type: String,
      default: 'Plugin Name',
    },
  },
  emits: ['update'],
  computed: {
    formattedName() {
      if (this.name.length > 15) {
        // put ellipsis in the middle of the name
        return this.name.slice(0, 5) + '...' + this.name.slice(-8);
      }
      return this.name;
    }
  },
  data() {
    return {
      localValue: this.value,
    }
  },
  methods: {
    emitUpdate() {
      this.localValue = parseFloat(this.localValue.toFixed(2));
      this.localValue = this.clamp(this.localValue);
      this.$emit('update', this.localValue, this.name);
    },
    clamp(val) {
      return Math.min(Math.max(val, 0), 1);
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
    localValue() {
      this.emitUpdate();
    }
  }
}
</script>
<style scoped>

.td__plugin-name {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  color: var(--bg4);
  font-size: 0.8rem;
  text-align: left;
  padding: 2px 0;
  border-right: 1px solid var(--bg3);
}

.td__weight-slider {
  flex: 1 0 auto;
  color: var(--bg4);
  font-size: 0.8rem;
  text-align: left;
  padding: 2px 8px;
  display: flex;
  flex-direction: row;
}

.num__weight-input {
  width: 35px;
  height: 18px;
  border-radius: 5px;
  background-color: var(--bg4);
  color: var(--bg1);
  font-size: 0.8rem;
  text-align: center;
  margin-right: 5px;
  margin-top: 2px;
}

.num__weight-input:focus {
  outline: none;
}

.num__weight-input::-webkit-inner-spin-button,
.num__weight-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.slider__weight {
  flex: 1 0 auto;
  margin-bottom: -30px;
  margin-top: -5px;
  margin-inline-start: 8px !important;
  margin-inline-end: 3px !important;
}
</style>