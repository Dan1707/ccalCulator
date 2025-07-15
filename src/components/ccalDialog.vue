<script setup lang="ts">
import { ref } from 'vue'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogDescription,
	DialogClose,
} from '@/components/ui/dialog'
import Button from './ui/button/Button.vue'
import Input from './ui/input/Input.vue'
import RadioGroup from './ui/radio-group/RadioGroup.vue'
import RadioGroupItem from './ui/radio-group/RadioGroupItem.vue'
import Label from './ui/label/Label.vue'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useCaloriesStore } from '@/stores/store'

const store = useCaloriesStore()

const isOpen = ref(true)

const gender = ref('')
const age = ref(0)
const height = ref(0)
const weight = ref(0)
const activityLevel = ref('')

const intake = ref(0)

const activityObj = {
	minimal: 1.2,
	light: 1.375,
	moderate: 1.55,
	high: 1.725,
	'very-high': 1.9,
}

const countIntake = () => {
	let bmr = 0
	if (gender.value === 'male') {
		bmr = 10 * weight.value + 6.25 * height.value - 5 * age.value + 5
	} else if (gender.value === 'female') {
		bmr = 10 * weight.value + 6.25 * height.value - 5 * age.value - 161
	}

	const currentActivityNum =
		activityObj[activityLevel.value as keyof typeof activityObj]

	intake.value = bmr * currentActivityNum

	store.intake = intake.value

	isOpen.value = false
}
</script>

<template>
	<Dialog v-model:defaultOpen="isOpen">
		<DialogContent>
			<DialogHeader>
				<DialogDescription class="flex flex-col gap-3">
					<h2 class="text-xl text-white font-bold">
						Let's count your daily calorie intake!
					</h2>
					<p class="text-primary cursor-pointer">I've already knew my intake</p>
					<RadioGroup v-model="gender" class="flex" required>
						<div class="flex items-center space-x-2">
							<RadioGroupItem id="r1" value="male" />
							<Label for="r1">Male</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroupItem
								id="r2"
								value="female"
								@click="console.log(gender)"
							/>
							<Label for="r2">Female</Label>
						</div>
					</RadioGroup>
					<Label for="age" class="mt-5">Your age:</Label>
					<Input
						type="number"
						placeholder="Your age..."
						v-model="age"
						required
					/>
					<Label for="height">Your height (cm):</Label>
					<Input
						type="number"
						placeholder="Your height..."
						v-model="height"
						required
					/>
					<Label for="weight">Your weight (kg):</Label>
					<Input
						type="number"
						placeholder="Your weight..."
						v-model="weight"
						required
					/>
					<Label for="activity">Your activity level:</Label>
					<Select v-model="activityLevel" class="w-full">
						<SelectTrigger class="w-full" required>
							<SelectValue placeholder="Your activity level..." />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="minimal">
									Minimal activity (sedentary lifestyle)
								</SelectItem>
								<SelectItem value="light">
									Light activity (light exercise 1-3 times per week)
								</SelectItem>
								<SelectItem value="moderate">
									Moderate activity (moderate exercise 3-5 times per week)
								</SelectItem>
								<SelectItem value="high">
									High activity (vigorous exercise 6-7 times per week)
								</SelectItem>
								<SelectItem value="very-high">
									Very high activity (very vigorous exercise, physical work)
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</DialogDescription>
			</DialogHeader>
			<DialogClose as-child>
				<p @click.prevent="countIntake">Submit</p>
				{{ intake }}
			</DialogClose>
		</DialogContent>
	</Dialog>
</template>
