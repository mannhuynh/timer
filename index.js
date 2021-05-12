
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const refreshButton = document.querySelector("#refresh");

const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;


const timer = new Timer(durationInput, startButton, pauseButton, refreshButton, {
	onStart(totalDuration) {
		duration = totalDuration;
	},
	onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
        perimeter * timeRemaining / duration - perimeter);
        
	},
    onRefresh() {
        console.log("Refresh");
        circle.setAttribute("stroke-dashoffset", 0);
    },
	onComplete() {
		console.log("Completed");
	},
});
