export class State {
    static enum = {
        OFF: 0,
        TURN_ON: 1,
        SHOW_ANSWER: 2,
        TURN_OFF: 3
    }

    constructor(main) {
        this.main = main;
        this.states = [
            new Off(main),
            new TurnOn(main),
            new ShowAnswer(main),
            new TurnOff(main)
        ];
        this.currentState = this.states[0];
        this.menuIsOpen = false;
        this.orbIsOff = true;
    }
    openMenu() {
        this.menuIsOpen = true;
    }
    closeMenu() {
        this.menuIsOpen = false;
    }
    checkIfMenuIsOpen() {
        return this.menuIsOpen
    }
    turnOnOrb() {
        this.orbIsOff = false;
    }
    turnOffOrb() {
        this.orbIsOff = true;
    }
    checkIfOrbIsOff() {
        return this.orbIsOff;
    }
    checkState() {
        this.currentState.checkState();
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    
}

class Off {
    constructor(main) {
        this.main = main;
        this.state = 'OFF';
    }
    enter() {
        this.main.state.turnOffOrb();
    }
    checkState() {
        if (!this.main.state.orbIsOff) {
            this.main.state.setState(State.enum.TURN_ON);
        }
    }
}

class TurnOn {
    constructor(main) {
        this.main = main;
        this.state = 'TURN_ON';
        this.durationIsOver = false;
    }
    setTimer() {
        const duration = 5000;
        this.timeout = setTimeout(() => {
            this.durationIsOver = true;
        }, duration);
    }
    enter() {
        this.setTimer();
        this.main.background.lightUp();
        this.main.orb.turnOn()
        this.main.answer.hide();
    }
    checkState() {
        if (this.main.state.checkIfMenuIsOpen()) {
            clearTimeout(this.timeout);
            this.main.state.setState(State.enum.TURN_OFF);
        } else if (this.durationIsOver) {
            this.main.state.setState(State.enum.SHOW_ANSWER);
        }
        this.durationIsOver = false;
    }
}

class ShowAnswer {
    constructor(main) {
        this.main = main;
        this.state = 'SHOW_ANSWER';
    }
    enter() {
        this.main.answer.generate();
    }
    checkState() {
        this.main.state.setState(State.enum.TURN_OFF);
    }
}

class TurnOff {
    constructor(main) {
        this.main = main;
        this.state = 'TURN_OFF';
    }
    enter() {
        this.main.background.darken();
        this.main.orb.turnOff();
    }
    checkState() {
        if (this.main.orb.smokeClouds.length === 0) {
            this.main.state.setState(State.enum.OFF);
        }
    }
}