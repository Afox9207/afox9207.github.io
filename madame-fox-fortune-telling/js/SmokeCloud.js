export class SmokeCloud {
    static image = new Image();
    static frameSize = 64;
    static maxFrame = 14;
    static minSize = 8;
    static maxSize = 64;
    static growRate = 0.05;
    static lifespan = 3000;
    static frameInterval = 1000 / 24;
    static maxSpeed = 0.04;

    static {
        this.image.src = '/madame-fox-fortune-telling/images/smoke.png';
    }

    constructor(orbRadius) {
        this.x = orbRadius;
        this.y = orbRadius;
        this.dx = Math.random() * 2 * SmokeCloud.maxSpeed - SmokeCloud.maxSpeed;
        this.dy = Math.random() * 2 * SmokeCloud.maxSpeed - SmokeCloud.maxSpeed;
        this.size = SmokeCloud.minSize;
        this.frame = 0;

        // update frame
        setInterval(() => {
            this.frame < SmokeCloud.maxFrame ? ++this.frame : this.frame = 0;
        }, SmokeCloud.frameInterval);

        // lifespan
        setTimeout(() => {
            this.lifeSpanIsOver = true;
        }, SmokeCloud.lifespan);
    }
    update(deltaTime) {
        const updateSize = () => {
            const change = SmokeCloud.growRate * deltaTime;
            const offset = change / 2;

            if (this.lifeSpanIsOver) {
                // let shrink
                this.size -= change;
                this.x += offset;
                this.y += offset;
            } else {
                // let grow to max size
                if (this.size < SmokeCloud.maxSize) {
                    this.size += change;
                    this.x -= offset;
                    this.y -= offset;
                }
            }
        };
        const updatePosition = () => {
            this.x += this.dx * deltaTime;
            this.y += this.dy * deltaTime;
        };
        const removeClouds = () => {
            if (this.size < SmokeCloud.minSize) {
                this.markedForDeletion = true;
            }
        };

        updateSize();
        updatePosition();
        removeClouds();
    }
    draw(ctx) {
        ctx.drawImage(
            SmokeCloud.image,
            SmokeCloud.frameSize * this.frame,
            0,
            SmokeCloud.frameSize,
            SmokeCloud.frameSize,
            this.x,
            this.y,
            this.size,
            this.size
        );
    }
}