<script setup lang="ts">
import ShowList from '../components/ShowList.vue'
import { ref } from 'vue'

const categories = ref<string[]>(["Drama", "Comedy", "Children", "Action", "Romance"]);

defineExpose({
  categories,
})
</script>

<template>
  <main>
    <ShowList v-for="category in categories" v-bind:key="category" v-bind:category="category" />
  </main>
</template>
