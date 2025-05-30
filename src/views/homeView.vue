<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import { supabase } from '@/lib/supabaseClient'
import { Calculator } from 'lucide-vue-next'
import { ref } from 'vue'

import type { Database } from '../../database.types'

type Product = Database['public']['Tables']['products']['Row']

const dishName = ref('')
const searchResults = ref<Product[]>([])

const showResults = ref(false)

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

		console.log(data)
		searchResults.value = data || []

		if (error) {
			throw error
		}
	} catch (error) {
		console.log(error + 'error with calorie tracking')
	}
}

const products = ref<Product[]>([])

const getCurrentProduct = async (product: Product) => {
	showResults.value = false

	try {
		let { data, error } = await supabase
			.from('products')
			.select()
			.eq('id', product.id)

		console.log(data)

		if (data && data.length > 0) {
			products.value.push(data[0])
		}

		if (error) {
			throw error
		}
	} catch (error) {
		console.log(error + 'error with getting current product')
	}
}
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
						/>
					</Label>
					<Label
						class="flex flex-col items-start text-sm font-semibold text-gray-300 w-full shrink-2"
					>
						Amount (g)
						<Input placeholder="150" type="number" class="w-full" />
					</Label>
					<Button
						class="bg-gradient-to-tr from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white text-lg font-bold rounded-xl px-8 py-3 shadow-lg transition hover:scale-105 mt-1"
						@click.prevent="getCalories"
					>
						<Calculator :size="48" />
						Calculate
					</Button>
				</div>
			</form>
			<div
				class="mt-4 bg-card rounded-xl p-7 shadow-lg max-h-40 overflow-auto flex flex-col gap-3 absolute w-full"
				v-if="showResults && searchResults.length > 0"
			>
				<p
					class="text-white p-3 cursor-pointer hover:bg-primary rounded-xl duration-300"
					v-for="(item, index) in searchResults"
					:key="index"
					@click="getCurrentProduct(item)"
				>
					{{ item.name }}
				</p>
			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<h2 class="text-2xl font-bold mt-7">Today:</h2>

			<div class="grid grid-cols-3 gap-4 mt-10">
				<div v-for="product in products" :key="product.id">
					<div class="bg-card rounded-xl p-5 shadow-lg mb-5">
						<img
							:src="product.image_url || ''"
							alt="Product Image"
							loading="lazy"
							class="w-full h-60 object-cover rounded-lg mb-3"
						/>
						<h2 class="text-xl font-semibold text-white mb-3">
							{{ product.name }}
						</h2>
						<p class="text-gray-300 mb-2">Calories: {{ product.kcal }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
