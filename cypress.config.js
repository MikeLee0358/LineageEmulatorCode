/* eslint-disable no-undef */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173/LineageEmulator/'
    },
    video: false
})
