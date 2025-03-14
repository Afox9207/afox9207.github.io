export function startAnimating(main) {
    let lastTimestamp = 0;

    function drawNextFrame(timestamp) {
        requestAnimationFrame(drawNextFrame);
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        main.orb.animateSmokeClouds(deltaTime);
        main.orb.removeSmokeClouds();
        main.orb.frameRate = 1000 / deltaTime;
    }
    drawNextFrame(0);
}
