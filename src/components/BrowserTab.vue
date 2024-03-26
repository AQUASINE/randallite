<template>
  <div class="item__tab" :class="{selected: selected}">
    <v-icon :icon="icon"/>
  </div>
</template>
<script>
export default {
  name: 'BrowserTab',
  props: ['icon', 'selected']
}
</script>
<style>

.item__tab {
  width: 44px;
  height: 33px;
  background-color: var(--bg1);
  border-radius: 5px;
  border: 1px solid var(--bg3);
  color: var(--bg3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  margin-right: 1px;
}

.item__tab.selected {
  border: 1px solid var(--currAccent);
  color: var(--currAccent);
}

.item__tab .v-icon {
  font-size: 1.25rem
}

</style>