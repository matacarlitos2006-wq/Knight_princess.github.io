$(document).ready(function () {
    const player = $('#player');
    const gameContainer = $('#game-container');
    const scoreDisplay = $('#score');
    const livesDisplay = $('#lives');
    let score = 0;
    let lives = 5;


    $(document).keydown(function (e) {
      if (e.key === 'ArrowLeft') moveDirection = -3;
      if (e.key === 'ArrowRight') moveDirection = 3;
      if (e.key === 'ArrowUp') moveDirection = "up";
    });

    if (moveDirection === "up") {
      player.y -= 10; // Decrease y-coordinate to move up
    }
