export class SmokeCloud {
    static image = new Image();
    static maxSpeed = 0.25;
    static maxSpeedOffset = SmokeCloud.maxSpeed / 2;
    static minSize = 4;
    static maxSize = 64;
    static growRate = 0.1;
    static frameSize = 64;
    static maxFrame = 14;
    static frameRate = 1000 / 24;
    static LifeSpan = 1000;

    static {
        this.image.src = './fortune-teller/images/smoke.png';
    }

    constructor(orbRadius) {
        this.x = orbRadius;
        this.y = orbRadius;
        this.dx = Math.random() * SmokeCloud.maxSpeed - SmokeCloud.maxSpeedOffset;
        this.dy = Math.random() * SmokeCloud.maxSpeed - SmokeCloud.maxSpeedOffset;
        this.size = SmokeCloud.minSize;
        this.frame = 0;
        
        this.interval = setInterval(() => {
            if (this.frame < SmokeCloud.maxFrame) {
                ++this.frame;
            } else {
                this.frame = 0;
            }
        }, SmokeCloud.frameRate);
        
        setTimeout(() => {
            this.lifeSpanIsOver = true;
        }, SmokeCloud.LifeSpan);
    }
    update(deltaTime) {
        // change size
        const sizeChange = SmokeCloud.growRate * deltaTime;
        const sizeOffset = sizeChange / 2;

        if (this.lifeSpanIsOver) {
            this.size -= sizeChange;
            this.x += sizeOffset;
            this.y += sizeOffset;
        } else if (this.size < SmokeCloud.maxSize) {
            this.size += sizeChange;
            this.x -= sizeOffset;
            this.y -= sizeOffset;
        }

        // move
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;

        // mark clouds for deletion
        if (this.size < SmokeCloud.minSize) {
            this.markedForDeletion = true;
            clearInterval(this.interval);
        }
    }
    draw(ctx) {
        ctx.drawImage(
            SmokeCloud.image,
            this.frame * SmokeCloud.frameSize,
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