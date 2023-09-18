<script setup lang="ts">
import ShowList from '../components/ShowList.vue'
import { ref, onMounted } from 'vue'

const categories = ref(["Drama", "Comedy", "Children", "Action", "Romance"]);

onMounted(() => {
  console.log(`The initial count is 1`)
})

defineExpose({
  categories,
})
</script>

<template>
  <main>
    <ShowList v-for="category in categories" v-bind:key="category" v-bind:category="category" />
  </main>
</template>
