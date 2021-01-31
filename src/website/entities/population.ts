import Dot from './dot';
import Goal from './goal';

export default class Population {
	dots: Dot[];
	goal: Goal;
	fitnessSum: number;
	generation: number;
	bestDot: number;
	winStep: number;

	constructor(size: any) {
		this.goal = new Goal(400, 5)
		this.fitnessSum = 0
		this.generation = 1
		this.bestDot = 0
		this.winStep = 1000
		this.dots = [...Array(size)].map(() => new Dot())
	}

	show() {
		const dots = this.dots.map(dot => ({x: dot.pos.x, y: dot.pos.y, isBest: dot.isBest}))
		const goal = {x: this.goal.pos.x, y: this.goal.pos.y, isGoal: true}
		return [goal, ...dots]
	}

	update() {
		this.dots.forEach(dot => {
			if (dot.brain.step > this.winStep) {
				dot.dead = true
			} else {
				dot.update(this.goal)
			}
		})
	}

	calculateFitness() {
		this.dots.forEach(dot => dot.calculateFitness(this.goal))
	}

	allDotsDead() {
		return this.dots.every(dot => dot.dead || dot.reachedGoal)
	}

	naturalSelection() {
		// const newDots = [...Array(this.dots.length)].map(() => new Dot())
		this.setBestDot()
		this.calculateFitnessSum()
		const bestDot = this.dots[this.bestDot].clone()
		this.dots = this.dots.map(dot => {
			const parent = this.selectParent()
			return parent!.clone()
		})
		this.dots[this.dots.length - 1] = bestDot
		this.dots[this.dots.length - 1].isBest = true
		this.generation++
		// for (let i = 0; i < newDots.length; i++) {
		// 	const parent = this.selectParent()
		// 	newDots[i] =  parent!.getMutation()
		// }
		// this.dots = newDots.clone()
	}

	calculateFitnessSum() {
		this.fitnessSum = this.dots.reduce((sum, dots) => sum + dots.fitness, 0)
	}

	selectParent() {
		const rand = Math.random() * this.fitnessSum;
		let runningSum = 0
		return this.dots.find((dot, idx) => {
			runningSum += dot.fitness
			return runningSum > rand
		})
		// for (let i = 0; i < this.dots.length; i++) {
		// 	runningSum += this.dots[i].fitness
		// 	if (runningSum > rand) {
		// 		return this.dots[i]
		// 	}
		// }
		// return null
	}

	mutateDots() {
		this.dots.forEach(dot => {
			if (!dot.isBest)
				dot.brain.mutate()
		})
	}

	setBestDot() {
		let max = 0
		let maxIndex = 0
		for (let i = 0; i < this.dots.length; i++) {
			if (this.dots[i].fitness > max) {
				max = this.dots[i].fitness
				maxIndex = i
			}
		}
		this.bestDot = maxIndex

		if (this.dots[this.bestDot].reachedGoal) {
			this.winStep = this.dots[this.bestDot].brain.step
			console.log('step:', this.winStep)
		}
	}
}