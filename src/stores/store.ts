import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCaloriesStore = defineStore('calories', () => {
	const intake = ref(0)
	return { intake }
})
