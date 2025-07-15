<script lang="ts" setup>
defineProps<{
	progress: number | null
}>()
</script>

<template>
	<div class="relative w-24 h-24 rounded-full">
		<svg class="w-full h-full transform -rotate-90">
			<circle
				class="text-gray-300"
				stroke-width="8"
				stroke="currentColor"
				fill="transparent"
				r="40"
				cx="50%"
				cy="50%"
			/>
			<circle
				class="text-blue-500 progress-ring"
				stroke-width="8"
				stroke="currentColor"
				fill="transparent"
				r="40"
				cx="50%"
				cy="50%"
				:style="`--value: ${progress}`"
			/>
		</svg>
		<div
			class="absolute inset-0 flex items-center justify-center text-lg font-bold"
		>
			{{ progress }}%
		</div>
	</div>
</template>

<style>
.progress-ring {
	stroke-dasharray: 251.2;
	stroke-dashoffset: calc(251.2 - (var(--value, 0) * 251.2 / 100));
	transition: stroke-dashoffset 0.5s ease;
}
</style>
