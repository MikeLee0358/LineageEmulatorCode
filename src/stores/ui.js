import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
    const ui = reactive({
        btnBox: 'close', //close doesn't match anything, display:none ui
        isDefault: true
    })
    return {
        ui
    }
})
