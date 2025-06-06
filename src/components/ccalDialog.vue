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
				<DialogDescription class="flex flex-col gap-3">
					<h2 class="text-xl text-white font-bold">
						Let's count your daily calorie intake!
					</h2>
					<p class="text-primary cursor-pointer">I've already knew my intake</p>
					<RadioGroup class="flex">
						<div class="flex items-center space-x-2">
							<RadioGroupItem id="r1" value="default" />
							<Label for="r1">Male</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroupItem id="r2" value="comfortable" />
							<Label for="r2">Female</Label>
						</div>
					</RadioGroup>
					<Label for="age" class="mt-5">Your age:</Label>
					<Input type="date" placeholder="Your age..." />
					<Label for="height">Your height (cm):</Label>
					<Input type="number" placeholder="Your height..." />
					<Label for="weight">Your weight (kg):</Label>
					<Input type="number" placeholder="Your weight..." />
					<Label for="weight">Your activity level:</Label>
					<Select class="w-full">
						<SelectTrigger class="w-full">
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
				<Button>Submit</Button>
			</DialogClose>
		</DialogContent>
	</Dialog>
</template>
