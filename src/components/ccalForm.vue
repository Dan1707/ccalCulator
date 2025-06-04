<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import { supabase } from '@/lib/supabaseClient'
import { Calculator, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'

import type { Database } from '../../database.types'

type Product = Database['public']['Tables']['products']['Row']
type SelectedProduct = Product & { amount: number }

const dishName = ref('')
const dishAmount = ref()

const isEmpty = ref(false)

const dishKcal = ref(0)
const currentItem = ref<SelectedProduct | Product | null>()

const searchResults = ref<Product[]>([])
const showResults = ref(false)

const emit = defineEmits<{
	sendProducts: [products: SelectedProduct[]]
	sendKcal: [kcal: number]
}>()

const getCalories = async () => {
	showResults.value = true
	const searchText = dishName.value.trim().toLowerCase()

	try {
		if (searchText === '' && searchText.length <= 0) {
			return null
		}

		let { data, error } = await supabase
			.from('products')
			.select()
			.ilike('name', `%${searchText}%`)

		searchResults.value = data || []

		if (error) {
			throw error
		}
	} catch (error) {
		console.log(error + 'error with calorie tracking')
	}
}

const products = ref<SelectedProduct[]>([])

const getCurrentProduct = async (product: SelectedProduct) => {
	showResults.value = false

	try {
		if (
			dishName.value !== '' &&
			dishName.value.length !== 0 &&
			dishAmount.value !== null &&
			dishAmount.value !== 0
		) {
			isEmpty.value = false

			let { data, error } = await supabase
				.from('products')
				.select()
				.eq('id', product.id)

			if (product.kcal && product.amount_g) {
				dishKcal.value += parseFloat(
					((product.kcal * dishAmount.value) / 100).toFixed(2)
				)

				emit('sendKcal', dishKcal.value)
			}

			if (data && data.length > 0) {
				products.value.push({
					...data[0],
					amount: dishAmount.value,
				})

				emit('sendProducts', products.value)
			}

			dishName.value = ''
			dishAmount.value = null
			if (error) {
				throw error
			}
		} else {
			isEmpty.value = true
		}
	} catch (error) {
		console.log(error + 'error with getting current product')
	}
}

watch(dishName, () => {
	if (dishName.value === '' && dishName.value.length === 0) {
		showResults.value = false

		searchResults.value = []
	}
})
</script>

<template>
	<section>
		<div class="max-w-200 relative m-auto">
			<form class="bg-card rounded-xl mt-10 p-7 shadow-lg relative">
				<div class="flex items-end justify-between gap-4 h-19">
					<Label
						class="flex flex-col items-start text-sm font-semibold text-gray-300 w-full shrink-1"
					>
						Name of the dish

						<Input
							placeholder="Food"
							v-model="dishName"
							@input.prevent="getCalories"
							required
						/>
					</Label>
					<Label
						class="flex flex-col items-start text-sm font-semibold text-gray-300 w-full shrink-2"
					>
						Amount (g)
						<Input
							placeholder="150"
							type="number"
							class="w-full"
							v-model.number="dishAmount"
							required
						/>
					</Label>
					<Button
						class="bg-gradient-to-tr from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white text-lg font-bold rounded-xl px-8 py-3 shadow-lg transition hover:scale-105 mt-1"
						@click.prevent="getCurrentProduct(currentItem as SelectedProduct)"
					>
						<Calculator :size="48" />
						Calculate
					</Button>
				</div>
			</form>

			<div
				class="bg-primary/60 border-3 border-primary rounded-xl p-5 mt-4 text-center font-medium relative"
				v-if="isEmpty"
			>
				Fill the fields, please 🙂
				<button
					class="cursor-pointer absolute top-0 right-0 m-3"
					@click="isEmpty = false"
				>
					<X :size="18" />
				</button>
			</div>
			<div
				class="mt-4 bg-card rounded-xl p-7 shadow-lg max-h-40 overflow-auto flex flex-col gap-3 absolute w-full"
				v-if="showResults && searchResults.length > 0"
			>
				<p
					class="text-white p-3 cursor-pointer hover:bg-primary rounded-xl duration-300"
					v-for="(item, index) in searchResults"
					:key="item.id"
					@click="
						() => {
							currentItem = item
							dishName = item.name || ''
							showResults = false
						}
					"
				>
					{{ item.name }}
				</p>
			</div>
		</div>
	</section>
</template>
