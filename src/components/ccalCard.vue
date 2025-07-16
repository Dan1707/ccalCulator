<script lang="ts" setup>
import type { Database } from 'database.types'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import CcalProductDialog from './ccalProductDialog.vue'

type Product = Database['public']['Tables']['products']['Row']
type SelectedProduct = Product & { amount: number }

defineProps<{
	product: SelectedProduct
}>()

const productDetails = ref<SelectedProduct>()
const openDialog = ref(false)

const getProductDetails = async (id: number) => {
	const { data, error } = await supabase
		.from('products')
		.select()
		.eq('id', `${id}`)

	productDetails.value = data?.[0] as SelectedProduct
	openDialog.value = true

	if (error) {
		console.log(error)
	}
}
</script>

<template>
	<div
		class="bg-card rounded-xl overflow-hidden shadow-xl mb-5 max-w-md cursor-pointer"
		@click="getProductDetails(product.id)"
	>
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

	<CcalProductDialog
		v-model:open="openDialog"
		:details="productDetails as SelectedProduct"
		:weight="product.amount"
	/>
</template>
