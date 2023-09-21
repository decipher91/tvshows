<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '../stores/loadingStore';
import LoadingSpinner from './LoadingSpinner.vue';
import { type ShowDto } from '../models/show';
import { API_URL } from "../constants";

const props = defineProps(['category'])
const shows = ref<ShowDto[]>([]);
const loadingStore = useLoadingStore();
const { loading } = storeToRefs(useLoadingStore())

onMounted(async () => {
  try {
    loadingStore.setLoading(true);
    const response = await fetch(`${API_URL}search/shows?q=${props.category}`);
    const data = await response.json();
    shows.value = data;
    loadingStore.setLoading(false);

    return { data }
  } catch (e) {
    loadingStore.setLoading(false);
  }
})

defineExpose({
  shows,
})
</script>

<template>
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div v-else>
        <div class="gallery-title">{{ category }}</div>
        <div class="gallery-container">
            <router-link
                v-for="show in shows" v-bind:key="show.show.id"
                :to="{
                name: 'show',
                params: {
                    id: show.show.id
                }
            }">
                <img class="image" :src="show.show.image?.medium" />
            </router-link>
    </div>
    </div>
</template>

<style scoped>
    .gallery-title {
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        margin-right: 20px;
        margin-top: 10px;
        
    }
    .gallery-container {
        width: 100%;
        overflow-x: scroll;
        white-space: nowrap;
    }

    .image {
        display: inline-block;
        margin-right: 10px;
        width: 200px;
        height: 250px;
    }
</style>