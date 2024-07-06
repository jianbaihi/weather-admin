import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useNetworkStore = defineStore('network', ()=>{
    const networkError = ref(false)
    const networkLoading = ref(false)
    return{
        networkError,
        networkLoading,

    }
})