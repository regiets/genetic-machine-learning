export default class PVector {
	x: number
	y: number

	constructor (x?: number, y?: number) {
		this.x = x || 0
		this.y = y || 0
	}

	add(x: number, y: number) {
		this.x += x || 0
		this.y += y || 0
	}

	static fromAngle(rad: number) {
		const x = Math.cos(rad)
		const y = Math.sin(rad)
		return new PVector(x, y);
	}

	getAngle() {
		return Math.tan(this.y / this.x);
	}

	limit(max: number) {
		const hyp = Math.sqrt(this.x * this.x + this.y * this.y)
		if (hyp > max) {
			if (hyp !== 0 && hyp !== 1) {
				this.x = this.x / hyp * max;
  			this.y = this.y / hyp * max;
			}
		}
		// const square = this.x * this.x + this.y * this.y
		// if (square > max) {
		// 	const rad = Math.atan(this.y / this.x)
		// 	this.x = Math.cos(rad) * max
		// 	this.y = Math.sin(rad) * max
		// }
	}

	copy() {
		return new PVector(this.x, this.y)
	}
}

// function limit(max) {
//   if ((x * x + y*y) > max*max) {
//     normalize();
//     mult(max);
//   }
// }


// function normalize() {
//   const m = Math.sqrt(x*x + y*y);
//   if (m !== 0 && m !== 1) {
//     div(m)
//   }
// }

// function mult(n) {
//   x *= n;
//   y *= n;
// }
// function div(n) {
//   x /= n;
//   y /= n;
// }
