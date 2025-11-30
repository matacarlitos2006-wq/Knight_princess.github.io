$(document).ready(function () {

    const map = $('#map');
    const player = $('#player');

    const MAP_WIDTH = 2000;
    const MAP_HEIGHT = 2000;

    const gameContainer = $('#game-container');
    let winW = gameContainer.width();
    let winH = gameContainer.height();

    let px = MAP_WIDTH / 2;   // start in middle
    let py = MAP_HEIGHT / 2;

    let moveUp = false;
    let moveDown = false;
    let moveLeft = false;
    let moveRight = false;

    const speed = 4;

    $(document).keydown(function (e) {
        if (e.key === "ArrowUp") moveUp = true;
        if (e.key === "ArrowDown") moveDown = true;
        if (e.key === "ArrowLeft") moveLeft = true;
        if (e.key === "ArrowRight") moveRight = true;
    });

    $(document).keyup(function (e) {
        if (e.key === "ArrowUp") moveUp = false;
        if (e.key === "ArrowDown") moveDown = false;
        if (e.key === "ArrowLeft") moveLeft = false;
        if (e.key === "ArrowRight") moveRight = false;
    });

    function gameLoop() {

        // Move player in world space
        if (moveUp) py -= speed;
        if (moveDown) py += speed;
        if (moveLeft) px -= speed;
        if (moveRight) px += speed;

        px = Math.max(0, Math.min(MAP_WIDTH, px));
        py = Math.max(0, Math.min(MAP_HEIGHT, py));

        const mapX = -(px - winW / 2);
        const mapY = -(py - winH / 2);


        const minX = -(MAP_WIDTH - winW);
        const minY = -(MAP_HEIGHT - winH);

        const finalX = Math.min(0, Math.max(minX, mapX));
        const finalY = Math.min(0, Math.max(minY, mapY));

        map.css({
            left: finalX + "px",
            top: finalY + "px"
        });

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

});
