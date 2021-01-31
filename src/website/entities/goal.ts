import PVector from './p-vector';

export default class Dot {
	pos: PVector;

	constructor(x: number, y: number) {
		this.pos = new PVector(x, y)
	}

	show() {
		return {x: this.pos.x, y: this.pos.y, isBest: false};
	}
}
