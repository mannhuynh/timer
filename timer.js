class Timer {
	constructor(durationInput, startButton, pauseButton, refreshButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
        this.refreshButton = refreshButton;
        this.initDuration = null;

		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
            this.onRefresh = callbacks.onRefresh;
		}

		this.startButton.addEventListener("click", this.start);
		this.pauseButton.addEventListener("click", this.pause);
        this.refreshButton.addEventListener("click", this.refresh);

        pauseButton.disabled = true;
        refreshButton.disabled = true;

	}

  
	start = () => {
        if (!this.initDuration){
            this.initDuration = parseFloat(durationInput.value);
        }

		if (this.onStart) {
			this.onStart(this.initDuration);
		}

        startButton.disabled = true;
        pauseButton.disabled = false;
        refreshButton.disabled = true;

		this.tick();
		this.interval = setInterval(this.tick, 50);
	};

	pause = () => {
        startButton.disabled = false;
        pauseButton.disabled = true;
        refreshButton.disabled = false;
		clearInterval(this.interval);
	};

    refresh = () => {
        this.setTimeRemain = this.initDuration;
        this.initDuration = null;
        this.pause();
        if (this.onRefresh) {
            this.onRefresh();
        }

        refreshButton.disabled = true;
    }

	tick = () => {
		if (this.getTimeRemain <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.setTimeRemain = this.getTimeRemain - 0.05;
			if (this.onTick) {
				this.onTick(this.getTimeRemain);
			}
		}
	};

	get getTimeRemain() {
		return parseFloat(this.durationInput.value);
	}

	set setTimeRemain(time) {
		this.durationInput.value = time.toFixed(2);
	}
}
