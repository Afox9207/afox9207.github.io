export class SmokeCloud {
    static image = new Image();
    static maxSpeed = 0.14;
    static maxSpeedOffset = SmokeCloud.maxSpeed / 2;
    static minSize = 4;
    static maxSize = 64;
    static lifespan = 2000;
    static maxFrame = 14;
    static frameRate = 1000 / 24;
    static frameSize = 64;
    static growRate = 0.05

    static {
        this.image.src = './madame-fox-fortune-telling/images/smoke.png';
    }

    constructor(orb) {
        this.x = orb.radius;
        this.y = orb.radius;
        this.dx = Math.random() * SmokeCloud.maxSpeed - SmokeCloud.maxSpeedOffset;
        this.dy = Math.random() * SmokeCloud.maxSpeed - SmokeCloud.maxSpeedOffset;
        this.size = SmokeCloud.minSize;
        this.frame = 0;
        
        // update frame
        setInterval(() => {
            if (this.frame < SmokeCloud.maxFrame) {
                ++this.frame;
            } else {
                this.frame = 0;
            }
        }, SmokeCloud.frameRate);

        // handle lifespan
        setTimeout(() => {
            this.lifespanIsOver = true;
        }, SmokeCloud.lifespan);
    }
    update(deltaTime) {
        // size change
        const sizeChange = SmokeCloud.growRate * deltaTime;
        const offset = sizeChange * 0.5;

        if (this.lifespanIsOver) {
            this.size -= sizeChange;
            this.x += offset;
            this.y += offset;
        } else if (this.size < SmokeCloud.maxSize) {
            this.size += sizeChange;
            this.x -= offset;
            this.y -= offset;
        }

        // check for clouds to remove
        if (this.size < SmokeCloud.minSize) {
            this.markedForDeletion = true;
        }
        
        // change position
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
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