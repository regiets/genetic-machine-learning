import PVector from './p-vector'

export default class Brain {
	step: number
	directions: PVector[]

	constructor(size: any) {
		this.step = 0;
		this.directions = [...Array(size)].map(() => {
			const randomAngle = random(2 * Math.PI)
			const vec = PVector.fromAngle(randomAngle)
			return vec
		})
	}

	clone() {
		const clone = new Brain(this.directions.length)
		clone.directions.forEach((_, idx) => {
			clone.directions[idx] = this.directions[idx].copy()
		})
		return clone
	}

	mutate() {
		const mutationRate = 0.01
		this.directions = this.directions.map(direction => {
			const rand = Math.random()
			if (rand < mutationRate) {
				const randomAngle = Math.random() * 0.5 * Math.PI
				const currentAngle = direction.getAngle()
				return PVector.fromAngle(currentAngle + randomAngle)
			}
			return direction.copy()
		})
	}
}

function random(max = 1, min = 0) {
	return Math.random() * (max - min) + min
}