<script setup>
import { ref } from "vue";

const currFrame = ref(0);
const frames = 3;

const randOverlay = ref(0);
const overlayFrames = 6;

const interval = setInterval(() => {
    currFrame.value = (currFrame.value + 1) % frames;
    randOverlay.value = Math.floor(Math.random() * overlayFrames);
}, 250);

</script>

<template>
<div class="container__character-image">
    <img :src="`/randallite-char${currFrame + 1}.png`" alt="netcat" class="item__char" />
    <img :src="`/randallite-overlay${randOverlay + 1}.png`" alt="netcat" class="item__overlay" />
</div>
</template>

<style scoped>
.container__character-image {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 1;
}

.item__char {
    width: 552px;
    height: 768px;
    position: relative;
    top: 0;
    left: 0;
    margin-right: -552px;
}

.item__overlay {
    width: 552px;
    height: 768px;
    position: relative;
    top: 0;
    left: 0;
}

</style>