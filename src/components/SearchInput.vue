<script setup lang="ts">
import { useSearchStore } from "../stores/searchStore";
import { ref } from "vue";

const query = ref("");
const searchStore = useSearchStore();

const debounce = (func: () => void, delay: number) => {
  // most of the enterprise projects will usually have something like lodash where we can also find debounce
  let timeoutId: number;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

const startSearch = () => {
  searchStore.setSearching(true);
};

const handleSearch = () => {
  searchStore.setDirty();
  searchStore.setQuery(query.value);
};

const debouncedHandleSearch = debounce(handleSearch, 300);
</script>

<template>
  <header>
    <div class="search-container">
      <i class="search-icon">&#128269;</i>
      <input
        type="text"
        @focus="startSearch"
        v-model="query"
        @input="debouncedHandleSearch"
        placeholder="Search"
      />
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-background);
}
.search-container {
  display: flex;
  align-items: center;
  background-color: var(--color-background);
  border-radius: 25px;
  padding: 5px 10px;
  border: 2px solid var(--color-border);
}

input[type="text"] {
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  width: 150px; /* Adjust the width as needed */
}

.search-icon {
  font-size: 18px;
  margin-right: 5px;
}
</style>
