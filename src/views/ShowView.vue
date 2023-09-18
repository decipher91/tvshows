<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '../stores/loadingStore';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { API_URL } from "../constants";

const show = ref(null);
const loadingStore = useLoadingStore();
const { loading } = storeToRefs(useLoadingStore())
const route = useRoute()

onMounted(async () => {
  
  try {
    loadingStore.setLoading(true);
    const response = await fetch(`${API_URL}shows/${route.params.id}`);
    const data = await response.json();
    console.log(data);
    show.value = data;
    loadingStore.setLoading(false);

    return { data }
  } catch (e) {
    loadingStore.setLoading(false);
  }
})

defineExpose({
  show,
})
</script>

<template>
  <LoadingSpinner v-if="loading"></LoadingSpinner>
  <div class="show" v-else>
    <div class="container" >
        <img class="show-poster" :src="show?.image?.medium" alt="TV Show Poster">
        <div class="show-info">
            <h1>{{ show?.name }}</h1>
            <p><strong>Average Runtime:</strong> {{ show?.averageRuntime }} minutes</p>
            <p><strong>Network:</strong> {{ show?.network.name }}</p>
            <p><strong>Official Site:</strong> <a :href="show?.officialSite" target="_blank">Visit Website</a></p>
            <p><strong>Premiere Date:</strong> {{ show?.premiered }}</p>
        </div>
    </div>
    <p class="summary" v-html="show?.summary"></p>
  </div>
</template>

<style scoped>

  .show {
    display: flex;
    flex-direction: column;
  }
  .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: row;
        }

        .show-poster {
            margin-right: 20px;
        }

        .show-info {
            overflow: hidden;
        }

        .show-info h1 {
            font-size: 24px;
            margin-top: 0;
        }

        .show-info p {
            margin: 0;
        }

        .show-info a {
            text-decoration: none;
            color: #0077cc;
        }

        strong {
          font-weight: 700;
        }
</style>
