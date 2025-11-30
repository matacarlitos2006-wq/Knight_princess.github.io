$(document).ready(function () {
    const player = $('#player');
    const gameContainer = $('#game-container');
    const scoreDisplay = $('#score');
    const livesDisplay = $('#lives');
    let score = 0;
    let lives = 5;
    let moveDirection = 0;


    $(document).keydown(function (e) {
      if (e.key === 'ArrowLeft') moveDirection = -3;
      if (e.key === 'ArrowRight') moveDirection = 3;
      if (e.key === 'ArrowUp') moveDirection = "up";
    });

    if (moveDirection === "up") {
      player.y -= 10; // Decrease y-coordinate to move up
    }

    function movePlayer() {
      const currentLeft = parseFloat(player.css('left'));
      const newLeft = currentLeft + moveDirection;
      if (newLeft >= 0 && newLeft <= gameContainer.width() - player.width()) {
        player.css('left', newLeft);
      }
    }
});
