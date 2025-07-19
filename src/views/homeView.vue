<script lang="ts" setup>
import { ref } from 'vue'

import type { Database } from '../../database.types'
import CcalCard from '@/components/ccalCard.vue'
import CcalForm from '@/components/ccalForm.vue'
import { Utensils, Zap } from 'lucide-vue-next'
import CcalDialog from '@/components/ccalDialog.vue'

type Product = Database['public']['Tables']['products']['Row']
type SelectedProduct = Product & { amount: number }

import { useCaloriesStore } from '@/stores/store'

const store = useCaloriesStore()

const dishKcal = ref(0)

const products = ref<SelectedProduct[]>([])

const getNewProduct = (newProduct: SelectedProduct[]) => {
	products.value = newProduct
}

const getNewKcal = (newKcal: number) => {
	dishKcal.value = newKcal
}

const deleteProduct = (indexToDelete: number) => {
	const productToDelete: SelectedProduct = products.value[indexToDelete]
	if (dishKcal.value > 0 && productToDelete.kcal) {
		dishKcal.value = +(
			dishKcal.value -
			productToDelete.kcal * (productToDelete.amount / 100)
		).toFixed(2)
	} else {
		dishKcal.value = 0
	}

	if (store.intake > 0 && productToDelete.kcal) {
		store.intake = +(
			store.intake -
			productToDelete.kcal * (productToDelete.amount / 100)
		).toFixed(2)
	} else {
		store.intake = 0
	}

	products.value.splice(indexToDelete, 1)
}
</script>

<template>
	<CcalForm @sendProducts="getNewProduct" @sendKcal="getNewKcal" />
	<section
		class="mt-5 bg-card p-5 rounded-xl max-w-200 m-auto flex items-center justify-between"
	>
		<h3
			class="flex items-center justify-between font-semibold text-gray-200 text-lg gap-3"
		>
			<Utensils color="var(--primary)" />
			Calories eaten:
			<span class="text-white text-xl font-bold ml-2">{{
				dishKcal.toFixed(2)
			}}</span>
		</h3>
		<h3
			class="flex items-center justify-between font-semibold text-gray-200 text-lg gap-3"
		>
			<Zap color="var(--primary)" />
			Calories intake:
			<span class="text-white text-xl font-bold ml-2">{{
				store.intake.toFixed(2)
			}}</span>
		</h3>
	</section>
	<section v-if="products.length !== 0">
		<div class="max-w-200 m-auto">
			<h2 class="text-2xl font-bold mt-7">Today:</h2>

			<div class="grid grid-cols-3 gap-4 mt-10">
				<CcalCard
					v-for="(product, index) in products"
					:key="index"
					:productId="index"
					:product="product"
					@deleteProduct="deleteProduct"
				/>
			</div>
		</div>
	</section>
	<CcalDialog />
</template>
