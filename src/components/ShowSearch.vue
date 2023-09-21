<script setup lang="ts">
import { useSearchStore } from "../stores/searchStore";
import { API_URL } from "../constants";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import type { Show, ShowDto } from "../models/show";

const tvShows = ref<Show[]>([]);
const loading = ref(false);
const searchStore = useSearchStore();
const { pristine } = storeToRefs(useSearchStore());

watch(
  () => searchStore.query,
  () => {
    search();
  },
);

async function search() {
  if (searchStore.query?.length) {
    loading.value = true;
    try {
      const response = await fetch(
        `${API_URL}search/shows?q=${searchStore.query}`,
      );
      const data = await response.json();
      tvShows.value = data.map((item: ShowDto) => item.show);
      return { tvShows };
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading.value = false;
    }
  } else {
    tvShows.value = [];
  }
}
</script>

<template>
  <div class="tv-shows">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="tvShows.length > 0" class="tv-show-list">
      <img
        v-for="tvShow in tvShows"
        :key="tvShow.id"
        :src="tvShow.image?.medium"
        alt="TV Show"
      />
    </div>
    <div v-if="!pristine && !tvShows.length" class="no-results">
      No results found
    </div>
    <div v-if="pristine" class="no-results">Type to start searching</div>
  </div>
</template>

<style scoped>
.tv-shows {
  position: absolute;
  width: 1280px;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.tv-show-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.tv-show-list img {
  width: 200px;
  height: 250px;
  margin-right: 10px;
  border: 1px solid #333; /* White border around images */
}

.no-results {
  font-size: 24px;
  margin-top: 20px;
}
</style>
