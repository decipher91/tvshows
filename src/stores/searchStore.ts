import { defineStore } from 'pinia'

interface SearchState {
  isSearching: boolean;
  query: string;
  pristine: boolean;
}

export const useSearchStore = defineStore('searchStore', {
  state: (): SearchState => ({
    isSearching: false,
    pristine: true,
    query: "",
  }),
  actions: {
    setSearching(searching: boolean) {
      this.isSearching = searching;
    },
    setQuery(query: string) {
        this.query = query;
    },
    setDirty() {
      this.pristine = false;
    }
  },
})
