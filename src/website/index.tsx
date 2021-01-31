import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {next, setup} from './entities/index';

const app = document.getElementById('app');

class App extends React.Component {
	interval: any
	state = {
		dots: [
			{x: 200, y: 300, isBest: false, isGoal: false},
			{x: 100, y: 300, isBest: false},
			{x: 300, y: 400, isBest: true}
		]
	}

	constructor(props: any) {
		super(props)
		this.state = {
			dots: [
				{x: 200, y: 300, isBest: false},
				{x: 100, y: 300, isBest: false},
				{x: 300, y: 400, isBest: true}
			]
		}
		this.interval = undefined
	}

	tick() {
		const dots = next();
		this.setState({dots: dots.map(dot => ({...dot}))});
	}

	componentDidMount () {
		setup();
		this.interval = setInterval(this.tick.bind(this), 16)
	}
	
	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<svg width="800" height="600" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<rect x="0" y="200" width="500" height="10" fill="red" />
				<rect x="300" y="400" width="500" height="10" fill="red" />
				{this.state.dots.map(({x, y, isBest, isGoal}, idx) => {
					if (isGoal)
						return <circle key={idx} cx={x} cy={y} r="6" fill="red" stroke="transparent" strokeWidth="0" />
					else if (isBest) 
						return <circle key={idx} cx={x} cy={y} r="3" fill="green" stroke="transparent" strokeWidth="0" />
					return <circle key={idx} cx={x} cy={y} r="3" fill="black" stroke="transparent" strokeWidth="0" />
				})}

			</svg>
		)
	}
};

ReactDOM.render(<App />, app);
