<script lang="ts" setup>
import type { Database } from 'database.types'

type Product = Database['public']['Tables']['products']['Row']
type SelectedProduct = Product & { amount: number }

defineProps<{
	product: SelectedProduct
}>()
</script>

<template>
	<div class="bg-card rounded-xl overflow-hidden shadow-xl mb-5 max-w-md">
		<img
			:src="product.image_url || ''"
			alt="Product Image"
			loading="lazy"
			class="w-full h-40 object-cover mb-3"
		/>
		<div class="p-5">
			<div class="flex justify-between items-center">
				<h2 class="text-xl font-semibold text-white mb-3">
					{{ product.name }}
				</h2>
				<p class="text-gray-300 mb-2 font-medium">
					{{ product.kcal ? (product.kcal * product.amount) / 100 : null }}
					Kcal
				</p>
			</div>
			<p class="text-gray-300 mb-2 font-medium">{{ product.amount }}g</p>
		</div>
	</div>
</template>
