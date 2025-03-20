<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const isExpanded = ref(false);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const props = defineProps({
  question: String,
  answer: String,
});
</script>

<template>
  <div class="faq-tile">
    <div class="faq-tile__question" @click="toggleExpanded">
      <h3 class="header__question">{{ props.question }}</h3>
      <v-icon :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="icon__expand" :class="{ 'icon__expand--expanded': isExpanded }"></v-icon>
    </div>
    <div class="faq-tile__answer" v-if="isExpanded">
      <p>{{ props.answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.faq-tile {
  padding: 8px;
  width: 100%;
  cursor: pointer;
}

.faq-tile__question {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.faq-tile__answer {
  margin-top: 8px;
}

.header__question {
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
}

.icon__expand {
  font-size: 1.5rem;
  color: var(--currAccent);
}

</style>