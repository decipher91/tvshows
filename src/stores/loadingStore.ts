import { defineStore } from 'pinia'

interface LoadingState {
  loading: boolean;
}

export const useLoadingStore = defineStore('loadingStore', {
  state: (): LoadingState => ({
    loading: false,
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
})
