<script setup lang="ts">
import { ref } from 'vue'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from '@/components/ui/dialog'

const isOpen = ref(true)
</script>

<template>
	<Dialog v-model:open="isOpen">
		<DialogTrigger as-child>
			<button class="px-4 py-2 bg-blue-600 text-white rounded">
				Open Dialog
			</button>
		</DialogTrigger>

		<DialogContent>
			<DialogHeader>
				<DialogTitle>Welcome!</DialogTitle>
				<DialogDescription> This dialog is open by default. </DialogDescription>
			</DialogHeader>
			<DialogClose as-child>
				<button class="mt-4 px-3 py-1 bg-gray-200 rounded">Close</button>
			</DialogClose>
		</DialogContent>
	</Dialog>
</template>
