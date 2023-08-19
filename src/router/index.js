import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/roles',
            name: 'roles',
            component: () => import('@/views/RolesPage.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/views/LogoutPage.vue')
        },
        {
            path: '/:gender(male|female)/:role(elf|mage|royal|knight|darkElf)',
            name: 'singlePlayer',
            component: () => import('@/views/SinglePlayer.vue')
        },
        { path: '/:pathMatch(.*)*', redirect: '/login' }
    ]
})

export default router
