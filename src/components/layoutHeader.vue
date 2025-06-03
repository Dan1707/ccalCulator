<script lang="ts" setup>
import { User } from 'lucide-vue-next'
</script>

<template>
	<header class="bg-card w-full">
		<div class="container p-5 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<img src="/src/assets/img/icon.svg" alt="logo" class="max-w-8" />
				<h1 class="text-2xl font-bold tracking-tight text-white">
					ccalCulator
				</h1>
				<span
					class="text-xs font-semibold rounded bg-orange-400/20 px-2 py-1 shrink-0 text-primary"
				>
					App for ccal counting
				</span>
			</div>
			<div
				class="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center cursor-pointer"
			>
				<User />
			</div>
		</div>
	</header>
</template>
