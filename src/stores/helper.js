import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useHelperStore = defineStore('helper', () => {
    const status = reactive({
        btnBox: 'close', //close doesn't match anything, display:none ui
        isDefault: true
    })
    return {
        status
    }
})
