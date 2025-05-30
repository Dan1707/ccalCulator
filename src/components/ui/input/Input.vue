<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
	defaultValue?: string | number
	modelValue?: string | number
	class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
})
</script>

<template>
	<input
		v-model="modelValue"
		data-slot="input"
		class="w-full rounded-lg px-4 py-3 bg-[#191a22] border-none text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
	/>
</template>
