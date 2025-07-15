<script lang="ts" setup>
import type { Database } from 'database.types'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from '@/components/ui/dialog'
import Progress from './ui/progress/progress.vue'

type Product = Database['public']['Tables']['products']['Row']
type SelectedProduct = Product & { amount: number }

defineProps<{
	details: SelectedProduct
}>()
</script>

<template>
	<Dialog>
		<DialogContent>
			<DialogHeader>
				<DialogDescription>
					<div
						class="relative flex flex-col items-center justify-center rounded-lg overflow-hidden mt-5"
					>
						<img
							:src="details.image_url as string"
							:alt="details.image_url as string"
							class="w-full h-48 object-cover"
						/>
						<h3
							class="absolute left-0 text-white right-0 text-center text-lg font-semibold h-full flex items-center justify-center backdrop-blur-sm bg-black/50 rounded-lg px-4"
						>
							{{ details.name }}
						</h3>
					</div>
					<div class="flex items-center justify-center mt-5 gap-2">
						<Progress :progress="details.proteins_g" />
						<Progress :progress="details.fats_g" />
						<Progress :progress="details.carbohydrates_g" />
					</div>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>
</template>
