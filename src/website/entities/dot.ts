import Brain from './brain';
import PVector from './p-vector';
import Goal from './goal';

const WIDTH = 800
const HEIGHT = 600

export default class Dot {
	pos: PVector;
	vel: PVector;
	acc: PVector;
	brain: Brain;

	dead: boolean;
	reachedGoal: boolean;
	isBest: boolean;
	fitness: number;

	constructor() {
		this.pos = new PVector(WIDTH/2, HEIGHT - 2)
		this.vel = new PVector(0, 0)
		this.acc = new PVector(0, 0)
		this.brain = new Brain(1000)

		this.dead = false
		this.reachedGoal = false
		this.isBest = false
		this.fitness = 0
	}

	show() {
		// console.log({x: this.pos.x, y: this.pos.y, z: this.pos.z})
		return {x: this.pos.x, y: this.pos.y, isBest: this.isBest};
	}

	move() {
		if (this.brain.directions.length > this.brain.step) {
			this.acc = this.brain.directions[this.brain.step]
			this.brain.step++;
		} else {
			this.dead = true
		}
		this.vel.add(this.acc.x, this.acc.y)
		this.vel.limit(5)
		this.pos.add(this.vel.x, this.vel.y)
	}

	update(goal: Goal) {
		// console.log('dot.update()', {'this.dead': this.dead, 'this.pos': this.pos})
		if (!this.dead && !this.reachedGoal) {
			this.move()
			const dx = goal.pos.x - this.pos.x
			const dy = goal.pos.y - this.pos.y
			if (this.pos.x < 2 || this.pos.x > WIDTH - 2 || this.pos.y < 2 || this.pos.y > HEIGHT - 2) {
				this.dead = true
			} else if (Math.sqrt(dx * dx + dy * dy) < 5) {
				this.reachedGoal = true
			} else if (this.pos.x > 0 && this.pos.x < 500 && this.pos.y > 200 && this.pos.y < 210) {
				this.dead = true
			} else if (this.pos.x > 300 && this.pos.x < 800 && this.pos.y > 400 && this.pos.y < 410) {
				this.dead = true
			}
		}
	}

	calculateFitness(goal: Goal) {
		if (this.reachedGoal) {
			this.fitness = 1 / 16 + 10000 / (this.brain.step * this.brain.step)
		} else {
			const dx = goal.pos.x - this.pos.x;
			const dy = goal.pos.y - this.pos.y;
			const distanceToGoal = Math.sqrt(dx * dx + dy * dy)
			this.fitness = 1 / (distanceToGoal * distanceToGoal)
		}
	}

	clone() {
		const mutation = new Dot();
		mutation.brain = this.brain.clone();
		return mutation
	}
}
