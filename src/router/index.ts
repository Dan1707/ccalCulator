import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/homeView.vue'
import DefaultLayout from '@/layouts/defaultLayout.vue'

const routes = [
	{
		path: '/',
		name: 'Public',
		component: DefaultLayout,
		children: [{ path: '/', component: HomeView, name: 'home' }],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
