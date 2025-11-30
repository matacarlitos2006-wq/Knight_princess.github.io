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
const ENEMY_COUNT = 10;       // how many enemies to spawn
const ENEMY_FIRE_RATE = 2000; // milliseconds between shots
const LASER_SPEED = 6;

// store enemy objects
let enemies = [];

// spawning enemies randomly on map
function spawnEnemies() {

    for (let i = 0; i < ENEMY_COUNT; i++) {

        const ex = Math.random() * MAP_WIDTH;
        const ey = Math.random() * MAP_HEIGHT;

        const enemy = $('<img class="enemy" src="images/enemy.png">');

        $('#map').append(enemy);

        enemies.push({
            el: enemy,
            x: ex,
            y: ey,
            fireTimer: 0
        });

        enemy.css({ left: ex, top: ey });
    }
}

// create a laser and shoot toward player
function enemyShoot(enemy) {
    const laser = $('<img class="laser" src="images/laser.png">');
    $('#map').append(laser);

    let lx = enemy.x + 30;
    let ly = enemy.y + 30;

    // angle toward player
    const dx = px - enemy.x;
    const dy = py - enemy.y;

    const angle = Math.atan2(dy, dx);

    const vx = Math.cos(angle) * LASER_SPEED;
    const vy = Math.sin(angle) * LASER_SPEED;

    function moveLaser() {
        lx += vx;
        ly += vy;

        laser.css({ left: lx, top: ly });

        // check collision with player (simple hitbox)
        if (Math.abs(lx - px) < 30 && Math.abs(ly - py) < 30) {
            console.log("PLAYER HIT!");
            laser.remove();
            return;
        }

        // remove laser if off map
        if (lx < 0 || ly < 0 || lx > MAP_WIDTH || ly > MAP_HEIGHT) {
            laser.remove();
            return;
        }

        requestAnimationFrame(moveLaser);
    }

    moveLaser();
}

// update enemy behavior
function updateEnemies(delta) {

    enemies.forEach(enemy => {

        // simple idle movement: wiggle a little
        enemy.x += Math.sin(Date.now() / 500 + enemy.x) * 0.3;
        enemy.y += Math.cos(Date.now() / 500 + enemy.y) * 0.3;

        enemy.el.css({ left: enemy.x, top: enemy.y });

        // shooting timer
        enemy.fireTimer += delta;

        if (enemy.fireTimer >= ENEMY_FIRE_RATE) {
            enemy.fireTimer = 0;
            enemyShoot(enemy);
        }
    });
}

// ----- HOOK INTO GAME LOOP -----

let lastTime = performance.now();

function fullGameLoop() {
    const now = performance.now();
    const delta = now - lastTime;
    lastTime = now;

    updateEnemies(delta);

    requestAnimationFrame(fullGameLoop);
}

spawnEnemies();
fullGameLoop();
