import Population from './population';
let population: Population

export function setup() {
	population = new Population(100);
}

export function next() {
	if (population.allDotsDead()) {
		population.calculateFitness();
		population.naturalSelection();
		population.mutateDots();
		return []
	} else {
		population.update()
		return population.show()
	}
}
