<script lang="ts" setup>
import type { Database } from 'database.types'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from '@/components/ui/dialog'
import Progress from './ui/progress/progress.vue'
import { computed } from 'vue'

type Product = Database['public']['Tables']['products']['Row']
type SelectedProduct = Product & { amount: number }

const props = defineProps<{
	details: SelectedProduct
	weight: number
}>()

const calcProgress = computed(() => {
	return {
		proteins_g: (props.details.proteins_g ?? 0 / props.weight) * 100,
		fats_g: (props.details.fats_g ?? 0 / props.weight) * 100,
		carbohydrates_g: (props.details.carbohydrates_g ?? 0 / props.weight) * 100,
	}
})
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
						<div class="flex items-center gap-2 flex-col">
							<Progress :progress="details.proteins_g" />
							<p>Proteins</p>
						</div>
						<div class="flex items-center gap-2 flex-col">
							<Progress :progress="details.fats_g" />
							<p>Fats</p>
						</div>
						<div class="flex items-center gap-2 flex-col">
							<Progress :progress="details.carbohydrates_g" />
							<p>Carbohydrates</p>
						</div>
					</div>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>
</template>
