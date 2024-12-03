export class RandomIntegerGenerator {
    constructor() {
        
    }
    generate(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export class RandomFloatingPointGenerator {
    constructor() {
        
    }
    generate(min, max) {
        return Math.random() * (max - min) + min;
    }
}